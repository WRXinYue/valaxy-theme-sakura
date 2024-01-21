<template>
  <div class="antialiased">
    <SakuraNav>
      <slot name="main-nav" />
    </SakuraNav>

    <main class="mx-auto">
      <slot>
        <RouterView v-slot="{ Component }">
          <component :is="Component">
            <template #main-nav>
              <slot name="main-nav" />
            </template>

            <template #main-header>
              <slot name="main-header" />
            </template>

            <template #main-header-after>
              <slot name="main-header-after" />
            </template>
            <template #main>
              <slot name="main" />
            </template>
            <template #main-content>
              <slot name="main-content" />
            </template>
            <template #main-content-after>
              <slot name="main-content-after" />
            </template>
            <template #main-nav-before>
              <slot name="main-nav-before" />
            </template>
            <template #main-nav-after>
              <slot name="main-nav-after" />
            </template>
            <template #aside-custom>
              <slot name="aside-custom" />
            </template>
            <template #footer>
              <slot name="footer" />
            </template>
          </component>
        </RouterView>
      </slot>
    </main>

    <StarterHelper />

    <SakuraFooter>
      <slot name="footer" />
    </SakuraFooter>
  </div>
</template>
