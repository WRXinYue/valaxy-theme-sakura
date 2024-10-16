<script lang="ts" setup>
defineProps<{ cover?: string }>()
</script>

<template>
  <div class="flex-center card rounded-$sakura-border-radius" flex="col" min-h="100px" bg="$va-c-bg-light">
    <img
      v-if="cover" width="640" height="360"
      class="lazy select-none object-cover" h="64 md:sm" w="full"
      :src="cover"
    >

    <div v-if="$slots.header" class="card-header">
      <header>
        <slot name="header" />
      </header>
    </div>
    <slot />
    <div v-if="$slots.content" class="card-content" w="full">
      <slot name="content" />
    </div>
  </div>
</template>
