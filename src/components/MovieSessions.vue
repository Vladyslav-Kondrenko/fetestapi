<script lang="ts" setup>
import { ref } from 'vue';
import type { MovieSession } from '@/components/movieSession.type';

defineProps<{
  movieSessions: MovieSession[]
}>();

const emit = defineEmits<{
  (e: 'update:selectedMovieSession', session: MovieSession): void
}>();

const selectedMovieSession = ref<MovieSession | null>(null);

function selectSession(session: MovieSession) {
  selectedMovieSession.value = session;
  emit('update:selectedMovieSession', session);
}
</script>

<template>
  <div v-if="movieSessions" class="grid grid-cols-2 gap-2 mb-8">
    <div v-for="session in movieSessions" :key="session.showdate"
      :class="{ 'bg-gray-200': session.showdate === selectedMovieSession?.showdate }"
      class="p-2 cursor-pointer border rounded md:hover:bg-gray-200 md:transition-colors">
      <span class="font-bold">{{ session.showdate }}:</span>
      <div class="flex flex-wrap gap-x-1">
        <span v-for="time in session.daytime.split(';')" :key="time" class="text-sm">
          <button @click="selectSession({ showdate: session.showdate, daytime: time })"
            :class="{ 'bg-gray-400': time === selectedMovieSession?.daytime && session.showdate === selectedMovieSession.showdate }" class=" px-1 border border-zinc-500 md:hover:bg-gray-300 md: transition-colors">
            {{ time }}
          </button>
        </span>
      </div>
    </div>
  </div>
  <div v-else>No sessions</div>
</template>
