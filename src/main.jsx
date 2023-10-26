import React from 'react'
import ReactDOM from 'react-dom'
import FormApp from './components/FormApp.jsx'
import './index.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <FormApp />
  </ApolloProvider>,
  document.getElementById('root')
);
