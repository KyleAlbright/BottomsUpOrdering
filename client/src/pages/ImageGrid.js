import React from 'react'
import { Grid } from "@material-ui/core"


export default function ImageGrid( { images }) {
  return <Grid container direction = "column" >
{images.map(image => (
   <img src={image} height={80} style = {{border: 'solid 1px #eee', cursor: "pointer"}} />
   ))}
  </Grid>
}