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
    price: Float
    image: String!
    
  }
  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }
  type Checkout {
    session: ID
    products: [Product]
    
  }
  type Query {
    me: User
    products: [Product]
    getSingleProduct(productId:ID!): Product
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
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