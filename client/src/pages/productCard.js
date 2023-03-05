import React from 'react'
import  { Link } from "react-router-dom"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { withStyles } from "@material-ui/core/styles"
import { ClassNames } from '@emotion/react';

// import { useQuery } from "@apollo/react-hooks";

// import { QUERY_SINGLE_PRODUCT } from '../utils/queries';


const ProductCard = ({product}) => {
  return (
    <Card className = {ClassNames.item} sx={{ maxWidth: 345 }}>
      <CardActionArea>
      <Link to={`/products/${product._id}`}>
          <>
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
               >
                {product.name}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                ><h2>{product.price}</h2>
              </Typography>
            </CardContent>
          </>
          </Link>
      </CardActionArea>
    </Card>
  );
  
}

export default withStyles({
  item:{minWidth: "350px",
margin: "1em", 
boxSizing: "border-box"},
media:{
  minWidth: "200px"
}
}) (ProductCard)
