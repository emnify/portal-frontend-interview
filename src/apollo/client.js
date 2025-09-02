import { ApolloClient, ApolloLink, createHttpLink, from, InMemoryCache } from '@apollo/client/core';


const httpLink = createHttpLink({
  uri: 'https://api-staging.dev.emnify.io/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('authToken');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

