<template>
  <sup class="sup-tag">
    <slot />
  </sup>
</template>

<style lang="scss" scoped>
.sup-tag {
  color: oklch(100% 0 0);
  border-radius: 6px;
  background-color: var(--va-c-brand);
  font-size: 0.875rem;
  padding: 0.15em 0.3em 0.1em;
  user-select: none;
}
</style>
