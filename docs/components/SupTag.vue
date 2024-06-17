<template>
  <sup class="sup-tag">
    <slot />
  </sup>
</template>

<style lang="scss">
.sup-tag {
  color: #fff;
  border-radius: 6px;
  background-color: var(--st-c-secondary);
  font-size: 0.875rem;
  padding: 0.15em 0.3em 0.1em;
  user-select: none;
}
</style>
