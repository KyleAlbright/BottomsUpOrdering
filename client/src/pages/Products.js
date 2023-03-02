import * as React from "react";
// import { useQuery } from "@apollo/client";

import {Grid} from "@material-ui/core";
// import { QUERY_PRODUCTS } from "../utils/queries";
import ProductSeeds from "./productSeeds.json"
import ProductCard from "./productCard"

const Products = () => {
//   const { loading, data } = useQuery(QUERY_PRODUCTS);
//   const products = data?.products || [];
let products = ProductSeeds

  return (
   <>
<Grid container spacing={24} justify="center">

   {ProductSeeds.map(product => {
     return  <Grid item xs={2} sm={4} md={3} key={product} sx={{margin: "20px auto"}}> <ProductCard product={product}/>    </Grid>
   })
   }
     
   </Grid>
   </>
  );
};
export default Products;
