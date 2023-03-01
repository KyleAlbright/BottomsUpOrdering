import React from 'react'
import { Grid, Typography, Divider, Button, Box } from "@material-ui/core"

export default function Info ({title, description, price, category }) {
  return <Grid container direction ="column" style={{height: '100%'}}> 
  <Typography variant = "subtitle1">{title}</Typography>
  <Divider />
  <Box mt={2}>
<Typography variant="h4">{category}</Typography>
<Typography variant="subtitle1">{description}</Typography>
<Typography variant="">${price}</Typography>

  </Box>

  <Button variant= "contained" color ="primary" style={{ marginTop: "auto"}}>
    Add To Cart
  </Button>
  </Grid>
}