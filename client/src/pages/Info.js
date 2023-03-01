import React from 'react'
import { Grid, Typography, Divider, Button, Box, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import { FaCartPlus } from "react-icons/fa";

export default function Info ({title, description, price, category }) {
  return <Grid container direction ="column" style={{height: '100%'}}> 
  <Typography variant = "subtitle1">{title}</Typography>
  <Divider />
  <Box mt={2}>
<Typography variant="h4">{category}</Typography>
<Typography variant="subtitle1">{description}</Typography>
<Typography variant="">${price}</Typography>

  </Box>
  
  <Button variant= "contained" color ="primary" style={{ marginTop: "auto"}}><FaCartPlus />&nbsp; Add To Cart</Button>
  <FormControl fullWidth>
 
  <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={quantity}
    label="Quantity"
    // onChange={handleChange}
  >
    <MenuItem value={1}>1</MenuItem>
    <MenuItem value={2}>2</MenuItem>
    <MenuItem value={3}>3</MenuItem>
    <MenuItem value={4}>4</MenuItem>
    <MenuItem value={5}>5</MenuItem>
    <MenuItem value={6}>6</MenuItem>
    <MenuItem value={7}>7</MenuItem>
    <MenuItem value={8}>8</MenuItem>
    <MenuItem value={9}>9</MenuItem>
    <MenuItem value={10}>10</MenuItem>

  </Select>
</FormControl>
  </Grid>
}