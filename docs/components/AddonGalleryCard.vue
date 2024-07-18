<script lang="ts" setup>
import type { ValaxyAddon } from './AddonGallery.vue'

defineProps<{
  addon: ValaxyAddon
}>()
</script>

<template>
  <div
    class="bg-$va-c-bg-alt transition" border rounded-xl p-4
    dark="border-dark-200"
    hover="bg-$va-c-bg shadow-md"
  >
    <a class="text-purple-600! decoration-none! dark:text-purple-300!" mr-2 :href="addon.repo" target="_blank">
      <h3 flex="~" items-center justify-center class="my-2!" font="light">
        <div class="text-black dark:text-white" i-ri-github-line mr-1 text-xl />
        <span>{{ addon.name }}</span>
      </h3>
    </a>
    <p class="my-1! text-xl!">
      <a mr-2 class="text-red-600!" :href="`https://npmjs.com/package/${addon.name}`" target="_blank" alt="NPM Package">
        <div i-ri-npmjs-line />
      </a>

      <!-- <a mr-2 class="text-black dark:text-white" :href="addon.repo" target="_blank" alt="GitHub Repo">
        <div i-ri-github-line />
      </a> -->
    </p>
    <p class="text-truncate my-1!">
      {{ addon.desc }}
    </p>
    <ul class="flex flex-wrap m-0! p-0!" items-center op="70">
      <span mr-1 inline-flex>
        <div :class="addon.icon" />
      </span>
      <span v-for="tag, j in addon.tags" :key="j" class="mr-1 break-all">
        #{{ tag }}
      </span>
    </ul>
  </div>
</template>
