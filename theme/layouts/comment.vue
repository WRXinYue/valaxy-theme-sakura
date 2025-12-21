<template>
  <SakuraPage>
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-content-after>
          <SakuraVerse />
        </template>
      </component>
    </RouterView>
  </SakuraPage>
</template>
