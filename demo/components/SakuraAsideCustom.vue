<script lang="ts" setup>
import { useLayout } from 'valaxy'

const isPost = useLayout('post')
</script>

<template>
  <SakuraToc v-if="isPost" ml-32px />
  <SakuraToTop class="<md:hidden" />
</template>
