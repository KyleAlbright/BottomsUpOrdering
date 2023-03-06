const db = require('../config/connection');
const { User, Product } = require('../models');
const productSeeds = require('./productSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  await Product.deleteMany({});
  await User.deleteMany({});

  await Product.create(productSeeds);
  await User.create(userSeeds);
  
  console.log('all done!');
  process.exit(0);
});