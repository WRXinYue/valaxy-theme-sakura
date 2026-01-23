<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number
let particles: Petal[] = []

// Configuration
const PARTICLE_COUNT = 50
const GRAVITY = 0.8
const WIND_BASE = 0.5

class Petal {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  size: number
  rotationX: number
  rotationY: number
  rotationZ: number
  omegaX: number
  omegaY: number
  omegaZ: number
  oscillationPhase: number
  oscillationSpeed: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight - canvasHeight
    this.z = Math.random() * 0.5 + 0.5

    this.vx = (Math.random() - 0.5) * 1.5
    this.vy = (Math.random() * 1 + 1) * this.z

    // Size variation: Larger base size for detail
    this.size = (Math.random() * 15 + 12) * this.z

    this.rotationX = Math.random() * Math.PI * 2
    this.rotationY = Math.random() * Math.PI * 2
    this.rotationZ = Math.random() * Math.PI * 2

    this.omegaX = Math.random() * 0.02
    this.omegaY = Math.random() * 0.02
    this.omegaZ = Math.random() * 0.02

    this.oscillationPhase = Math.random() * Math.PI * 2
    this.oscillationSpeed = Math.random() * 0.02 + 0.01
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.oscillationPhase += this.oscillationSpeed
    const breeze = Math.sin(this.oscillationPhase) * 0.5

    this.x += this.vx + WIND_BASE + breeze
    this.y += this.vy + GRAVITY

    this.rotationX += this.omegaX
    this.rotationY += this.omegaY
    this.rotationZ += this.omegaZ

    if (this.y > canvasHeight + 50) {
      this.y = -50
      this.x = Math.random() * canvasWidth
    }
    if (this.x > canvasWidth + 50) {
      this.x = -50
    }
    else if (this.x < -50) {
      this.x = canvasWidth + 50
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)

    ctx.rotate(this.rotationZ)
    const scaleX = Math.cos(this.rotationY)
    const scaleY = Math.cos(this.rotationX)
    ctx.scale(scaleX, scaleY)

    // Draw Elegant Sakura Petal
    const w = this.size * 0.7 // Thinner aspect ratio (0.7 width)
    const h = this.size

    ctx.beginPath()
    // Start at bottom tip (0, h)
    ctx.moveTo(0, h)

    // Left Side
    // Curve 1: Bottom to wide side
    ctx.bezierCurveTo(
      -w * 0.7,
      h * 0.7, // cp1
      -w,
      h * 0.4, // cp2
      -w,
      0, // Mid-left (widest point roughly)
    )
    // Curve 2: Wide side to top lobe
    ctx.bezierCurveTo(
      -w,
      -h * 0.6, // cp1
      -w * 0.4,
      -h * 0.9, // cp2
      -w * 0.2,
      -h, // Top left tip
    )

    // Notch (Center top)
    ctx.quadraticCurveTo(
      0,
      -h * 0.6, // Control point (dip down)
      w * 0.2,
      -h, // Top right tip
    )

    // Right Side (Mirror)
    // Curve 3: Top lobe to wide side
    ctx.bezierCurveTo(
      w * 0.4,
      -h * 0.9,
      w,
      -h * 0.6,
      w,
      0,
    )
    // Curve 4: Wide side to bottom
    ctx.bezierCurveTo(
      w,
      h * 0.4,
      w * 0.7,
      h * 0.7,
      0,
      h,
    )

    // Elegant Gradient
    const gradient = ctx.createLinearGradient(-w, -h, w, h)
    // Subtle pinks, slightly translucent
    gradient.addColorStop(0, 'rgba(255, 240, 245, 0.9)') // Lavender Blush
    gradient.addColorStop(0.5, 'rgba(255, 192, 203, 0.8)') // Pink
    gradient.addColorStop(1, 'rgba(255, 182, 193, 0.9)') // Light Pink

    ctx.fillStyle = gradient
    ctx.fill()

    ctx.restore()
  }
}

function initParticles(width: number, height: number) {
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Petal(width, height))
  }
}

function animate() {
  if (!ctx || !canvasRef.value)
    return

  const canvas = canvasRef.value
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((p) => {
    p.update(canvas.width, canvas.height)
    p.draw(ctx!)
  })

  animationFrameId = requestAnimationFrame(animate)
}

function handleResize() {
  if (!canvasRef.value)
    return
  const parent = canvasRef.value.parentElement
  if (parent) {
    canvasRef.value.width = parent.clientWidth
    canvasRef.value.height = parent.clientHeight
  }
}

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    handleResize()
    initParticles(canvasRef.value.width, canvasRef.value.height)
    animate()
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="sakura-fall">
    <canvas ref="canvasRef" />
  </div>
</template>

<style lang="scss" scoped>
.sakura-fall {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
