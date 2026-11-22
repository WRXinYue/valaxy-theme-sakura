<script lang="ts" setup>
import type { Post } from 'valaxy'
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

const props = defineProps<{
  post: Post
}>()

type ShapeStyle = CSSProperties & Record<`--${string}`, string>

interface ShapeRole {
  size: [number, number]
  hue: [number, number]
  alpha: [number, number]
  blur: [number, number]
  cx: [number, number]
  cy: [number, number]
}

/**
 * 三块色雾的角色：主色块、副色块、点缀块
 */
const SHAPE_ROLES: ShapeRole[] = [
  { size: [44, 60], hue: [16, 32], alpha: [78, 90], blur: [40, 48], cx: [26, 44], cy: [22, 40] },
  { size: [34, 48], hue: [-32, -14], alpha: [72, 86], blur: [38, 46], cx: [56, 74], cy: [28, 46] },
  { size: [20, 30], hue: [4, 10], alpha: [40, 55], blur: [32, 40], cx: [40, 60], cy: [40, 60] },
]

/**
 * 四个角的位置范围 [leftMin, leftMax, topMin, topMax]。
 * 每次随机选三个角放色雾，避免全部挤在同一侧。
 */
const QUADRANT_ANCHORS: [number, number, number, number][] = [
  [-18, 6, -22, 2],
  [52, 78, -22, 2],
  [-18, 6, 56, 86],
  [52, 78, 56, 86],
]

function hashString(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i++)
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  return hash
}

const seed = computed(() => hashString(props.post.path || String(props.post.title || '') || 'sakura'))
const baseHue = computed(() => Math.round((seed.value * 137.5) % 360))

const style = computed<ShapeStyle>(() => ({
  '--sakura-cover-hue': `${baseHue.value}`,
}))

const shapes = computed(() => {
  let state = seed.value || 1
  const random = () => {
    state |= 0
    state = (state + 0x6D2B79F5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const range = (min: number, max: number) => min + random() * (max - min)
  const percent = (min: number, max: number) => `${range(min, max).toFixed(1)}%`
  const radius = () => {
    const horizontal = [0, 1, 2, 3].map(() => `${Math.round(range(40, 60))}%`).join(' ')
    const vertical = [0, 1, 2, 3].map(() => `${Math.round(range(40, 60))}%`).join(' ')
    return `${horizontal} / ${vertical}`
  }

  const order = [0, 1, 2, 3]
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    const temp = order[i]
    order[i] = order[j]
    order[j] = temp
  }

  return SHAPE_ROLES.map((role, index) => {
    const [leftMin, leftMax, topMin, topMax] = QUADRANT_ANCHORS[order[index]]
    return {
      key: `shape-${index}`,
      style: {
        'left': percent(leftMin - 4, leftMax + 4),
        'top': percent(topMin - 4, topMax + 4),
        'width': percent(role.size[0], role.size[1]),
        'borderRadius': radius(),
        '--shape-hue': `${Math.round((baseHue.value + range(role.hue[0], role.hue[1]) + 360) % 360)}`,
        '--shape-alpha': `${Math.round(range(role.alpha[0], role.alpha[1]))}%`,
        '--shape-blur': `${Math.round(range(role.blur[0], role.blur[1]))}px`,
        '--shape-cx': percent(role.cx[0], role.cx[1]),
        '--shape-cy': percent(role.cy[0], role.cy[1]),
        '--shape-rot': `${Math.round(range(-8, 8))}deg`,
        '--shape-dx': percent(-12, 12),
        '--shape-dy': percent(-11, 6),
        '--shape-spin': `${Math.round(range(8, 16))}deg`,
        '--shape-scale': range(1.04, 1.12).toFixed(2),
        '--shape-duration': `${range(6, 9).toFixed(1)}s`,
      } as ShapeStyle,
    }
  })
})

const initial = computed(() => {
  const title = typeof props.post.title === 'string' ? props.post.title.trim() : ''
  return title ? Array.from(title)[0].toUpperCase() : ''
})
</script>

<template>
  <div class="sakura-post-cover" :style="style" aria-hidden="true">
    <span
      v-for="shape in shapes"
      :key="shape.key"
      class="sakura-post-cover-shape"
      :style="shape.style"
    />
    <span class="sakura-post-cover-frost" />
    <span v-if="initial" class="sakura-post-cover-initial">{{ initial }}</span>
  </div>
</template>

<style lang="scss" scoped>
.sakura-post-cover {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  container-type: size;
  background: linear-gradient(
    140deg,
    oklch(97% 0.012 var(--sakura-cover-hue)) 0%,
    oklch(92% 0.015 var(--sakura-cover-hue)) 100%
  );
  box-shadow: inset 0 0 0 1px oklch(20% 0.02 var(--sakura-cover-hue) / 6%);
}

.sakura-post-cover-shape {
  position: absolute;
  aspect-ratio: 1;
  background: radial-gradient(
    circle at var(--shape-cx, 50%) var(--shape-cy, 35%),
    oklch(94% 0.05 var(--shape-hue)) 0%,
    oklch(84% 0.12 var(--shape-hue) / var(--shape-alpha, 85%)) 55%,
    oklch(78% 0.14 var(--shape-hue) / 60%) 100%
  );
  mix-blend-mode: multiply;
  filter: blur(var(--shape-blur, 40px));
  animation: sakura-cover-float var(--shape-duration, 6s) ease-in-out infinite;
  animation-play-state: paused;
}

.sakura-post-cover:hover .sakura-post-cover-shape {
  animation-play-state: running;
}

@keyframes sakura-cover-float {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(var(--shape-rot, 0deg)) scale(1);
  }

  50% {
    transform: translate3d(var(--shape-dx, 8%), var(--shape-dy, -6%), 0)
      rotate(calc(var(--shape-rot, 0deg) + var(--shape-spin, 10deg))) scale(var(--shape-scale, 1.08));
  }
}

.sakura-post-cover-frost {
  position: absolute;
  inset: 0;
  background: oklch(100% 0 0 / 16%);
  backdrop-filter: blur(24px) saturate(1.1);
}

.sakura-post-cover-initial {
  position: absolute;
  right: 7%;
  bottom: -14%;
  z-index: 2;
  font-size: 46cqh;
  font-weight: 800;
  line-height: 1;
  color: oklch(22% 0.03 var(--sakura-cover-hue) / 14%);
  letter-spacing: -0.04em;
  user-select: none;
  transition:
    transform 0.7s cubic-bezier(0.55, 0, 0.1, 1),
    color 0.7s ease;
}

.sakura-post-cover:hover .sakura-post-cover-initial {
  transform: translate(-4%, -6%) scale(1.06);
  color: oklch(22% 0.03 var(--sakura-cover-hue) / 22%);
}
</style>
