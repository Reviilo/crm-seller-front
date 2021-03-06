import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'node-fetch'
import { setContext } from 'apollo-link-context'
  // uri: 'https://crm-sellers-back.herokuapp.com/',
  // uri: 'http://localhost:4000',
const httpLink = createHttpLink({
  uri: 'https://crm-sellers-back.herokuapp.com/',
  fetch
})

const authLink = setContext( (_, { headers }) => {
  // Get token from Local Storage
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : 'No token'
    }
  }
})

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat( httpLink )
})

export default client