<script lang="ts" setup>
import { useLayout } from 'valaxy'

const isHome = useLayout('home')
</script>

<template>
  <SakuraMultiColumns class="sakura-post-grid-layout">
    <template #left>
      <SakuraAside>
        <SidebarThemeDynamic />
      </SakuraAside>
    </template>
    <template #content>
      <div class="content grid">
        <RouterView v-slot="{ Component }">
          <component :is="Component">
            <template #main-content-after>
              <div class="prose">
                <p /> <!-- Context spacing -->
                <h2 id="Contributors">
                  <a href="#Contributors" class="header-anchor" />
                  Contributors
                </h2>
                <GitLogContributor />
              </div>
            </template>
          </component>
        </RouterView>
      </div>
    </template>
    <template #right>
      <SakuraAside>
        <SakuraToc v-if="!isHome" />
      </SakuraAside>
    </template>
  </SakuraMultiColumns>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

.sakura-post-grid-layout {
  transition: grid-template-columns 0.3s ease;

  @include screen('md') {
    grid-template-columns: 150px 1fr 0;
  }

  @include screen('lg') {
    grid-template-columns: 250px 1fr 250px;
  }
}
</style>
