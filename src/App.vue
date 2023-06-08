<template>
  <router-view />
</template>

<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { provideApolloClient } from '@vue/apollo-composable';
import { apolloClient } from './services/ApolloClient';
provideApolloClient(apolloClient);
</script>
