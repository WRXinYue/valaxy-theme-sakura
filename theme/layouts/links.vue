<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <SakuraMultiColumns class="mt-$sakura-navbar-spacing">
    <SakuraLinks :links="frontmatter.links" :random="frontmatter.random" :error-img="frontmatter.errorImg" />
  </SakuraMultiColumns>
</template>
