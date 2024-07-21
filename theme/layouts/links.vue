<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <SakuraMultiColumnsLayout class="mt-$st-c-navbar-height">
    <LinksThemeYun :links="frontmatter.links" :random="frontmatter.random" :error-img="frontmatter.errorImg" />
  </SakuraMultiColumnsLayout>
</template>
