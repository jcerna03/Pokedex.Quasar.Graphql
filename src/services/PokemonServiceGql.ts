import type IPageRequest from '../interfaces/IPageRequest';
import { getPokemons } from '../queries/getPokemons';
import { apolloClient } from './ApolloClient';
export async function getDataAsync({ page, limit }: IPageRequest) {
  const result = await apolloClient.query({ query: getPokemons(page, limit) });
  console.log(result);
  return result.data.pokemons;
}
