import React, { useState } from 'react'
import { Grid } from "@material-ui/core"
import ImageGrid from "./ImageGrid"
import MainImage from "./MainImage"
import Info from "./Info"

const images = [
  "https://cdn.caskers.com/catalog/product/cache/ce56bc73870585a38310c58e499d2fd4/j/a/jameson-original-irish-whiskey_1.jpg",
"https://products3.imgix.drizly.com/ci-casamigos-blanco-7fa61a657f6f783c.jpeg?auto=format%2Ccompress&ch=Width%2CDPR&fm=jpg&q=20"
]
const product = {
  title: "Jameson's Irish Whiskey",
  description: "Jameson Irish whiskey is a triple-distilled blended Irish whiskey, as versatile as it is smooth. First, we take the best of pot still and fine grain whiskeys. Then we triple distill them. Not because we have to, because we want to - this gives Jameson its signature smoothness.",
  price: 17.99,
  category: "Whiskey"
}

export default function SingleProduct(){
  const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div>
      <Grid container spacing ={1} style={{ maxWidth: 1100, margin: "0 auto"}}>
       <Grid item sm={1}>
        <ImageGrid images={images} onSelect={setSelectedImage} selectedImage={selectedImage}/>
       </Grid>
       <Grid item sm={5}>
        <MainImage src={images[selectedImage]}/>
       </Grid>
       <Grid item sm={6}>
        <Info {... product} />
       </Grid>

      </Grid>
    </div>
  )
}

