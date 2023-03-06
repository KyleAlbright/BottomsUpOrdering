import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Products from "./pages/Products";
import Contact from "./pages/ContactForm";
import LogAndSign from "./components/LogAndSign"
import Footer from "./components/Footer";
import SingleProduct from "./pages/singleProduct"
import ShoppingCart from "./pages/shoppingCart"

//importing the apollo client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="login" element={<LogAndSign />} />
            <Route path="products/:productId" element={<SingleProduct />} />
            <Route path="contact" element={<Contact />} />
            <Route path ="shoppingcart" element={<ShoppingCart/>} />
            
          </Routes>
        </>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;

