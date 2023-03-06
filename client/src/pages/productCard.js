import React from 'react';
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  card: {
    height: "400px", // or any other fixed height you prefer
    maxWidth: 345,
    margin: "1em",
    borderRadius: "16px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)"
    },
    '@media (max-width: 600px)': {
      maxWidth: "100%",
      margin: "0.5em",
      borderRadius: "8px",
      height: "300px" // or any other fixed height you prefer for smaller screens
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1em"
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "1em"
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "1em"
  }
};

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
}

export default withStyles(styles)(ProductCard);