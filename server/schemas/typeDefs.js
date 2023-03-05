const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Product {
    _id: ID!
    name: String!
    description: String!
    category: String!
    price: Int
  }

  type Query {
    me: User
    getProducts: [Product]
    getSingleProduct(productId:ID!): Product
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
