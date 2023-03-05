
import React from "react";
import { Typography, Button, Grid, Box, IconButton } from "@material-ui/core";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";


const shoppingCart = () => {
  return (
    <Box>
      <Grid container direction="column" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h3" align="center">
            Your Cart
          </Typography>
        </Grid>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Button>Continue Shopping</Button>
         
          <Button color="primary">Proceed to Checkout</Button>
        </Grid>
        <Grid item container justifyContent="space-between" alignItems="flex-start">
          <Grid item>
            <Box display="flex" alignItems="center">
              <img src="https://products2.imgix.drizly.com/ci-jameson-irish-whiskey-83c0830f276cf30a.jpeg?auto=format%2Ccompress&ch=Width%2CDPR&fm=jpg&q=20" alt="Jameson's Irish Whiskey" style={{ width: 200 }} />
              <Box ml={2}>
                <Typography variant="h5">
                  <b>Product:</b> Jameson's Irish Whiskey
                </Typography>
                <Typography variant="subtitle1">
                  <b>Category:</b> Whiskey
                </Typography>
                <Typography variant="subtitle1">
                  <b>Description:</b> "Jameson Irish whiskey is a triple-distilled blended Irish whiskey, as versatile as it is smooth. First, we take the best of pot still and fine grain whiskeys. Then we triple distill them. Not because we have to, because we want to - this gives Jameson its signature smoothness.",
                </Typography>
                <Box display="flex" alignItems="center">
                  <IconButton color="primary"><AddCircleOutline /></IconButton>
                  <Typography variant="h6">2</Typography>
                  <IconButton color="primary"><RemoveCircleOutline /></IconButton>
                </Box>
                <Typography variant="h6"><b>Price:</b> $17.99</Typography>
              </Box>
            </Box>
          </Grid>
          
        </Grid>
      </Grid>
    </Box>
  );
};

export default shoppingCart;

