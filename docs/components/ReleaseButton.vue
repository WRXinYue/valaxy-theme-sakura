<script lang="ts" setup>
import pkg from 'valaxy-theme-sakura/package.json'
</script>

<template>
  <AppLink
    border="2 $sakura-primary-color" to="releases"
    class="btn animation-hvr-bounce-to-right overflow-hidden rounded-$sakura-border-radius p-0 transition" bg="gradient-to-r transparent"
    hover="shadow-md bg-transparent border-$sakura-hover-border"
  >
    <div h-9 flex items-center dark="color-white" class="color-black">
      <div class="aspect-ratio-square h-full flex items-center justify-center" bg="$sakura-primary-color">
        <div class="color-white" i-simple-icons-npm />
      </div>
      <span class="mx-2.25">
        v{{ pkg.version }} is out now!
      </span>
    </div>
  </AppLink>
</template>
