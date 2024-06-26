<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-vue-next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MOVIE_GENRES } from '@/components/movieGenres.data'
import { searchMovies } from '@/api/api';
import { Movie } from '@/components/movie.type'

const searchQuery = ref('');
const searchGenre = ref('');

const searchResults = ref<Movie[]>([]);
const searchResultsLoading = ref(false);

const movieSearchByQueryAndGenre = async function () {
  searchResultsLoading.value = true;
  if (searchQuery.value.length === 0) {
    searchResults.value = [];
    return;
  }
  try {
    const moviesSessionsResponse = await searchMovies(undefined, searchQuery.value, +searchGenre.value);
    searchResults.value = moviesSessionsResponse.data;
    console.log(searchResults)
  } catch (error) {
    console.error(error);
  } finally {
    searchResultsLoading.value = false
  }
}

watch(searchQuery, () => {
  movieSearchByQueryAndGenre()
})

watch(searchGenre, () => {
  movieSearchByQueryAndGenre()
})

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    clearSearchForm()
  }
};

const clearSearchForm = () => {
  searchQuery.value = '';
  searchGenre.value = '';
  searchResults.value = [];
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div class="flex gap-2 flex-col md:flex-row md:max-w-2xl md:justify-center mx-auto relative search-component">
    <div class="relative w-full max-w-sm items-center">
      <Input v-model="searchQuery" id="search" type="text" placeholder="Search..." class="pl-10" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>

    <Select v-model="searchGenre">
      <SelectTrigger>
        <SelectValue placeholder="Select a genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="genre in MOVIE_GENRES" :value="genre.value.toString()">
          {{ genre.name }}
        </SelectItem>
      </SelectContent>
    </Select>

    <Button @click="clearSearchForm" variant="outline" size="icon" class="shrink-0">
    <X class="w-4 h-4" />
  </Button>

    <div v-if="searchResults" class="absolute top-[100%] bg-white max-h-48 overflow-auto border mt-1 flex flex-col gap-2">
      <div v-for="movie in searchResults" class="flex flex-col justify-start items-start gap-4">
        <router-link :to="`/movie/${movie.id}`" class="  p-2 md:hover:bg-slate-100 md:transition-colors w-full">
          <div class="flex gap-4 justify-start">
          <div class="h-20 overflow-hidden flex justify-center shrink-0">
            <img :src="movie.image" :alt="movie.name" class="h-full max-h-20 object-contain">
          </div>
          <div class="flex flex-col">
            <p class="font-bold">{{ movie.name }}</p>
            <div>{{ movie.description }}</div>
          </div>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
