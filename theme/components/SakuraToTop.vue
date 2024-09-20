<script setup lang="ts">
// import { isClient, useWindowScroll } from '@vueuse/core'
import { onMounted } from 'vue'
import LazyLoad from 'vanilla-lazyload'
import interact from 'interactjs'
// import { useThemeConfig } from '../composables'
// import { scrollToTop } from '../utils/scrollDamping'
// import scrollImage from '../assets/scroll.png'

// const themeConfig = useThemeConfig()
// const { y } = useWindowScroll()
// const hide = 'top: -900px'
// const style = ref(hide)
// const isVisible = ref(false)

// function onScroll() {
//   if (y.value > 200) {
//     if (window.innerWidth > 720) {
//       isVisible.value = false
//       style.value = `top: ${Math.min(window.innerHeight - 968, 0)}px`
//     }

//     else {
//       isVisible.value = true
//       style.value = `top: -640px`
//     }
//   }
//   else {
//     style.value = hide
//   }
// }
// function toTop() {
//   if (isClient)
//     return

//   if (!themeConfig.value.scrollDamping)
//     window.scrollTo({ top: 0 })
//   else
//     scrollToTop()
// }

let mouseX: number, mouseY: number
const nodes: Node[] = []
const constraints: Constraint[] = []
let drag: Node | null = null
let touched: boolean = false

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

    if (!fixed) {
      this.el = document.createElement('img') as HTMLImageElement
      (this.el as HTMLImageElement).src = 'https://common.s3.bitiful.net/scroll.png'
    }
    else {
      this.el = document.createElement('div')
    }
    this.el.className = 'node';
    (this.el as any).nodeRef = this
    document.body.appendChild(this.el)

    interact(this.el)
      .draggable({})
      .on('dragstart', (event: any) => {
        drag = event.target.nodeRef
        touched = true
      })
      .on('dragmove', (event: any) => {
        if (touched) {
          mouseX = event.clientX
          mouseY = event.clientY
        }
      })
      .on('dragend', () => {
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
    this.el = document.createElement('img')
    this.el.src = 'https://common.s3.bitiful.net/scroll-line.png'
    this.el.className = 'line'
    document.body.appendChild(this.el)
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

  // TODO:
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

function setup() {
  const n1 = new Node(window.innerWidth * 0.5, -100, true)
  const n2 = new Node(window.innerWidth * 0.5 + 400, -100, false, 2)
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
    // drag.x += (mouseX - drag.x - dx) * 0.6;
    // drag.y += (mouseY - drag.y - dy) * 0.6;
    drag.x += (mouseX - drag.x) * 0.6
    drag.y += (mouseY - drag.y) * 0.6
  }

  for (const c of constraints) {
    c.solve()
    c.updateElement()
  }

  requestAnimationFrame(update)
}

window.addEventListener('resize', () => {
  for (const c of constraints) {
    c.updateElement()
  }
})

onMounted(() => {
  // window.addEventListener('scroll', onScroll)
  setup()
  // eslint-disable-next-line no-new
  new LazyLoad({ })
})

// onUnmounted(() => {
//   window.removeEventListener('scroll', onScroll)
// })
</script>

<template>
  <!-- <a href="#" class="lazy to-top z-1" :data-bg="scrollImage" :shadow="isVisible" :style="style" aria-label="to-top" @click="toTop" /> -->
  <div />
</template>

<style lang="scss">
.to-top {
  position: fixed;
  width: 70px;
  height: 900px;
  right: 25px;
  transition: top 0.5s ease-in-out;
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

.node {
  position: fixed;
  transform-origin: center;
  /* stylelint-disable-next-line comment-empty-line-before */
  /* https://github.com/taye/interact.js/issues/595 */
  touch-action: none;
  width: 70px;
  z-index: 100;
}

.line {
  position: fixed;
  width: 70px;
  transform-origin: top center;
}
</style>
