<template>
  <SakuraPage>
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
