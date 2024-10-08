<script lang="ts" setup>
import { useLayout } from 'valaxy'

const isHome = useLayout('home')
</script>

<template>
  <SakuraNavbar :class="isHome ? 'line-shrink' : 'line-expand'" :invert-scrolled="true">
    <template #nav-tool>
      <div flex>
        <SakuraToggleLocale mr-2 />
        <SakuraToggleThemeDynamic />
      </div>
    </template>
  </SakuraNavbar>
</template>

<style lang="scss" scoped>
@mixin line-animation($name, $from-width, $to-width) {
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: $from-width;
    height: 1px;
    background-color: var(--sakura-c-border);
    animation: #{$name} 0.75s forwards;
    transform: translateX(-50%);
  }

  @keyframes #{$name} {
    from {
      width: $from-width;
    }

    to {
      width: $to-width;
    }
  }
}

.line-expand {
  @include line-animation(line-expand, 0, 100%);
}

.line-shrink {
  @include line-animation(line-shrink, 100%, 0);
}
</style>
