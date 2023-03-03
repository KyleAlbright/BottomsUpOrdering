import React, { useState } from 'react'
import { Grid } from "@material-ui/core"
import MainImage from "./MainImage"
import Info from "./Info"
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries"
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { productId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    // pass URL parameter
    variables: { productId: productId },
  });

  const product = data?.getSingleProduct || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Grid container spacing ={1} style={{ maxWidth: 1100, margin: "0 auto"}}>
     
       <Grid item sm={5}>
        <MainImage src={product.image}/>
       </Grid>
       <Grid item sm={6}>
        <Info props= {product} />
       </Grid>

      </Grid>
    </div>
  )
}

export default SingleProduct;