<template>
  <nav>
    <ul class="pagination pagination-lg justify-content-center">
      <li class="page-item">
        <button
          class="page-link bg-dark text-white"
          @click="$emit('previousPage')"
        >
          Previous
        </button>
      </li>
      <li
        class="page-item"
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
      >
        <button
          class="page-link"
          @click="$emit('changePage', page)"
          :class="{
            'text-white': !(page === currentPage),
            'bg-dark': !(page === currentPage),
            'text-primary': page === currentPage,
            'bg-warning': page === currentPage,
            'fw-bold': page === currentPage,
          }"
        >
          {{ page }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link bg-dark text-white" @click="$emit('nextPage')">
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { inject } from 'vue';
defineProps<{ currentPage: number }>();
const limit: number = inject('limit') || 8;
const totalPages: number = Math.ceil(150 / limit);
</script>
