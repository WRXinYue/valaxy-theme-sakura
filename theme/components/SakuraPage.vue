<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <ClientOnly>
    <Teleport to="#sakura-main-layout-before">
      <slot name="header">
        <SakuraPageHeader :fm="frontmatter" />
      </slot>
    </Teleport>
  </ClientOnly>

  <article class="sakura-page" flex="~ col">
    <slot />
  </article>
</template>
