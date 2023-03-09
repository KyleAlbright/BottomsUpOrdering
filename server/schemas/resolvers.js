// import everything we need

const { AuthenticationError } = require("apollo-server-express");
const { User, Product } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(
  "sk_test_51Mik08C8hyV43LfX6Z9u8lBOcsB5CkHMtXeU8two3VugDeY6ZbAab65YMJo8E8pV8QYuYhSKvOvPusLRuFcd2cnc00av0E55rl"
);

// define our Queries and Mutations
const resolvers = {
  Query: {
    // query for the individual user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    // query to get all the products
    products: async (parent, args, context) => {
      console.log("hit");
      const products = await Product.find({});
      return products;
    },
    // query to get single product
    getSingleProduct: async (parent, { productId }) => {
      return Product.findOne({ _id: productId });
    },

    // query for the stripe checkout
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const line_items = [];

      const products = args;
      console.log(products);

      for (let i = 0; i < products.products.length; i++) {
        console.log(products);
        const productInfo = await Product.findOne({
          _id: products.products[i],
        });
        console.log(productInfo, "line 41");

        const product = await stripe.products.create({
          name: productInfo.name,
          description: productInfo.description,
          images: [productInfo.image],
        });
        console.log(product, "line 45");
        let price;
        try {
          let amount = Math.round(productInfo.price * 100);

          price = await stripe.prices.create({
            product: product.id,
            unit_amount: amount,
            currency: "usd",
          });
        } catch (error) {
          console.log(error);
        }

        line_items.push({
          price: price.id,
          quantity: 1,
        });
        console.log(line_items);
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },

  Mutation: {
    // mutation to login our user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Wrong login credentials");
      }
      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Wrong login credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    // mutation to add a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
