import { cacheExchange, createClient, fetchExchange } from '@urql/core';
import { registerUrql } from '@urql/next/rsc';
import { Client, ssrExchange } from 'urql';

const makeClient = (url: string) => {
  const ssr = ssrExchange({ isClient: false});
  return createClient({
    url: url,
    suspense: true,
    exchanges: [cacheExchange, ssr, fetchExchange],
  });
};

export const urqlClient = (url: string): Client => {
 const client = makeClient(url);
  return client;
}