<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <SakuraMultiColumnsLayout class="mt-$sakura-c-navbar-spacing">
    <SakuraLinks :links="frontmatter.links" :random="frontmatter.random" :error-img="frontmatter.errorImg" />
  </SakuraMultiColumnsLayout>
</template>
