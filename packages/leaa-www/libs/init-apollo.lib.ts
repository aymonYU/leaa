import fetch from 'isomorphic-unfetch';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { OperationDefinitionNode } from 'graphql';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

let apolloClient: ApolloClient<any> | null = null;

if (!process.browser) {
  // @ts-ignore
  global.fetch = fetch;
}

function createApolloClient(initialState: NormalizedCacheObject) {
  const httpLink = new HttpLink({
    uri: 'http://localhost:5555/graphql',
    // credentials: 'same-origin',
  });

  const authLink = new ApolloLink((operation, forward) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTYyNzI5MDI5LCJleHAiOjE1NzgyODEwMjl9.qydCcxmv51sXIZGqBOrDboBg2d-79kwzSHjBB2O5TOk';

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    // @ts-ignore
    return forward(operation);
  });

  const terminatingLink = split(
    ({ query: { definitions } }) =>
      definitions.some(node => {
        const { kind } = node as OperationDefinitionNode;
        return kind === 'OperationDefinition';
      }),
    httpLink,
  );

  const link = authLink.concat(ApolloLink.from([terminatingLink]));

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link,
    cache: new InMemoryCache().restore(initialState),
  });
}

export const initApollo = (initialState: any = {}) => {
  if (!process.browser) {
    return createApolloClient(initialState);
  }

  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
};