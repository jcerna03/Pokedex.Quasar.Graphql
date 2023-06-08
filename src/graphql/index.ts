import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { RESTDataSource } from '@apollo/datasource-rest';
import IPokemon from 'src/interfaces/IPokemon';

class PokemonApi extends RESTDataSource {
  override baseURL = 'https://pokeapi.co/api/';

  async getPokemons(page = 0, limit = 8): Promise<Array<IPokemon>> {
    const response: Array<IPokemon> = [];

    const offset = ((page - 1) * limit).toString();
    const data = await this.get('v2/pokemon', {
      params: {
        offset,
        limit: limit.toString(),
      },
    });

    for (const result of data.results) {
      const pokemonDetailsPathName = new URL(result.url).pathname;
      const pokemonDetails = await this.get(pokemonDetailsPathName);

      for (const { ability } of pokemonDetails.abilities) {
        const abilityDetailsPathName = new URL(ability.url).pathname;
        const abilityDetails = await this.get(abilityDetailsPathName);

        ability.description = abilityDetails.flavor_text_entries.filter(
          (e: { language: { name: string } }) => e.language.name === 'en'
        )[0].flavor_text;
      }

      response.push(pokemonDetails);
    }

    return response;
  }
}

interface IContextValue {
  dataSources: {
    pokemonApi: PokemonApi;
  };
}

const typeDefs = `#graphql
type Ability {
 name: String
 description: String
}

type Type {
 name : String
}

type Sprites {
  front_default: String
  front_shiny: String
}

type Pokemon {
  id: ID
  name: String
  url: String
  abilities: [Ability]
  types: [Type]
  sprites: Sprites
}

type Query {
  pokemons(page: Int, limit: Int): [Pokemon]
}
`;

const resolvers = {
  Query: {
    pokemons: async (
      _: unknown,
      { page, limit }: { page: number; limit: number },
      { dataSources }: any
    ) => dataSources.pokemonApi.getPokemons(page, limit),
  },
  Pokemon: {
    types: (root: { types: never[] }) =>
      root.types.map((type: { type: { name: never } }) => ({
        name: type.type.name,
      })),
    abilities: (root: { abilities: never[] }) =>
      root.abilities.map(
        (ability: { ability: { name: never; description: never } }) => ({
          name: ability.ability.name,
          description: ability.ability.description,
        })
      ),
  },
};

const server = new ApolloServer<IContextValue>({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    const { cache } = server;
    return {
      // We create new instances of our data sources with each request,
      // passing in our server's cache.
      dataSources: {
        pokemonApi: new PokemonApi({ cache }),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
