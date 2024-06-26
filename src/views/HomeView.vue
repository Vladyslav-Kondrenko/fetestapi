<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAllMovies } from '@/api/api';
import MovieCard from '@/components/MovieCard.vue'
const movies = ref([]);

onMounted(async () => {
  try {
    const moviesResponse = await getAllMovies();
    movies.value = moviesResponse.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" v-if="movies">
      <MovieCard v-for="movie in movies" :movie="movie" />
    </div>
</template>
