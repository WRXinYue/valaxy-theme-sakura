<template>
  <div class="sakura-aside <md:hidden">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.sakura-aside {
  position: sticky;
  top: calc(var(--sakura-navbar-height) + var(--sakura-navbar-mt));
  margin-top: var(--sakura-navbar-mt);

  // width: var(--sakura-aside-width);
  max-height: calc(100vh - var(--sakura-navbar-height));
  transition:
    box-shadow var(--va-transition-duration),
    background-color var(--va-transition-duration),
    opacity 0.25s,
    transform var(--va-transition-duration) cubic-bezier(0.19, 1, 0.22, 1),
    top var(--va-transition-duration);
  overflow-y: auto;
  padding-bottom: 2rem;
}
</style>
