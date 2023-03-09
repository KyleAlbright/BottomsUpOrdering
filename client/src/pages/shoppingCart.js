// importing everything we need

import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import {
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  Divider,
} from "@material-ui/core";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

//initializing the stripe with our public API key
const stripePromise = loadStripe(
  "pk_test_51Mik08C8hyV43LfX89TPuiMShPbe1A0Y61RP3xI73aev8R7CbqpeLJnUZ8XE2ABJUIwpxJq8hom8mSJuk3ET5h6H00FhYk2orT"
);

// define state
const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  console.log(data);
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);
  // storing our product ID's in an array to submit to server
  function submitCheckout() {
    const productIds = [];

    cartItems.forEach((item) => {
      console.log(cartItems);
      for (let i = 0; i < item.quantity; i++) {
        productIds.push(item.product.id);
      }
    });

    // calling the server to get a stripe session ID
    try {
      console.log(productIds);
      getCheckout({
        variables: { products: productIds },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  // function to calculate the total of our cart
  function calculateTotal() {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.product.price * item.quantity;
    });
    return sum.toFixed(2);
  }

  // load the items from local storage cartItems
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    setCartItems(storedCartItems);
  }, []);

  // function to increase the quantity inside the cart component
  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // function to decrease the quantity inside the cart component
  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.product.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // function to remove the item inside the cart component
  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product.id !== itemId
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // render the cart. Conditional statement to show the cart is empty if nothing is in the cart.
  const renderCartItems = () => {
    if (cartItems.length === 0) {
      return (
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      );
    }

    return cartItems.map((item, index) => {
      return (
        <motion.div
          key={item.product.id}
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: index * 0.4 }}
        >
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              padding="3rem"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{ width: "100%", maxWidth: "200px" }}
              />

              <Box ml={2} flexGrow={1}>
                <Typography variant="h5">
                  <b>Product:</b> {item.product.name}
                </Typography>
                <Typography variant="subtitle1">
                  <b>Category:</b> {item.product.category}
                </Typography>
                <Typography variant="subtitle1">
                  <b>Description:</b> {item.product.description}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <IconButton
                    color="primary"
                    onClick={() => handleIncreaseQuantity(item.product.id)}
                  >
                    <FaPlus />
                  </IconButton>
                  <Typography variant="h6">{item.quantity}</Typography>
                  <IconButton
                    color="primary"
                    onClick={() => handleDecreaseQuantity(item.product.id)}
                  >
                    <FaMinus />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveItem(item.product.id)}
                  >
                    <FaTrash />
                  </IconButton>
                  <Box flexGrow={1} textAlign="right">
                    <Typography variant="h6">
                      <b>Price:</b> $
                      {(item.product.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Divider />
          </Grid>
        </motion.div>
      );
    });
  };

  return (
    <Box>
      <Grid container direction="column" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h3" align="center">
            Your Cart Total: &nbsp;<strong>${calculateTotal()}</strong>
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={cartItems.length === 0}
              onClick={submitCheckout}
              padding="3rem"
            >
              Checkout
            </Button>
          </div>
        </Grid>
        <Grid item container direction="column" spacing={2}>
          {renderCartItems()}
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Box>
  );
};
export default ShoppingCart;
