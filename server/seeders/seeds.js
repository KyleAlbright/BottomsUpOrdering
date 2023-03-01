const db = require('../config/connection');
const { Product } = require('../models');
const productSeeds = require('./productSeeds.json');

db.once('open', async () => {
  await Product.deleteMany({});
  await Product.create(productSeeds);

  console.log('all done!');
  process.exit(0);
});