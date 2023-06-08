import { PokemonApi } from './PokemonApi';

export default interface IContextValue {
  dataSources: {
    pokemonApi: PokemonApi;
  };
}
