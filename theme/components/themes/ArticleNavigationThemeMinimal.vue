<script setup lang="ts">
import { usePrevNext } from 'valaxy'

const [prev, next] = usePrevNext()
</script>

<template>
  <div v-if="prev && prev.path" class="py-8">
    <h2 class="text-xs text-gray-500 tracking-wide uppercase">
      Previous Article
    </h2>
    <div class="link">
      <RouterLink :to="prev.path">
        {{ prev.title }}
      </RouterLink>
    </div>
  </div>
  <div v-if="next && next.path" class="py-8">
    <h2 class="text-xs text-gray-500 tracking-wide uppercase">
      Next Article
    </h2>
    <div class="link">
      <RouterLink :to="next.path">
        {{ next.title }}
      </RouterLink>
    </div>
  </div>
</template>
