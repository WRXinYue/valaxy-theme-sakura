<script setup lang="ts">
defineProps<{
  demo: number
}>()
</script>

<template>
  <template v-if="demo === 0">
    <SakuraTypewriter type-string="This is a typing effect" />
  </template>

  <template v-else-if="demo === 1">
    <SakuraTypewriter type-string="This is a typing effect" loop />
  </template>

  <template v-else-if="demo === 2">
    <SakuraTypewriter type-string="This is a typing effect" loop :pause-for="500" />
  </template>

  <template v-else-if="demo === 3">
    <SakuraTypewriter type-string="This is a typing effect" loop :pause-for="500" :delete-all="100" />
  </template>

  <template v-else-if="demo === 4">
    <SakuraTypewriter type-string="<span class='color-red'>This is a typing effect</span>" loop />
  </template>

  <template v-else-if="demo === 5">
    <SakuraTypewriter :type-string="['hello valaxy', 'hello sakura']" loop :pause-for="500" :delete-all="[100, 50]" />
  </template>
</template>
