// importing everything we need

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { FaCartPlus } from "react-icons/fa";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";
import { motion } from "framer-motion";

// pulling the product id with the useParams, and setting a quantity with useState hook
const SingleProduct = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  // executes useQuery with QUERY_SINGLE_PRODUCT
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productId },
  });

  // creating a new variable from the data object. If null , product will be empty
  const product = data?.getSingleProduct || {};

  // if loading, return this message.
  if (loading) {
    return <div>Loading...</div>;
  }

  //updates the quantity state
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  // creating a new cart item. If the item already exists, we are just updating the quantity.
  const addToCart = () => {
    const cartItem = {
      product: {
        id: product._id,
        description: product.description,
        name: product.name,
        image: product.image,
        category: product.category,
        price: product.price,
      },
      quantity,
    };

    const currentCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingCartItem = currentCartItems.find(
      (item) => item.product.id === cartItem.product.id
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      currentCartItems.push(cartItem);
    }

    // stores our new item to the cart
    localStorage.setItem("cartItems", JSON.stringify(currentCartItems));
  };
  // renders our page
  return (
    <div style={{ padding: "1rem" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Grid container spacing={2} style={{ maxWidth: 600, margin: "0 auto" }}>
          <Grid item xs={12}>
            <MainImage src={product.image} />
          </Grid>
          <Grid item xs={12}>
            <Info
              product={product}
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
              addToCart={addToCart}
            />
          </Grid>
        </Grid>
      )}
      <Link
        to={{ pathname: "/shoppingcart", state: { product, quantity } }}
        style={{ display: "block", textAlign: "center", marginTop: "1rem" }}
      >
        View Cart
      </Link>
    </div>
  );
};
// broke these up so we could add framer motion effects
const MainImage = ({ src }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <motion.img
        src={src}
        style={{ maxWidth: "100%", height: "auto", x: -100 }}
        alt="product"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};
// broke these up so we could add framer motion effects
const Info = ({ product, quantity, handleQuantityChange, addToCart }) => {
  const { name, description, price } = product;
  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: "100%" }}
    >
      <Grid container direction="column" style={{ height: "100%" }}>
        <Typography variant="h4">{name}</Typography>
        <Divider />
        <Box mt={2}>
          <Typography variant="subtitle1">{description}</Typography>
          <Divider />
          <Typography variant="h6">${price}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "auto" }}
          onClick={addToCart}
        >
          <FaCartPlus /> Add To Cart
        </Button>
        <FormControl fullWidth>
          <InputLabel id="quantity-label">Quantity</InputLabel>
          <Select
            labelId="quantity-label"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          >
            {[...Array(10)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </motion.div>
  );
};

export default SingleProduct;
