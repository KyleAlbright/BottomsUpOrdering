import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query products {
    products {
      _id
      name
      stripeID
      description 
     category
      price
      image
    }
  }
`;

export const QUERY_SINGLE_PRODUCT = gql`
  query singleProduct ($productId: ID!) {
    getSingleProduct (productId: $productId) {
      _id
      name
      stripeID
      description 
     category
      price
      image
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;


