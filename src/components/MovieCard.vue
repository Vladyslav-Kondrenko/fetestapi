<script lang="ts" setup>
import { defineProps } from 'vue';
import type { Movie } from '@/components/movie.type';
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card'
defineProps<{
  movie: Movie
}>();


</script>

<template>
  <Card class="flex flex-col md:hover:shadow-lg md:transition-shadow">
    <CardContent>
      <router-link :to="`/movie/${movie.id}`">
        <div class="h-80 overflow-hidden flex justify-center mb-4 pt-6">
          <img :src="movie.image" :alt="movie.name" class="h-full max-h-80 object-contain	">
        </div>
        <CardTitle class="mb-2">{{ movie.name }}</CardTitle>
      </router-link>
      <CardDescription>{{ movie.description.slice(0, 360) }}</CardDescription>
    </CardContent>
    <CardFooter class="mt-auto flex flex-col">
      <div class="flex gap-2">
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