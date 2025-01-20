<script lang="ts" setup>
import { useCssVar } from '@vueuse/core'
import { useAppStore } from 'valaxy'
import { onMounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  color?: string
}>(), { })

const appStore = useAppStore()

let renderer: Renderer

watch(() => appStore.isDark, async () => {
  setTimeout(() => {
    renderer.setFishColor(useCssVar('--va-c-bg').value!)
  }, 0)
})

class Renderer {
  public readonly POINT_INTERVAL: number = 5 // 水面点之间的默认间隔
  public readonly FISH_COUNT: number = 3 // 默认鱼的数量
  public readonly MAX_INTERVAL_COUNT: number = 50 // 控制新鱼出现的时间间隔
  public readonly INIT_HEIGHT_RATE: number = 0.5 // 初始水面高度比例
  public readonly THRESHOLD: number = 50 // 用于某些计算的阈值
  public readonly WATCH_INTERVAL: number = 100 // 监控窗口尺寸变化的检测间隔时间

  public fishColor: string = '' // 鱼的颜色
  public window!: Window
  public container!: HTMLElement
  public canvas!: HTMLCanvasElement
  public context!: CanvasRenderingContext2D
  public points: SurfacePoint[] = [] // 水面点集合
  public fishes: Fish[] = [] // 鱼对象集合
  public watchIds: number[] = [] // 用于存储窗口尺寸变化监视器的 ID
  public width!: number
  public height!: number
  public fishCount!: number
  public intervalCount!: number
  public reverse!: boolean // 控制水面波动方向的标志
  public tempWidth!: number
  public tempHeight!: number
  public axis!: { x: number, y: number } // 鼠标在容器内的坐标
  public pointInterval!: number // 实际水面点之间的间隔

  constructor(private props: { color?: string }) { }

  init(): void {
    this.setFishColor(this.props.color)
    this.setParameters()
    this.reconstructMethods()
    this.setup()
    this.bindEvent()
    this.render()
  }

  setFishColor(color?: string): void {
    color ? this.fishColor = color : this.fishColor = useCssVar('--sakura-color-background').value!
  }

  setParameters(): void {
    this.window = window
    this.container = document.getElementById('j-fish-skip')!
    this.canvas = document.createElement('canvas')
    this.context = this.canvas.getContext('2d')!
    this.container.appendChild(this.canvas)
    this.points = []
    this.fishes = []
    this.watchIds = []
  }

  /** 创建水面上的点 */
  createSurfacePoints(): void {
    const totalPoints = Math.round(this.width / this.POINT_INTERVAL)

    this.pointInterval = this.width / (totalPoints - 1)
    this.points.push(new SurfacePoint(this, 0))
    for (let i = 1; i < totalPoints; i++) {
      const newPoint = new SurfacePoint(this, i * this.pointInterval)
      const previousPoint = this.points[i - 1]

      newPoint.setPreviousPoint(previousPoint)
      previousPoint.setNextPoint(newPoint)

      this.points.push(newPoint)
    }
  }

  reconstructMethods(): void {
    this.watchWindowSize = this.watchWindowSize.bind(this)
    this.jdugeToStopResize = this.jdugeToStopResize.bind(this)
    this.startEpicenter = this.startEpicenter.bind(this)
    this.moveEpicenter = this.moveEpicenter.bind(this)
    this.reverseVertical = this.reverseVertical.bind(this)
    this.render = this.render.bind(this)
  }

  /** 准备画布和初始化渲染环境 */
  setup(): void {
    this.points.length = 0
    this.fishes.length = 0
    this.watchIds.length = 0
    this.intervalCount = this.MAX_INTERVAL_COUNT
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.fishCount = this.FISH_COUNT * this.width / 500 * this.height / 500
    this.canvas.setAttribute('width', this.width.toString())
    this.canvas.setAttribute('height', this.height.toString())
    this.reverse = !1
    this.fishes.push(new Fish(this))
    this.createSurfacePoints()
  }

  /** 监控窗口尺寸变化 */
  watchWindowSize(): void {
    this.clearTimer()
    this.tempWidth = window.innerWidth
    this.tempHeight = window.innerHeight

    this.watchIds.push(setTimeout(this.jdugeToStopResize, this.WATCH_INTERVAL) as unknown as number)
  }

  clearTimer(): void {
    for (; this.watchIds.length > 0;) clearTimeout(this.watchIds.pop())
  }

  /** 判断窗口尺寸变化是否停止 */
  jdugeToStopResize(): void {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const isWindowSizeChanged = windowWidth === this.tempWidth && windowHeight === this.tempHeight
    this.tempWidth = windowWidth
    this.tempHeight = windowHeight
    isWindowSizeChanged && this.setup()
  }

  bindEvent(): void {
    window.addEventListener('resize', this.watchWindowSize.bind(this))
    this.container.addEventListener('mouseenter', this.startEpicenter.bind(this))
    this.container.addEventListener('mousemove', this.moveEpicenter.bind(this))
  }

  /** 获取鼠标在容器内的坐标 */
  getAxis(event: MouseEvent): { x: number, y: number } {
    const rect = this.container.getBoundingClientRect()
    return {
      x: event.clientX - rect.left + window.scrollX,
      y: event.clientY - rect.top + window.scrollY,
    }
  }

  /** 当鼠标进入容器时开始模拟水面波动的中心点 */
  startEpicenter(event: MouseEvent): void {
    this.axis = this.getAxis(event)
  }

  /** 鼠标在容器内移动时，更新波动中心点并产生波动效果 */
  moveEpicenter(event: MouseEvent): void {
    const newAxis = this.getAxis(event)
    this.axis || (this.axis = newAxis)
    this.generateEpicenter(newAxis.x, newAxis.y, newAxis.y - this.axis.y)
    this.axis = newAxis
  }

  /**
   * 根据鼠标位置生成水面波动的中心点，影响相应的水面点
   *
   * @param xCoord {number} - 水面波动中心点的横坐标。通常是鼠标点击或触摸事件的X轴坐标
   * @param yCoord {number} - 水面波动中心点的纵坐标。通常是鼠标点击或触摸事件的Y轴坐标
   * @param deltaY {number} - 在Y轴方向上的变化量。可以是鼠标滚轮的移动距离或触摸事件中手指的移动距离，用于调整水面波动的幅度或速度
   */
  generateEpicenter(xCoord: number, yCoord: number, deltaY: number): void {
    if (!(yCoord < this.height / 2 - this.THRESHOLD || yCoord > this.height / 2 + this.THRESHOLD)) {
      const pointIndex = Math.round(xCoord / this.pointInterval)
      pointIndex < 0 || pointIndex >= this.points.length || this.points[pointIndex].interfere(yCoord, deltaY)
    }
  }

  /** 控制水面波动的方向 */
  reverseVertical(): void {
    this.reverse = !this.reverse
    for (let t = 0, i = this.fishes.length; t < i; t++) this.fishes[t].reverseVertical()
  }

  /** 更新水面点和鱼的状态，控制新鱼的生成 */
  controlStatus(): void {
    for (let t = 0, i = this.points.length; t < i; t++) this.points[t].updateSelf()
    for (let t = 0, i = this.points.length; t < i; t++) this.points[t].updateNeighbors()
    if (this.fishes.length < this.fishCount && --this.intervalCount === 0) {
      this.intervalCount = this.MAX_INTERVAL_COUNT
      this.fishes.push(new Fish(this))
    }
  }

  render(): void {
    requestAnimationFrame(() => this.render())
    this.controlStatus()
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.fillStyle = this.fishColor
    for (let t = 0, i = this.fishes.length; t < i; t++) this.fishes[t].render(this.context)
    this.context.save()
    this.context.globalCompositeOperation = 'xor'
    this.context.beginPath()
    this.context.moveTo(0, this.reverse ? 0 : this.height)
    for (let t = 0, i = this.points.length; t < i; t++) this.points[t].render(this.context)
    this.context.lineTo(this.width, this.reverse ? 0 : this.height)
    this.context.closePath()
    this.context.fill()
    this.context.restore()
  }
}

class SurfacePoint {
  private readonly SPRING_CONSTANT = 0.03 // 弹簧常数
  private readonly SPRING_FRICTION = 0.9 // 摩擦力
  private readonly WAVE_SPREAD = 0.3 // 波传播比例
  private readonly ACCELARATION_RATE = 0.01 // 加速率

  private renderer: Renderer
  private x: number
  private initHeight!: number // 初始高度
  private height!: number // 当前高度
  private fy!: number // y方向上的力
  private force!: { previous: number, next: number } // 邻近点的作用力
  private previous!: SurfacePoint // 前一个水面点引用
  private next!: SurfacePoint // 后一个水面点引用

  constructor(renderer: Renderer, x: number) {
    this.renderer = renderer
    this.x = x
    this.init()
  }

  // 初始高度和力
  private init() {
    this.initHeight = this.renderer.height * this.renderer.INIT_HEIGHT_RATE
    this.height = this.initHeight
    this.fy = 0
    this.force = {
      previous: 0,
      next: 0,
    }
  }

  /** 设置前一个水面点 */
  setPreviousPoint(point: SurfacePoint) {
    this.previous = point
  }

  /** 设置后一个水面点 */
  setNextPoint(point: SurfacePoint) {
    this.next = point
  }

  /** 干扰方法，用于产生波动效果 */
  interfere(t: number, i: number) {
    // 根据传入的值计算y方向上的力
    this.fy = this.renderer.height * this.ACCELARATION_RATE * (this.renderer.height - this.height - t >= 0 ? -1 : 1) * Math.abs(i)
  }

  /** 更新自身状态 */
  updateSelf() {
    // 使用弹簧物理模型更新高度和力
    this.fy += this.SPRING_CONSTANT * (this.initHeight - this.height)
    this.fy *= this.SPRING_FRICTION
    this.height += this.fy
  }

  /** 更新邻居节点 */
  updateNeighbors() {
    // 根据波的传播计算邻居点的作用力
    if (this.previous)
      this.force.previous = this.WAVE_SPREAD * (this.height - this.previous.height)

    if (this.next)
      this.force.next = this.WAVE_SPREAD * (this.height - this.next.height)
  }

  /** 渲染方法，绘制水面点 */
  render(ctx: CanvasRenderingContext2D) {
    // 更新邻居节点的高度和力，并在画布上绘制水面点
    if (this.previous) {
      this.previous.height += this.force.previous
      this.previous.fy += this.force.previous
    }
    if (this.next) {
      this.next.height += this.force.next
      this.next.fy += this.force.next
    }
    ctx.lineTo(this.x, this.renderer.height - this.height)
  }
}

class Fish {
  private readonly GRAVITY = 0.4 // 重力

  // 鱼的属性，包括方向、位置、速度、加速度等
  public direction!: boolean // 游动方向，true为向左，false为向右
  public x!: number // x坐标
  public y!: number // y坐标
  public previousY!: number // 上一个y坐标，用于计算运动
  public vx!: number // x方向上的速度
  public vy!: number // y方向上的速度
  public ay!: number // y方向上的加速度
  public isOut!: boolean // 判断鱼是否跳出水面
  public theta!: number // 控制鱼尾摆动的角度
  public phi!: number // 控制鱼鳍摆动的角度
  public renderer: Renderer // Renderer实例的引用

  constructor(renderer: Renderer) {
    this.renderer = renderer
    this.init()
  }

  // 随机设置鱼的初始状态
  private init(): void {
    this.direction = Math.random() < 0.5
    this.x = this.direction ? this.renderer.width + this.renderer.THRESHOLD : -this.renderer.THRESHOLD
    this.previousY = this.y
    this.vx = this.getRandomValue(4, 10) * (this.direction ? -1 : 1)
    // 根据renderer的reverse属性设置鱼的初始y坐标、速度和加速度
    if (this.renderer.reverse) {
      this.y = this.getRandomValue(1 * this.renderer.height / 10, 4 * this.renderer.height / 10)
      this.vy = this.getRandomValue(2, 5)
      this.ay = this.getRandomValue(0.05, 0.2)
    }
    else {
      this.y = this.getRandomValue(6 * this.renderer.height / 10, 9 * this.renderer.height / 10)
      this.vy = this.getRandomValue(-5, -2)
      this.ay = this.getRandomValue(-0.2, -0.05)
    }
    this.isOut = false
    this.theta = 0
    this.phi = 0
  }

  getRandomValue(min: number, max: number): number {
    return min + (max - min) * Math.random()
  }

  /** 翻转鱼的垂直运动方向 */
  reverseVertical(): void {
    this.isOut = !this.isOut
    this.ay *= -1
  }

  /** 控制鱼的状态，包括位置、速度和加速度的更新 */
  controlStatus(): void {
    this.previousY = this.y
    this.x += this.vx
    this.y += this.vy
    this.vy += this.ay
    // 根据鱼的位置和renderer的reverse属性调整运动状态
    if (this.renderer.reverse) {
      // 当鱼跳出水面时，增加重力影响
      if (this.y > this.renderer.height * this.renderer.INIT_HEIGHT_RATE) {
        this.vy -= this.GRAVITY
        this.isOut = true
      }
      else {
        if (this.isOut)
          this.ay = this.getRandomValue(0.05, 0.2)

        this.isOut = false
      }
    }
    else {
      // 同上，针对不同的方向
      if (this.y < this.renderer.height * this.renderer.INIT_HEIGHT_RATE) {
        this.vy += this.GRAVITY
        this.isOut = true
      }
      else {
        if (this.isOut)
          this.ay = this.getRandomValue(-0.2, -0.05)

        this.isOut = false
      }
    }
    // 控制鱼尾和鱼鳍的摆动
    if (!this.isOut) {
      this.theta += Math.PI / 20
      this.theta %= 2 * Math.PI
      this.phi += Math.PI / 30
      this.phi %= 2 * Math.PI
    }
    // 在水面生成波纹中心
    this.renderer.generateEpicenter(this.x + (this.direction ? -1 : 1) * this.renderer.THRESHOLD, this.y, this.y - this.previousY)
    // 如果鱼游出画布范围，则重新初始化
    if ((this.vx > 0 && this.x > this.renderer.width + this.renderer.THRESHOLD) || (this.vx < 0 && this.x < -this.renderer.THRESHOLD))
      this.init()
  }

  // 绘制鱼的形态
  render(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(Math.PI + Math.atan2(this.vy, this.vx))
    ctx.scale(1, this.direction ? 1 : -1)
    ctx.beginPath()
    // 绘制鱼身体
    ctx.moveTo(-30, 0)
    ctx.bezierCurveTo(-20, 15, 15, 10, 40, 0)
    ctx.bezierCurveTo(15, -10, -20, -15, -30, 0)
    ctx.fill()
    // 绘制鱼尾
    ctx.save()
    ctx.translate(40, 0)
    ctx.scale(0.9 + 0.2 * Math.sin(this.theta), 1)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.quadraticCurveTo(5, 10, 20, 8)
    ctx.quadraticCurveTo(12, 5, 10, 0)
    ctx.quadraticCurveTo(12, -5, 20, -8)
    ctx.quadraticCurveTo(5, -10, 0, 0)
    ctx.fill()
    ctx.restore()
    // 绘制鱼鳍
    ctx.save()
    ctx.translate(-3, 0)
    ctx.rotate((Math.PI / 3 + Math.PI / 10 * Math.sin(this.phi)) * (this.renderer.reverse ? -1 : 1))
    ctx.beginPath()
    if (this.renderer.reverse) {
      ctx.moveTo(5, 0)
      ctx.bezierCurveTo(10, 10, 10, 30, 0, 40)
      ctx.bezierCurveTo(-12, 25, -8, 10, 0, 0)
    }
    else {
      ctx.moveTo(-5, 0)
      ctx.bezierCurveTo(-10, -10, -10, -30, 0, -40)
      ctx.bezierCurveTo(12, -25, 8, -10, 0, 0)
    }
    ctx.closePath()
    ctx.fill()
    ctx.restore()
    ctx.restore()
    this.controlStatus()
  }
}

onMounted(() => {
  renderer = new Renderer(props)
  renderer.init()
})
</script>

<template>
  <div id="j-fish-skip" class="absolute bottom--50px h-180px w-full" />
</template>
