<template>
  <div class="front-wave absolute z-0 bottom-0 w-[400%] h-65px" />
  <div class="foreground-wave absolute z-1 bottom-0 w-[400%] h-80px" />
</template>

<style lang="scss" scoped>
.front-wave {
  background: url("../assets/wave1.png") repeat-x;
  animation: front-wave-animation 30s infinite linear;
}

.foreground-wave {
  background: url("../assets/wave2.png") repeat-x;
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
