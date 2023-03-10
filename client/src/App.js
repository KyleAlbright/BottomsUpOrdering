// importing all of our routes, and browser router
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Products from "./pages/Products";
import Contact from "./pages/ContactForm";
import LogAndSign from "./components/LogAndSign";
import Footer from "./components/Footer";
import SingleProduct from "./pages/singleProduct";
import ShoppingCart from "./pages/shoppingCart";
import Success from "./pages/Success";

//importing the apollo client
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// creating our url to graphql
const httpLink = createHttpLink({
  uri: "/graphql",
});

// setting our token in local storage
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// creating a new instance of the ApolloClient
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// all of our routes we are using. The nav bar and footer are outside of the router, because we are always rendering those pages.
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products">
              <Route index={true} element={<Products />}></Route>

              <Route path=":productId" element={<SingleProduct />} />
            </Route>

            <Route path="login" element={<LogAndSign />} />
            <Route path="shoppingcart" element={<ShoppingCart />} />
            <Route path="success" element={<Success />} />
            <Route path="contact" element={<Contact />} />
          </Routes>
        </>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
