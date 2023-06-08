<template>
  <div class="container">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated class="bg-transparent">
        <q-toolbar inset>
          <PokeHeader @search="search"></PokeHeader>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import PokeHeader from '../components/PokeHeader.vue';
import { usePokemonStore } from 'src/stores/pokemon';

const pokemonStore = usePokemonStore();

const search = (text: string) => pokemonStore.setSearchPokemonInput(text);
</script>
