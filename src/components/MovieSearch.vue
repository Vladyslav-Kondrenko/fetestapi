<script setup lang="ts">
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'

const searchQuery = ref('');
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input v-model="searchQuery" id="search" type="text" placeholder="Search..." class="pl-10" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>