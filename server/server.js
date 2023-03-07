const express = require('express');
const path = require('path');
const db = require('./config/connection');
const stripe = require('stripe')('sk_test_51Mik08C8hyV43LfX6Z9u8lBOcsB5CkHMtXeU8two3VugDeY6ZbAab65YMJo8E8pV8QYuYhSKvOvPusLRuFcd2cnc00av0E55rl');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const serverStart = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

serverStart();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.post('/checkout', async (req, res) => {
  const { amount, token } = req.body;

  try {
    const items = req.body({
      amount: amount * 100,
      currency: 'usd',
      source: token.id,
      description: 'Description of the payment',
    });

    // handle the successful payment
    res.json({ success: true });
  } catch (err) {
    // handle the failed payment
    res.json({ success: false, error: err.message });
  }
});

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});