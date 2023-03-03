import * as React from "react";
import { useQuery } from "@apollo/client";

import {
  Grid,
  Container,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import { QUERY_PRODUCTS } from "../utils/queries";

import ProductCard from "./productCard";
// import Bottles from "../assets/bottles.jpg";

const Products = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const products = data?.products || [];

  console.log(data);

  return (
    <>
      <Container id="hero" className="hero" maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Search by Product
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              View Items by type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Quantity"
            >
              <MenuItem value={1}>Vodka</MenuItem>
              <MenuItem value={2}>Gin</MenuItem>
              <MenuItem value={3}>Rum</MenuItem>
              <MenuItem value={4}>Tequila</MenuItem>
              <MenuItem value={5}>Whiskey</MenuItem>
              <MenuItem value={6}>Scotch</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>
      <Grid container spacing={2} justify="center">
          
        {products.map((product) => {
          console.log("I am a product")
          return (
            <Grid
              item
              xs={2}
              sm={4}
              md={3}
              key={product}
              sx={{ margin: "20px auto" }}
            >
              {" "}
              <ProductCard product={product}/>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default Products;
