<template>
  <SakuraPage>
    <RouterView v-slot="{ Component }">
      <component :is="Component">
        <template #main-content>
          <div class="sakura-browse-content sakura-safe-padding">
            <slot name="content">
              <SakuraBangumi />
            </slot>
          </div>
        </template>
      </component>
    </RouterView>
  </SakuraPage>
</template>
