import { RESTDataSource } from '@apollo/datasource-rest';
import IPokemon from 'src/interfaces/IPokemon';

export class PokemonApi extends RESTDataSource {
  override baseURL = 'https://pokeapi.co/api/v2/';

  async getPokemon1(offset = '0', limit = '10'): Promise<IPokemon> {
    const uri = `pokemon/${encodeURIComponent(offset)}`;
    return this.get<IPokemon>(uri);
  }

  async getPokemon2(offset = '0', limit = '10'): Promise<IPokemon[]> {
    const data = await this.get('pokemon', {
      params: {
        offset,
        limit,
      },
    });
    return data.results;
  }
}
