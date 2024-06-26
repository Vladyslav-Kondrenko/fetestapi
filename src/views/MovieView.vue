<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieShows, searchMovies } from '@/api/api';
import MovieSessions from '@/components/MovieSessions.vue';
import MovieBookPlace from '@/components/MovieBookPlace.vue';
import type { MovieSession } from '@/components/movieSession.type';
import type { Movie } from '@/components/movie.type'
const route = useRoute();
const movieId = ref<number>(Array.isArray(route.params.movieId) ? parseInt(route.params.movieId[0]) : parseInt(route.params.movieId));


const movieSessions = ref([]);
const selectedMovieSession = ref<MovieSession | null>(null);
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

const movie = ref<Movie>();
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

function updateSelectedSession(session: MovieSession) {
  selectedMovieSession.value = session;
}

onMounted(() => {
  getMovieSessions()
  getMovie()
});
</script>

<template>
  <div>
    <div v-if="movie" class="flex flex-col md:flex-row gap-4 mb-4">
      <div class="h-80 overflow-hidden flex-shrink-0">
        <img :src="movie.image" :alt="movie.name" class="h-full max-h-80 object-contain	">
      </div>

      <div class="flex flex-col">
        <h1 class="font-bold text-xl md:text-3xl mb-2">{{ movie.name }}</h1>
        <div class="">{{ movie.description }}</div>
      </div>
    </div>
    <p class="text-2xl font-medium">Movie Sessions</p>
    <MovieSessions :movie-sessions="movieSessions" @update:selected-movie-session="updateSelectedSession"  />
    <MovieBookPlace v-if="selectedMovieSession && movie?.name" :movie-name="movie?.name" :movie-id="movieId" :movie-session="selectedMovieSession" />
    <div v-if="!selectedMovieSession">
      <p class="text-2xl font-medium text-center">Select Session to see available tickets</p>
    </div>
  </div>
</template>