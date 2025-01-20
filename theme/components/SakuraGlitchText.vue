<script setup lang="ts">
import type { TypewriterProps } from '../components/plugins/SakuraTypewriter.vue'

const props = defineProps<{
  text?: string
  [key: string]: any
} & Partial<TypewriterProps>>()
</script>

<template>
  <h1 class="sakura-glitch-text" :data-text="props.text || props.typeString">
    <template v-if="props.text">
      {{ props.text }}
    </template>
    <SakuraTypewriter v-else-if="props.typeString" v-bind="props" />
  </h1>
</template>

<style lang="scss" scoped>
@use 'valaxy/client/styles/mixins/index.scss' as *;

@mixin glitch-common {
  content: attr(data-text);
  position: absolute;
  top: 0;
  width: 100%;
  clip: rect(0, 0, 0, 0);
}

.sakura-glitch-text {
  display: block;
  position: relative;
  font-weight: bold;
  color: white;
  font-size: 4rem;
  line-height: initial;
  text-align: center;
  text-shadow: oklch(0% 0 0 / 20%) 4px 4px 8px;

  @include screen('md') {
    & {
      font-size: 5rem;
    }
  }

  @include screen('lg') {
    & {
      font-size: 6rem;
    }
  }

  &::before {
    @include glitch-common;

    left: -1px;
    text-shadow: 1px 0 var(--sakura-color-glitch-before);
  }

  &::after {
    @include glitch-common;

    left: 1px;
    text-shadow: -1px 0 var(--sakura-color-glitch-after);
  }

  &:hover {
    &::before {
      text-shadow: 4px 0 var(--sakura-color-glitch-before);
      animation: glitch-loop-1 0.8s infinite ease-in-out alternate-reverse;
    }

    &::after {
      text-shadow: -4px 0 var(--sakura-color-glitch-after);
      animation: glitch-loop-2 0.8s infinite ease-in-out alternate-reverse;
    }
  }
}

@keyframes glitch-loop-1 {
  0% {
    clip: rect(36px, 9999px, 9px, 0);
  }

  25% {
    clip: rect(25px, 9999px, 99px, 0);
  }

  50% {
    clip: rect(50px, 9999px, 102px, 0);
  }

  75% {
    clip: rect(30px, 9999px, 92px, 0);
  }

  100% {
    clip: rect(91px, 9999px, 98px, 0);
  }
}

@keyframes glitch-loop-2 {
  0% {
    top: -1px;
    left: 1px;
    clip: rect(65px, 9999px, 119px, 0);
  }

  25% {
    top: -6px;
    left: 4px;
    clip: rect(79px, 9999px, 19px, 0);
  }

  50% {
    top: -3px;
    left: 2px;
    clip: rect(68px, 9999px, 11px, 0);
  }

  75% {
    top: 0;
    left: -4px;
    clip: rect(95px, 9999px, 53px, 0);
  }

  100% {
    top: -1px;
    left: -1px;
    clip: rect(31px, 9999px, 149px, 0);
  }
}
</style>
