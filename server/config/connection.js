// importing everything we need

const mongoose = require('mongoose');

// connect to our MongoDB Database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/newDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
