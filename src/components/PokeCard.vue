<template>
  <div class="card h-100 shadow bg-dark bg-gradient">
    <div class="card-body">
      <div
        :class="`card-title bg-${types[0].name} text-white text-center m-3 p-1 rounded shadow-sm`"
      >
        <h5 class="d-inline">{{ pokemon.name }}</h5>
      </div>
      <div class="d-flex">
        <h6
          v-for="(type, idx) in types"
          :key="idx"
          :class="`card-subtitle mb-2 text-white m-1 p-1 rounded bg-${types[0].name}-transparent`"
        >
          {{ type.name }}
        </h6>
      </div>
      <img
        :src="pokemon.sprites.front_default"
        :alt="pokemon.name"
        class="border card-img-top bg-white"
      />
      <div :class="`rounded-bottom p-3 bg-${types[0].name}-transparent`">
        <div v-for="(ability, idx) in abilities" :key="idx">
          <h6 class="card-text text-white">{{ ability.name }}</h6>
          <p>{{ ability.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ pokemon: any }>();
// eslint-disable-next-line vue/no-setup-props-destructure
const { types, abilities } = props.pokemon;
</script>
