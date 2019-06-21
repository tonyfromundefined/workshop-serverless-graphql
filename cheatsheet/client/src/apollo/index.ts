import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import { Store } from '../store'

let apolloClient: ApolloClient<NormalizedCacheObject>

const isServer = typeof window === 'undefined'

export function createApolloClient(store: Store, state?: any) {
  if (apolloClient) {
    return apolloClient

  } else {
    const link = createHttpLink({
      fetch,
      uri: store.environments.NEXT_APP_GRAPHQL_ENDPOINT,
    })

    const cache = new InMemoryCache()

    cache.restore(state || {})

    if (isServer) {
      return new ApolloClient({
        cache,
        link,
        ssrMode: true,
      })

    } else {
      return apolloClient = new ApolloClient({
        cache,
        connectToDevTools: true,
        link,
      })
    }
  }
}
