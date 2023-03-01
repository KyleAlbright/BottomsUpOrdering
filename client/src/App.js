import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from "./pages/home";
import Products from "./pages/products"

//importing the apollo client
import {
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  createHttpLink, 

} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql', 
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers, 
      authorization: token ? `Bearer ${token}` : '', 
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
          <Route 
            path='/' 
            element={<Home />} 
     />
     <Route 
            path='products' 
            element={<Products />} 
     />

     </Routes>
     </>
    </Router>
    </ApolloProvider>
  );
}

export default App;