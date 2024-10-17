<template>
  <div class="front-wave absolute bottom-0 z-0 h-65px w-[400%]" />
  <div class="foreground-wave absolute bottom-0 z-1 h-80px w-[400%]" />
</template>

<style lang="scss" scoped>
.front-wave {
  background: url('../assets/wave1.png') repeat-x;
  animation: front-wave-animation 30s infinite linear;
}

.foreground-wave {
  background: url('../assets/wave2.png') repeat-x;
  animation: foreground-wave-animation 20s infinite linear;
}

@keyframes front-wave-animation {
  0% {
    left: 0;
  }

  100% {
    left: -997px;
  }
}

@keyframes foreground-wave-animation {
  0% {
    left: 0;
  }

  100% {
    left: -1009px;
  }
}
</style>
