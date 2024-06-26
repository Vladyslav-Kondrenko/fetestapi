<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import MovieBookedTicked from '@/components/MovieBookedTicked.vue';
import { getShowPlaces, bookPlace } from '@/api/api';
import { ShowPlaceData } from '@/api/api'
import type { BookPlaceRequest } from '@/api/api'
import type { MovieSession } from '@/components/movieSession.type';

const props = defineProps<{
  movieId: number,
  movieSession: MovieSession,
  movieName: string,
}>();

watch(() => props.movieSession, () => {
  getMoviePlaces();
});

const moviePlaces = ref<ShowPlaceData[]>([]);
const movieBookedPlace = ref();

const getMoviePlaces = async function () {
  try {
    const moviePlacesResponse = await getShowPlaces(props.movieId, props.movieSession.daytime, props.movieSession.showdate);
    moviePlaces.value = moviePlacesResponse.data;
  } catch (error) {
    console.error(error);
  } finally {
  }
}

const bookMoviePlaces = async function (row: number, seat: number) {
  try {
    const request: BookPlaceRequest = {
      movie_id: props.movieId,
      row: row,
      seat: seat,
      showdate: props.movieSession.showdate,
      daytime: props.movieSession.daytime,
    }
    const moviesPlacesResponse = await bookPlace(request);
    movieBookedPlace.value = moviesPlacesResponse.data;
    console.log(movieBookedPlace.value, 'BOOKED')
  } catch (error) {
    console.error(error);
  } finally {
    getMoviePlaces();
  }
}

onMounted(() => {
  getMoviePlaces();
});
</script>

<template>
  <div>
    <MovieBookedTicked v-if="movieBookedPlace" :booked-moovie-name="movieName" :booked-place="movieBookedPlace"/>
  </div>
  <div class="overflow-auto w-full">
    <div v-if="moviePlaces.length > 0" class="table-auto w-max">
      <div class="text-sm">
        <div class="flex">
          <div class="w-10 h-10 flex items-center justify-center">Seats Rows</div>
          <div v-for="n in moviePlaces[0][1]" :key="n.seat" class="w-10 h-10 flex items-center justify-center">S{{ n.seat }}</div>
        </div>
      </div>
      <div>
        <div v-for="(row, index) in moviePlaces" :key="index" class="flex">
          <div class="text-sm w-10 h-10 flex items-center justify-center"><span class="text-sm">R</span>{{ row[0].row }}</div>
          <div v-for="seat in row[1]" :key="seat.seat"
            :class="seat.is_free ? 'bg-green-200 md:hover:bg-green-400' : 'bg-red-200 md:hover:bg-red-400'"
            class="text-center w-10 h-10 flex items-center justify-center">
            <button @click="bookMoviePlaces(row[0].row, seat.seat)" :disabled="!seat.is_free" class="w-full h-full">{{ seat.seat }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>