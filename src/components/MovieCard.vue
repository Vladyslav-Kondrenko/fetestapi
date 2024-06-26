<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import type { Movie } from '@/components/movie.type';
import type { MovieSession } from '@/components/movieSession.type';
import { getMovieShows } from '@/api/api';
import { Button } from '@/components/ui/button'
import { Calendar, Eye, Loader2 } from 'lucide-vue-next';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import MovieSessions from '@/components/MovieSessions.vue'
const props = defineProps<{
  movie: Movie
}>();

const movieSessions = ref<MovieSession[]>();
const movieSessionsLoading = ref(false);
const getMovieSessions = async function () {
  movieSessionsLoading.value = true;
  try {
    const moviesSessionsResponse = await getMovieShows(props.movie.id);
    movieSessions.value = moviesSessionsResponse.data[props.movie.id];
    console.log(movieSessions)
  } catch (error) {
    console.error(error);
  } finally{
    movieSessionsLoading.value = false
  }
}
</script>

<template>
  <Card class="flex flex-col">
    <CardContent>
      <div class="h-80 overflow-hidden flex justify-center mb-4 pt-6">
        <img :src="movie.image" :alt="movie.name" class="h-full max-h-80 object-contain	">
      </div>
      <CardTitle class="mb-2">{{ movie.name }}</CardTitle>
      <CardDescription>{{ movie.description }}</CardDescription>
    </CardContent>
    <CardFooter class="mt-auto flex flex-col">
      <div>
        <div v-if="movieSessions">
          <MovieSessions :movie-sessions="movieSessions" class="mb-4" />
        </div>
      </div>
      <div class="flex gap-2">
        <Button :disabled="movieSessionsLoading" @click="getMovieSessions" variant="outline" size="icon">
          <Calendar v-if="!movieSessionsLoading" class="w-4 h-4" />
          <Loader2 v-if="movieSessionsLoading" class="w-4 h-4 animate-spin" />
        </Button>
        <router-link :to="`/movie/${movie.id}`">
          <Button class="gap-1">
            Visit movie page
            <Eye class="w-4 h-4" />
          </Button>
        </router-link>
      </div>
     
    </CardFooter>
  </Card>
</template>