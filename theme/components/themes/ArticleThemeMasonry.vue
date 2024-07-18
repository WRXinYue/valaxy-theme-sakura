<script setup lang="ts">
import { formatDate } from 'valaxy'
import { isVideoUrl } from '../../utils'

const { link, src, date } = defineProps({
  title: {
    type: String,
  },
  link: {
    type: String,
    default: '',
  },
  src: {
    type: String,
  },
  excerpt: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  target: {
    type: String,
  },
})
</script>

<template>
  <div>
    <RouterLink
      border="~ base rounded-lg" class="group" hover="scale-101 shadow-xl z-10"
      bg-base relative block of-hidden transition-all duration-500 :to="link" :target="target"
    >
      <video v-if="src && isVideoUrl(src)" :src="src" autoplay loop muted playsinline w-full border="b base" />
      <SakuraImageCard v-else :src="src" :to="link" />

      <div class="prose-sm m0 max-w-none bg-$st-c-bg p4 pb3 prose">
        <slot>
          <template v-if="title">
            <h2 m-0>
              {{ title }}
            </h2>
          </template>
          <div v-html="excerpt" />
        </slot>
        <div pt2 text-sm op50>
          {{ formatDate(date) }}
        </div>
      </div>
    </RouterLink>
  </div>
</template>
