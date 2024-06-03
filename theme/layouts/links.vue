<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const frontmatter = useFrontmatter()
</script>

<template>
  <Layout>
    <slot name="header">
      <div class="mt-$st-c-navbar-height" />
    </slot>
    <SakuraMultiColumnsLayout>
      <template v-if="$slots.left" #left>
        <slot name="left" />
      </template>

      <RouterView v-slot="{ Component }">
        <component :is="Component">
          <template #main-content>
            <SakuraLinks :links="frontmatter.links" :random="frontmatter.random" />
          </template>
        </component>
      </RouterView>

      <template v-if="$slots.right" #right>
        <slot name="right" />
      </template>
    </SakuraMultiColumnsLayout>
  </Layout>
</template>
