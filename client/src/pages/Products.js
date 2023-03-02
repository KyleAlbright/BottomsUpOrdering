import * as React from "react";
// import { useQuery } from "@apollo/client";

// import Grid from "@material-ui/core";
// import { QUERY_PRODUCTS } from "../utils/queries";
import ProductSeeds from "./productSeeds.json"
import ProductCard from "./productCard"

const Products = () => {
//   const { loading, data } = useQuery(QUERY_PRODUCTS);
//   const products = data?.products || [];
let products = ProductSeeds
  return (
   <>
   {ProductSeeds.map(product => {
     return <ProductCard product={product}/> 
   })
   }
   </>
  );
};
export default Products;
