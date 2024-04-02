<template>
  <div class="<md:hidden">
    <div class="sakura-aside">
      <SakuraAsideCustom />
    </div>
  </div>
</template>

<style lang="scss">
.sakura-aside {
  position: sticky;
  top: 120px;
  width: var(--st-c-aside-width);
  transition: box-shadow var(--va-transition-duration),
  background-color var(--va-transition-duration), opacity 0.25s,
  transform var(--va-transition-duration) cubic-bezier(0.19, 1, 0.22, 1),
  top var(--va-transition-duration);
}
</style>
