<script lang="ts" setup>
import { useLayout } from 'valaxy'

const isHome = useLayout('home')
</script>

<template>
  <Layout>
    <SakuraMultiColumnsLayout class="sidebar">
      <template #left>
        <SakuraAsideLayout>
          <SakuraSidebarCustom />
        </SakuraAsideLayout>
      </template>
      <template #content>
        <SakuraArticle>
          <RouterView />
        </sakuraarticle>
      </template>
      <template #right>
        <SakuraAsideLayout>
          <SakuraToc v-if="!isHome" />
        </SakuraAsideLayout>
      </template>
    </SakuraMultiColumnsLayout>
  </Layout>
</template>
