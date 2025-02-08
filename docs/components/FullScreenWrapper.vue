<script lang="ts" setup>
import { ref } from 'vue'

const isFullscreen = ref(false)

function toggleFullScreen() {
  isFullscreen.value = !isFullscreen.value
}
</script>

<template>
  <div
    class="full-screen-wrapper"
    :class="{ 'is-fullscreen': isFullscreen }"
  >
    <div />
    <slot />
    <div class="popup-button" @click="toggleFullScreen">
      <div v-show="isFullscreen" i-qlementine-icons-fullscreen-exit-16 />
      <div v-show="!isFullscreen" i-qlementine-icons-fullscreen-16 />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.full-screen-wrapper {
  cursor: pointer;

  .popup-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 1002;
    cursor: pointer;
    appearance: none;
    border: none;
    padding: 0.5rem;
    background-color: var(--oceanus-c-bg-design);
    border-radius: 6px;
    box-shadow: 2px 2px 6px oklch(0% 0 0 / 40%);
    transform: translate(0.25rem) scale(0.9);
    transition: 0.25s cubic-bezier(0.5, 0, 0.5, 1);
    opacity: 0;
    transition-property: transform, background-color, opacity;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 1001;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-width: 200px;
    max-height: 200px;
    background: linear-gradient(
      to bottom left,
      oklch(0% 0 0 / 70%),
      oklch(0% 0 0 / 20%),
      transparent 49%
    );
    opacity: 0;
    transition: inherit;
    transform: scale(0.9);
    transform-origin: top right;
    transition-property: opacity, transform;
  }

  &:hover {
    .popup-button {
      transform: translate(0) scale(1);
      opacity: 1;
    }

    &::before {
      opacity: 0.8;
    }
  }
}

.full-screen-wrapper.is-fullscreen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: var(--oceanus-c-bg-design);
  overflow: auto;
  animation: scale-up 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) !important;

  .popup-button {
    top: 2rem;
    right: 3rem;
  }

  @keyframes scale-up {
    0% {
      transform: scale(0.5);
    }

    100% {
      transform: scale(1);
    }
  }
}
</style>
