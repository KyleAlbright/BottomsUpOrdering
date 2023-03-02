import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const ProductCard = ({product}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
      
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
                >{product.description}
              </Typography>
            </CardContent>
          </>
        
      </CardActionArea>
    </Card>
  );
  
}

export default ProductCard