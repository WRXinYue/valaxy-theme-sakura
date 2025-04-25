<script setup>
import { computed } from 'vue'

const props = defineProps({
  index: Number,
})

const randomValues = computed(() => {
  const seed = props.index
  return {
    left: Math.random() * 100,
    animationDelay: -Math.random() * 9999,
    animationDuration: Math.random() * 8 + 5,
    slideDelay: -Math.random() * 9999,
    slideDuration: Math.random() * 10 + 5,
    scale: Math.random() * 2 + 1,
    rotateDelay: -Math.random() * 9999,
    rotateDuration: Math.random() * 4 + 1,
    moveDelay: -Math.random() * 9999,
    zTranslate: Math.random() * 2000 - 1000,
    isReverse: seed <= 100,
  }
})

const dropStyle = computed(() => {
  return {
    left: `${randomValues.value.left}%`,
    animationDelay: `${randomValues.value.animationDelay}ms`,
    animationDuration: `${randomValues.value.animationDuration}s`,
  }
})

const zStyle = computed(() => {
  return {
    transform: `translateZ(${randomValues.value.zTranslate}px)`,
  }
})

const slideStyle = computed(() => {
  return {
    animationDelay: `${randomValues.value.slideDelay}ms`,
    animationDuration: `${randomValues.value.slideDuration}s`,
    animationDirection: randomValues.value.isReverse ? 'reverse' : 'normal',
  }
})

const moveStyle = computed(() => {
  return {
    animationDelay: `${randomValues.value.moveDelay}ms`,
  }
})

const reverseStyle = computed(() => {
  return {
    animationDelay: `${randomValues.value.moveDelay}ms`,
  }
})

const rotateStyle = computed(() => {
  return {
    animationDelay: `${randomValues.value.rotateDelay}ms`,
    animationDuration: `${randomValues.value.rotateDuration}s`,
  }
})

const sizeStyle = computed(() => {
  const scale = randomValues.value.isReverse ? Math.random() : randomValues.value.scale
  return {
    transform: `scale(${scale})`,
  }
})
</script>

<template>
  <div class="sakura-drop" :style="dropStyle">
    <div class="z" :style="zStyle">
      <div class="slide" :style="slideStyle">
        <div class="move" :style="moveStyle">
          <div class="stagger">
            <div class="reverse" :style="reverseStyle">
              <div class="rotate" :style="rotateStyle">
                <div class="size" :style="sizeStyle">
                  <div class="sakura" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div {
  transform-style: preserve-3d;
  position: absolute;
  top: 0;
  left: 0;
}

.sakura-drop {
  position: absolute;
  top: 0;
  left: 0;
  animation: drop 4s linear infinite;

  .slide {
    position: absolute;
    top: 0;
    left: 0;
    animation: slide 8s linear infinite;
  }

  .move {
    animation: rotate-z 10s linear infinite;
  }

  .reverse {
    animation: rotate-z 10s linear infinite reverse;
  }

  .stagger {
    transform: translateY(150px);
  }

  .rotate {
    animation: rotate-y 2s linear infinite;
  }

  .sakura {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 0% 100% 0% 100% / 0% 100% 0% 100%;
    background: oklch(89% 0.05 18.3);
    transform: rotateZ(45deg);
  }

  .sakura::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: oklch(89% 0.05 18.3);
    border-radius: 0% 100% 0% 100% / 0% 100% 0% 100%;
    transform-origin: 100% 100%;
    transform: rotate(15deg);
  }

  .drop:nth-child(n + 100) .sakura {
    transform: rotateZ(-45deg);
  }
}

@keyframes rotate-z {
  0% {
    transform: rotateZ(0deg);
  }

  100% {
    transform: rotateZ(360deg);
  }
}

@keyframes rotate-y {
  0% {
    transform: rotateZ(-45deg) rotateY(0deg);
  }

  100% {
    transform: rotateZ(-45deg) rotateY(360deg);
  }
}

@keyframes slide {
  0% {
    transform: translateX(-2000px);
  }

  100% {
    transform: translateX(2000px);
  }
}

@keyframes drop {
  0% {
    transform: translateY(-100px);
  }

  100% {
    transform: translateY(1200px);
  }
}
</style>
