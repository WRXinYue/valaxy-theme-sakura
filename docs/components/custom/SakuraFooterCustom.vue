<script lang="ts" setup>
import { useLayout } from 'valaxy'

const isHome = useLayout('home')
</script>

<template>
  <div v-show="!isHome" class="animated mb-7 mt-10 b-t-1 b-t-$sakura-border-color b-t-solid" />
  <SakuraFooter />
</template>
