//importing everything we need

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// creating custom styling to center the success screen
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  button: {
    marginTop: theme.spacing(2),
    textDecoration: "none",
    '&:hover': {
      textDecoration: "none",
    },
  },
}));

// renders the success screen, imports our styles, and passes the handleGoHome function that will remove items from cart.
function Success() {
  const classes = useStyles();
  const handleGoHome = () => {
    localStorage.removeItem("cartItems");
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Payment Successful
      </Typography>
      <Typography variant="body1" align="center">
        Thank you for your purchase!
      </Typography>
      <a href="/">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleGoHome}
        >
          Go Home
        </Button>
      </a>
    </div>
  );
}

export default Success;