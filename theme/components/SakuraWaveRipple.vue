<template>
  <svg
    class="sakura-waves-ripple" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 -60 150 130"
    preserveAspectRatio="none" shape-rendering="auto"
  >
    <defs>
      <path
        id="gentle-wave"
        d="M0 44c30 0 58-90 88-90s 58 90 88 90 58-90 88-90 58 90 88 90v44h-352z"
      />
    </defs>
    <g class="sakura-waves-ripple-parallax sakura-waves-ripple-parallax-1">
      <use xlink:href="#gentle-wave" x="0" y="0" fill="var(--sakura-wave-ripple-layer-1)" />
      <use xlink:href="#gentle-wave" x="352" y="0" fill="var(--sakura-wave-ripple-layer-1)" />
    </g>
    <g class="sakura-waves-ripple-parallax sakura-waves-ripple-parallax-2">
      <use xlink:href="#gentle-wave" x="0" y="6" fill="var(--sakura-wave-ripple-layer-2)" />
      <use xlink:href="#gentle-wave" x="352" y="6" fill="var(--sakura-wave-ripple-layer-2)" />
    </g>
  </svg>
</template>

<style lang="scss" scoped>
.sakura-waves-ripple {
  position: absolute;
  width: 100%;
  height: 8vh;
  min-height: 56px;
  max-height: 96px;
  bottom: 0;
  left: 0;

  @at-root html.dark & {
    --sakura-wave-ripple-layer-1: oklch(0% 0 0);
    --sakura-wave-ripple-layer-2: oklch(0% 0 0 / 20%);
  }

  --sakura-wave-ripple-layer-1: oklch(100% 0 0);
  --sakura-wave-ripple-layer-2: oklch(100% 0 0 / 20%);
}

@keyframes sakura-wave-ripple-move {
  0% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: translate3d(-352px, 0, 0);
  }
}

.sakura-waves-ripple-parallax {
  animation: sakura-wave-ripple-move 14s linear infinite;
}

.sakura-waves-ripple-parallax-1 {
  animation-duration: 13s;
}

.sakura-waves-ripple-parallax-2 {
  animation-duration: 18s;
}

@media (width <= 768px) {
  .sakura-waves-ripple {
    height: 48px;
    min-height: 48px;
  }
}
</style>
