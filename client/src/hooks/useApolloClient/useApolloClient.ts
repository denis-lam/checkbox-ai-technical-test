'use client';

import { ApolloClient, createHttpLink, from, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { GetApolloClientOptions } from './useApolloClient.types';

const useApolloClient = () => {
  const getApolloClient = ({ apiBaseUrl, gqlEndpointPath }: GetApolloClientOptions): ApolloClient<NormalizedCacheObject> => {
    const authenticationLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
        },
      };
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach((graphQLError) =>
          console.error('[GraphQL error]', {
            ...graphQLError,
          }),
        );
      }

      if (networkError) {
        console.error('[Network error]', {
          ...networkError,
        });
      }
    });

    const httpLink = createHttpLink({
      uri: `${apiBaseUrl}${gqlEndpointPath}`,
    });

    const link = from([authenticationLink, errorLink, httpLink]);

    return new ApolloClient({
      cache: new InMemoryCache(),
      connectToDevTools: true,
      link,
    });
  };

  return {
    getApolloClient,
  };
};

export { useApolloClient };
