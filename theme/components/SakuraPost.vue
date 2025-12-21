<script lang="ts" setup>
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <SakuraPage class="sakura-post">
    <template #header>
      <SakuraPostHeader :fm="frontmatter" />
    </template>

    <slot />
  </SakuraPage>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-post {
  .sakura-page-content {
    max-width: 800px;
    padding-block: 24px;
  }

  .sakura-triple-columns {
    @include screen('md') {
      grid-template-columns: 150px minmax(0, 800px) 150px !important;
    }

    @include screen('lg') {
      grid-template-columns: 250px minmax(0, 800px) 250px !important;
    }
  }
}
</style>
