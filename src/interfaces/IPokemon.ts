import type IAbilities from './IAbilities';
import type ITypes from './ITypes';

export default interface IPokemon {
  id: number;
  name: string;
  url: string;
  abilities: Array<IAbilities>;
  types: Array<ITypes>;
  sprites: { front_default: string };
}
