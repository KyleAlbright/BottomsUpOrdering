import React, { useState, useEffect } from "react";
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


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    setCartItems(storedCartItems);
  }, []);

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

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.product.id !== itemId
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  

  const renderCartItems = () => {
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
                      <b>Price:</b>{" "}
                      ${(item.product.price * item.quantity).toFixed(2)}
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
            Your Cart
          </Typography>
        </Grid>
        <Grid item container justifyContent="space-between" alignItems="center">
          <a href="/products">Continue Shopping</a>
          <Button color="primary" >Proceed to Checkout</Button>
        </Grid>
        <Grid item container direction="column" alignItems="center" spacing={4}>
          {renderCartItems()}
        </Grid>
      </Grid>
    </Box>
  );
};
export default ShoppingCart;
