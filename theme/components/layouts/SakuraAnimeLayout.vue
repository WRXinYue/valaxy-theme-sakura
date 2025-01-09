<template>
  <SakuraPage class="sakura-anime-page">
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-content>
          <slot name="content">
            <ValaxyBangumi />
          </slot>
        </template>
      </component>
    </RouterView>
  </SakuraPage>
</template>

<style lang="scss">
.sakura-anime-page {
  .sakura-triple-columns {
    // Preventing Bangumi component distortion
    width: 100%;
  }
}
</style>
