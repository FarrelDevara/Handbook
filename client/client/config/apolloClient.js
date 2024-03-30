import { ApolloClient, createHttpLink, InMemoryCache  } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store'

const httpLink = createHttpLink({
  uri: 'https://7399-103-121-138-101.ngrok-free.app/',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await SecureStore.getItemAsync("access_token")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// const client = new ApolloClient({
//     uri: 'https://7399-103-121-138-101.ngrok-free.app/',
//     cache: new InMemoryCache(),
//   });

export default client

