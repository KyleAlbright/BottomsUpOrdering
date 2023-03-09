// importing everything we need

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
import { motion } from "framer-motion";

//defining our component, using a useQuery hook to grab all our products, a hook to grab the single product when clicked, or setting up an empty array if nothing is there.
const Products = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const [selectedProductType, setSelectedProductType] = React.useState(null);
  const products = data?.products || [];

  const handleProductTypeSelect = (event) => {
    setSelectedProductType(event.target.value);
  };

  // filtering the products by category selected
  let filteredProducts = products;
  if (selectedProductType) {
    filteredProducts = products.filter(
      (product) => product.category === selectedProductType
    );
  }

  // rendering our component - used framer motion to add some effects on the render
  return (
    <>
      <Container
        id="hero"
        className="hero"
        maxWidth="sm"
        inputProps={{
          sx: {
            backgroundImage: "url('../assets/bottles.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          },
        }}
      >
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Search by Product
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
            <InputLabel id="demo-simple-select-label">
              View Items by type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Quantity"
              value={selectedProductType}
              onChange={handleProductTypeSelect}
              variant="outlined"
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
      <Grid container spacing={1} justifyContent="center">
        {filteredProducts.map((product) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
              sx={{ margin: "20px auto" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default Products;
