<script setup lang="ts">
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'
import interact from 'interactjs'
import { useScroll } from '../composables'

const props = withDefaults(defineProps<{
  height?: number
  position?: number
  mass?: number
  gravity?: number
  friction?: number
}>(), {
  position: 0.9,
  height: 600,
  mass: 2,
})

const { y } = useWindowScroll()
const { width } = useWindowSize()
const { toTop: scrollToTop } = useScroll()

let mouseX: number, mouseY: number
const nodes: Node[] = []
const constraints: Constraint[] = []
let drag: Node | null = null
let touched: boolean = false

const imgRef = ref()
const nodeRef = ref()
const constraintRef = ref()

const isVisible = ref(false)

class Node {
  x: number
  y: number
  oldX: number
  oldY: number
  fixed: boolean
  mass: number
  gravity: number
  friction: number
  el: HTMLElement

  constructor(x: number, y: number, fixed = false, mass = 1, gravity = 15, friction = 0.9) {
    this.x = x
    this.y = y
    this.oldX = x
    this.oldY = y
    this.fixed = fixed
    this.mass = mass
    this.gravity = gravity
    this.friction = friction
    this.el = !fixed ? imgRef.value : nodeRef.value

    if (isVisible.value)
      imgRef.value.classList.add('float')

    interact(this.el)
      .draggable({})
      .on('dragstart', (event: any) => {
        drag = this!
        touched = true
        event.target.classList.remove('float')
      })
      .on('dragmove', (event: any) => {
        if (touched) {
          mouseX = event.clientX
          mouseY = event.clientY
        }
      })
      .on('dragend', () => {
        if (drag && isVisible.value) {
          scrollToTop()
          drag.el.classList.add('float')
        }
        drag = null
        touched = false
      })
  }

  update() {
    if (!this.fixed) {
      const tempX = this.x
      const tempY = this.y

      this.x += (this.x - this.oldX) * this.friction
      this.y += (this.y - this.oldY) * this.friction + this.gravity
      this.oldX = tempX
      this.oldY = tempY
    }
    this.updateElement()
  }

  updateElement() {
    this.el.style.left = `${this.x}px`
    this.el.style.top = `${this.y - 20}px`
  }

  reset() {
    this.x = 0
    this.y = 0
  }
}

class Constraint {
  n1: Node
  n2: Node
  dist: number
  el: HTMLImageElement

  constructor(n1: Node, n2: Node) {
    this.n1 = n1
    this.n2 = n2
    const dx = n1.x - n2.x
    const dy = n1.y - n2.y
    this.dist = Math.sqrt(dx * dx + dy * dy)
    this.el = constraintRef.value
  }

  solve() {
    let dx = this.n1.x - this.n2.x
    let dy = this.n1.y - this.n2.y
    const currentDist = Math.sqrt(dx * dx + dy * dy)
    const delta = 0.5 * (currentDist - this.dist) / this.dist
    dx *= delta
    dy *= delta

    const m = this.n1.mass + this.n2.mass
    const m1 = this.n1.mass / m
    const m2 = this.n2.mass / m

    if (!this.n1.fixed) {
      this.n1.x -= dx * m2
      this.n1.y -= dy * m2
    }
    if (!this.n2.fixed) {
      this.n2.x += dx * m1
      this.n2.y += dy * m1
    }

    this.updateElement()
  }

  updateElement() {
    const x1 = this.n1.x
    const y1 = this.n1.y
    const x2 = this.n2.x
    const y2 = this.n2.y
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    const angle = Math.atan2(-(x2 - x1), y2 - y1) * 180 / Math.PI
    this.el.style.height = `${length}px`
    this.el.style.left = `${x1}px`
    this.el.style.top = `${y1}px`
    this.el.style.transform = `rotate(${angle}deg)`
  }
}

function init() {
  const { height, position, mass, gravity, friction } = props
  const n1 = new Node(width.value * position, -100, true)
  const n2 = new Node(width.value * position + height, -100, false, mass, gravity, friction)
  const c1 = new Constraint(n1, n2)

  nodes.push(n1)
  nodes.push(n2)
  constraints.push(c1)

  requestAnimationFrame(update)
}

function update() {
  for (const node of nodes) {
    node.update()
  }

  if (drag) {
    drag.x += (mouseX - drag.x) * 0.6
    drag.y += (mouseY - drag.y) * 0.6
  }

  for (const c of constraints) {
    c.solve()
    c.updateElement()
  }

  requestAnimationFrame(update)
}

function updateElements() {
  for (const c of constraints) {
    c.updateElement()
  }
}

watch([y, width], ([newY, newWidth]) => {
  if (newY > 200) {
    if (newWidth <= 720) {
      isVisible.value = false
    }
    else {
      if (isVisible.value === true)
        return

      nodes[1]?.reset()
      isVisible.value = true
    }
  }
  else {
    isVisible.value = false
  }
}, { immediate: true })

let debounceTimer: ReturnType<typeof setTimeout>

watch(width, (width) => {
  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    nodes[0].x = width * 0.85
    nodes[1]?.reset()
    updateElements()
  }, 200)
})
onMounted(() => setTimeout(() => init(), 0))
</script>

<template>
  <div v-show="isVisible">
    <div ref="nodeRef" />
    <img ref="imgRef" class="sakura-to-top-node" src="https://common.s3.bitiful.net/scroll.png">
    <img ref="constraintRef" class="sakura-to-top-line" src="https://common.s3.bitiful.net/scroll-line.png">
  </div>
</template>

<style lang="scss">
.sakura-to-top {
  &-node,
  &-line {
    position: fixed;
    width: 70px;
  }

  &-node {
    z-index: 4;
    transform-origin: center;
    /* stylelint-disable-next-line comment-empty-line-before */
    /* https://github.com/taye/interact.js/issues/595 */
    touch-action: none;
  }

  &-line {
    z-index: 3;
    transform-origin: top center;
  }
}

.float {
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
