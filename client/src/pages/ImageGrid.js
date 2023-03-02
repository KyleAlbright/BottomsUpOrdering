import React from 'react'
import { Grid } from "@material-ui/core"


export default function ImageGrid( { images, onSelect, selectedImage }) {
  return <Grid container direction = "column" >
{images.map((image, index) => (
   <img 
   src={image} 
   height={80} 
   onClick={() => onSelect(index)}
   style = {{border: index === selectedImage ?  'solid 1px black' :'solid 1px #eee' , cursor: "pointer"}} />
   ))}
  </Grid>
}