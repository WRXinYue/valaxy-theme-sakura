<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <Layout>
    <SakuraMultiColumnsLayout class="mt-$st-c-navbar-height">
      <LinksThemeYun :links="frontmatter.links" :random="frontmatter.random" :error-img="frontmatter.errorImg" />
    </SakuraMultiColumnsLayout>
  </Layout>
</template>
