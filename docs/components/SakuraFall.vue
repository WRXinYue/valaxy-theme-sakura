<template>
  <div class="sakura-fall">
    <div class="camera camera-x">
      <div class="camera camera-y">
        <div class="camera camera-z">
          <sakura-drop
            v-for="i in 200"
            :key="i"
            :index="i"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sakura-fall {
  position: absolute;
  z-index: 1;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  perspective: 800px;

  .camera {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }

  .camera.camera-y {
    animation: camera-y 30s linear infinite;
  }

  .camera.camera-x {
    transform: rotateX(10deg) translateY(-300px);
  }

  @keyframes camera-y {
    0% {
      transform: rotateY(0deg);
    }

    100% {
      transform: rotateY(360deg);
    }
  }
}
</style>
