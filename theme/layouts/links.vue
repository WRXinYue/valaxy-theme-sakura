<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <SakuraPage>
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-content>
          <SakuraLinks :links="frontmatter.links" :random="frontmatter.random" :error-img="frontmatter.errorImg" />
        </template>
      </component>
    </RouterView>
  </SakuraPage>
</template>
