<script lang="ts" setup>
import { useLayout } from 'valaxy'

const isHome = useLayout('home')
</script>

<template>
  <SakuraToc v-if="!isHome" class="w-0" />
  <SakuraToTop class="<md:hidden" />
</template>
