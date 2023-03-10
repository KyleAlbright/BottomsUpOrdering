// import everything we need

const { Schema, model } = require('mongoose');



const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  
  description: {
    type: String, 
    required: true, 

  },

  category: {
    type: String, 
    required: true, 
  },

  price: {
   type: Number, 
   required: true
  
  },

  image: {
    type: String,
    required: true
  }
});

const Product = model('Product', productSchema);

module.exports = Product;