import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { getDataAsync } from '../services/PokemonServiceGql';
import type IPokemon from '../interfaces/IPokemon';

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons: Ref<Array<IPokemon>> = ref([]);
  const isLoading: Ref<boolean> = ref(true);
  const searchPokemonInput: Ref<string> = ref('');

  const getPokemons = async ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => {
    const data = await getDataAsync({ page, limit });
    pokemons.value = data;
  };

  const setIsLoadingValue = (value: boolean) => (isLoading.value = value);

  const setSearchPokemonInput = (value: string) =>
    (searchPokemonInput.value = value);

  return {
    pokemons,
    getPokemons,
    isLoading,
    setIsLoadingValue,
    searchPokemonInput,
    setSearchPokemonInput,
  };
});
