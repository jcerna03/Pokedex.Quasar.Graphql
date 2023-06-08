<template>
  <PokeSpinner v-if="pokemonStore.isLoading"></PokeSpinner>
  <div v-else class="container">
    <div class="row">
      <div
        v-for="pokemon in resultsToDisplay"
        :key="pokemon.id"
        className="col-12 col-sm-6 col-md-4 col-lg-3 p-3"
      >
        <PokeCard :pokemon="pokemon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref, watch, inject } from 'vue';
import PokeCard from '../components/PokeCard.vue';
import { usePokemonStore } from '../stores/pokemon';
import PokeSpinner from '../components/PokeSpinner.vue';

const props = defineProps<{ input: string; currentPage: number }>();
const pokemonStore = usePokemonStore();
const resultsToDisplay: Ref<Array<any>> = ref([]);

const limit: number = inject('limit') || 8;

onMounted(async () => {
  fetchData(props.currentPage);
});

watch(
  () => props.input,
  (input: string) => {
    if (typeof input === 'string')
      resultsToDisplay.value = pokemonStore.pokemons.filter((pokemon) =>
        pokemon.name.includes(input)
      );
  }
);

watch(
  () => props.currentPage,
  async (page) => {
    await fetchData(page);
  }
);

const fetchData: (page: number) => Promise<void> = async (page: number) => {
  pokemonStore.setIsLoadingValue(true);
  await pokemonStore.getPokemons({ page, limit });
  resultsToDisplay.value = pokemonStore.pokemons;
  pokemonStore.setIsLoadingValue(false);
};
</script>
