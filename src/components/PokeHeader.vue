<template>
  <header class="py-3 mb-4 border-bottom text-white">
    <div class="container d-flex flex-wrap justify-content-between">
      <img
        @click="$emit('changePage', 1)"
        class="img-fluid w-25 btn"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1920px-International_Pok%C3%A9mon_logo.svg.png"
      />
      <div class="col-12 col-lg-4 d-flex">
        <input
          type="search"
          @input="inputEvent"
          v-model="pokemonStore.searchPokemonInput"
          class="form-control align-self-center"
          placeholder="Search..."
          aria-label="Search"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { usePokemonStore } from '../stores/pokemon';

const pokemonStore = usePokemonStore();

const inputEvent = (payload: Event) => {
  if (payload.target === null) {
    return;
  }
  const target = payload.target as HTMLTextAreaElement;
  pokemonStore.setSearchPokemonInput(target.value);
};
</script>

<style scoped></style>
