<template>
  <q-page class="row items-center justify-evenly q-px-lg">
    <PokePagination
      @previousPage="previousPage"
      @changePage="changePage"
      @nextPage="nextPage"
      :currentPage="currentPage"
    ></PokePagination>
    <PokeCards
      :input="pokemonStore.searchPokemonInput"
      :currentPage="currentPage"
    ></PokeCards>
  </q-page>
</template>

<script setup lang="ts">
import PokePagination from '../components/PokePagination.vue';
import PokeCards from '../components/PokeCards.vue';
import { ref } from 'vue';
import { usePokemonStore } from '../stores/pokemon';

const currentPage = ref(1);

const pokemonStore = usePokemonStore();

const previousPage = () => {
  if (!(currentPage.value > 1)) {
    return;
  }
  pokemonStore.setSearchPokemonInput('');
  currentPage.value--;
};

const changePage = (page: number) => {
  pokemonStore.setSearchPokemonInput('');
  currentPage.value = page;
};

const nextPage = () => {
  if (currentPage.value > 114) {
    return;
  }
  pokemonStore.setSearchPokemonInput('');
  currentPage.value++;
};
</script>
