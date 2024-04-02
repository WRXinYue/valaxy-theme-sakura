<script lang="ts" setup>
import { useLayout } from 'valaxy'

const isPost = useLayout('post')
</script>

<template>
  <SakuraToc v-if="isPost" />
  <SakuraToTop class="<md:hidden" />
</template>
