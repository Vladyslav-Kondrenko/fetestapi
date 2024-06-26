<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieShows, searchMovies } from '@/api/api';
import MovieSessions from '@/components/MovieSessions.vue'

const route = useRoute();
const movieId = ref(route.params.movieId);

const movieSessions = ref([]);
const movieSessionsLoading = ref(false);
const getMovieSessions = async function () {
  movieSessionsLoading.value = true;
  try {
    const moviesSessionsResponse = await getMovieShows(movieId.value);
    movieSessions.value = moviesSessionsResponse.data[movieId.value];
    console.log(movieSessions)
  } catch (error) {
    console.error(error);
  } finally {
    movieSessionsLoading.value = false
  }
}

const movie = ref([]);
const movieLoading = ref(false);
const getMovie = async function () {
  movieLoading.value = true;
  try {
    const moviesResponse = await searchMovies(movieId.value);
    movie.value = moviesResponse.data[0];
    console.log(movie)
  } catch (error) {
    console.error(error);
  } finally {
    movieLoading.value = false
  }
}
onMounted(() => {
  getMovieSessions()
  getMovie()
});
</script>

<template>
  <div>
    <div class="flex flex-col md:flex-row gap-4 mb-4">
      <div class="h-80 overflow-hidden flex-shrink-0">
        <img :src="movie.image" :alt="movie.name" class="h-full max-h-80 object-contain	">
      </div>

      <div class="flex flex-col">
        <h1 class="font-bold text-xl md:text-3xl mb-2">{{ movie.name }}</h1>
        <div class="">{{ movie.description }}</div>
      </div>
    </div>

    <MovieSessions :movie-sessions="movieSessions" />
  </div>
</template>