import gql from 'graphql-tag';

export const getPokemons = (page: number, limit: number) => gql`
  query getPokemons {
    pokemons(limit: ${limit}, page: ${page}) {
      id
      name
      types {
        name
      }
      abilities {
        name
        description
      }
      sprites {
        front_default
        front_shiny
      }
    }
  }
`;
