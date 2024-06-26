<script lang="ts" setup>
import type { MovieSession } from '@/components/movieSession.type';

defineProps<{
  movieSessions: MovieSession[]
}>();
</script>


<template>
  <div v-if="movieSessions" class="grid grid-cols-2 gap-2">
    <div v-for="session in movieSessions">
    <span class="font-bold">{{ session.showdate }}:</span>
    <div class="flex flex-wrap gap-x-2">
      <span v-for="time in session.daytime.split(';')" class="text-sm">{{ time }}</span>
    </div>
  </div>
  </div>
  <div v-else>No sessions</div>

</template>
