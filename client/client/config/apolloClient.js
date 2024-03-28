import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://1dee-139-228-111-126.ngrok-free.app/',
    cache: new InMemoryCache(),
  });

export default client

