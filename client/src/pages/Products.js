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

const Products = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const [selectedProductType, setSelectedProductType] = React.useState(null);
  const products = data?.products || [];

  const handleProductTypeSelect = (event) => {
    setSelectedProductType(event.target.value);
  };

  let filteredProducts = products;
  if (selectedProductType) {
    filteredProducts = products.filter(
      (product) => product.category === selectedProductType
    );
  }

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
              value={selectedProductType}
              onChange={handleProductTypeSelect}
            >
              <MenuItem value={null}>All Products</MenuItem>
              <MenuItem value="Vodka">Vodka</MenuItem>
              <MenuItem value="Gin">Gin</MenuItem>
              <MenuItem value="Rum">Rum</MenuItem>
              <MenuItem value="Tequila">Tequila</MenuItem>
              <MenuItem value="Whiskey">Whiskey</MenuItem>
              <MenuItem value="Scotch">Scotch</MenuItem>
              <MenuItem value="Mezcal">Mezcal</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>
      <Grid container spacing={2} justify="center">
        {filteredProducts.map((product) => {
          return (
            <Grid
              item
              xs={2}
              sm={4}
              md={3}
              key={product.id}
              sx={{ margin: "20px auto" }}
            >
              <ProductCard product={product} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default Products;
