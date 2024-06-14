<script lang="ts" setup>
import pkg from 'valaxy-theme-sakura/package.json'
</script>

<template>
  <AppLink
    border="2 $st-c-secondary" to="releases"
    class="btn animation-hvr-bounce-to-right overflow-hidden transition rounded-$st-c-rd p-0" bg="gradient-to-r transparent"
    hover="shadow-md bg-transparent border-$st-hover-border"
  >
    <div flex items-center h-9 dark="color-white" class="color-black">
      <div class="aspect-ratio-square h-full flex items-center justify-center" bg="$st-c-secondary">
        <div class="color-white" i-simple-icons-npm />
      </div>
      <span class="mx-2.25">
        v{{ pkg.version }} is out now!
      </span>
    </div>
  </AppLink>
</template>
