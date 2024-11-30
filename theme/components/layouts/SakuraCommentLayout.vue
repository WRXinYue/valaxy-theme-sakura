<template>
  <SakuraPage>
    <slot name="content">
      <RouterView v-slot="{ Component }">
        <component :is="Component">
          <template #main-content-after>
            <MashiroVerse />
          </template>
        </component>
      </RouterView>
    </slot>
  </SakuraPage>
</template>
