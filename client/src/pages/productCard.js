// importing everything we need.

import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";

// setting up some styles we need / and making it more mobile friendly
const styles = {
  card: {
    height: "400px",
    maxWidth: 345,
    margin: "1em",
    borderRadius: "16px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
    "@media (max-width: 600px)": {
      maxWidth: "100%",
      margin: "0.5em",
      borderRadius: "8px",
      height: "300px",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1em",
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "1em",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "1em",
  },
};

// rendering our component
const ProductCard = ({ product, classes }) => {
  return (
    <Card className={classes.card}>
      <CardActionArea component={Link} to={`/products/${product._id}`}>
        <CardMedia
          className={classes.media}
          image={product.image}
          alt={product.name}
        />
        <CardContent className={classes.content}>
          <Typography
            className={classes.name}
            gutterBottom
            variant="h5"
            component="div"
          >
            {product.name}
          </Typography>
          <Typography
            className={classes.price}
            variant="h5"
            color="text.secondary"
          >
            {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withStyles(styles)(ProductCard);
