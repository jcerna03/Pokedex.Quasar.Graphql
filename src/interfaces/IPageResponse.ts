import type IPokemon from './IPokemon';

export default interface IPageResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<IPokemon>;
}
