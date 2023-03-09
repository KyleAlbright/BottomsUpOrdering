// import everything we need

const db = require('../config/connection');
const { User, Product } = require('../models');
const productSeeds = require('./productSeeds.json');
const userSeeds = require('./userSeeds.json');

// run this once MongoDB connection is open - delete any existing items from DB, and then seed the new items
db.once('open', async () => {
  await Product.deleteMany({});
  await User.deleteMany({});

  await Product.create(productSeeds);
  await User.create(userSeeds);
  
  // status message when completed - exits with a status code of 0
  console.log('all done!');
  process.exit(0);
});