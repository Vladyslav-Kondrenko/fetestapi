<script setup lang="ts">
import MovieSearch from '@/components/MovieSearch.vue'
</script>

<template>
  <div class="container py-10">
    <MovieSearch class="mb-4"/>
    <router-view />
  </div>
</template>