<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import * as d3 from 'd3'
import type { Post } from 'valaxy'
import type { D3DragEvent, D3ZoomEvent, Selection, Simulation, SimulationLinkDatum, SimulationNodeDatum } from 'd3'
import { useFrontmatter, usePostList, usePostTitle } from 'valaxy'
import { useRouter } from 'vue-router'

const props = withDefaults(defineProps<{
  type?: string
  posts?: Post[]
  width?: number
  height?: number
  nodeWeight?: number
  scale?: number
  hideScaleThreshold?: number
  selectNodeColor?: string
}>(), {
  width: 1812,
  height: 1738,
  nodeWeight: 5,
  scale: 1.8,
  hideScaleThreshold: 1,
  selectNodeColor: 'red',
})

const chartContainer = ref()
const frontmatter = useFrontmatter()
const title = usePostTitle(frontmatter)

const router = useRouter()
const routes = usePostList({ type: props.type || '' })
const posts = computed(() => props.posts || routes.value)

router.afterEach(() => onRouteChange())

const color = d3.scaleOrdinal(d3.schemeCategory10)
let simulation: Simulation<SimulationNodeDatum, SimulationLinkDatum<SimulationNodeDatum>>
let allNodes: Array<SimulationNodeDatum | any> = []
let svg: Selection<SVGSVGElement, unknown, null, undefined>
let zoom: any

function createChart() {
  const width = props.width
  const height = props.height

  const links = posts.value.flatMap<SimulationLinkDatum<SimulationNodeDatum | any>>((d) => {
    // categories
    let categoryLinks: any[] = []
    if (Array.isArray(d.categories)) {
      categoryLinks = [{
        source: d.path,
        target: d.categories[d.categories.length - 1],
        value: 1,
      }]

      for (let i = 0; i < d.categories.length - 1; i++) {
        categoryLinks.push({
          source: d.categories[i],
          target: d.categories[i + 1],
          value: 1,
        })
      }
    }
    else if (typeof d.categories === 'string') {
      categoryLinks = [{
        source: d.path,
        target: d.categories,
        value: 1,
      }]
    }

    // tags
    let tagLinks: any[] = []
    if (d.tags) {
      tagLinks = d.tags.map(tag => ({
        source: d.path,
        target: tag,
        value: 1,
      }))
    }

    return [...categoryLinks, ...tagLinks]
  })

  const nodes = posts.value.map<SimulationNodeDatum | any>(d => ({
    id: d.path,
    group: d.categories,
    title: d.title,
    path: d.path,
  }))

  const categoryCount = posts.value.reduce((acc, d) => {
    const categories = Array.isArray(d.categories) ? d.categories : [d.categories]
    categories.forEach((category) => {
      if (category)
        acc[category] = (acc[category] || props.nodeWeight) + 1
    })
    return acc
  }, {} as Record<string, number>)

  const categoryNodes = [...new Set(posts.value.flatMap(d => Array.isArray(d.categories) ? d.categories : [d.categories]))]
    .map(category => ({
      id: category,
      group: 'category',
      title: category,
      path: `/categories?category=${category}`,
      weight: categoryCount[category!],
    }))

  const tagNodes = [...new Set(posts.value.flatMap(d => d.tags))]
    .map(tag => ({
      id: tag,
      group: 'tag',
      title: tag,
      path: `/tags/?tag=${tag}`,
      weight: categoryCount[tag!],
    }))

  allNodes = [...nodes, ...categoryNodes, ...tagNodes]

  simulation = d3.forceSimulation(allNodes)
    .force('link', d3.forceLink(links).id((d: any) => d.id))
    .force('charge', d3.forceManyBody().strength(-50)) // 排斥力强度
    .force('collide', d3.forceCollide().radius((d: any) => d.weight ? d.weight * 2.5 : 15).iterations(2)) // 增加碰撞力的半径和迭代次数
    .force('x', d3.forceX())
    .force('y', d3.forceY())

  svg = d3.create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('style', 'max-width: 100%; height: auto;') as Selection<SVGSVGElement, unknown, null, undefined>

  zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.1, 10000])
    .on('zoom', zoomed)

  svg.call(zoom)

  const container = svg.append('g')

  const link = container.append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', (d: any) => Math.sqrt(d.value))

  const node = container.append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(allNodes)
    .join('circle')
    .attr('r', (d: any) => d.weight || props.nodeWeight)
    .attr('fill', (d: any) => color(d.group))
    .on('click', (event, d) => {
      router.push(d.path)
    })
    .on('mouseover', (event, d) => {
      link.attr('stroke', l => (l.source.id === d.id || l.target.id === d.id) ? 'blue' : '#999')
    })
    .on('mouseout', () => {
      link.attr('stroke', '#999')
    })

  const labels = container.append('g')
    .selectAll('text')
    .data(allNodes)
    .join('text')
    .attr('text-anchor', 'middle')
    .text((d: any) => d.title)
    .style('font-size', '10px')
    .style('fill', '#555')
    .classed('sakura-graph-label-text', true)

  node.append('title')
    .text((d: any) => d.title)

  node.call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended) as any)

  simulation.on('tick', () => {
    link
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)

    node
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)

    labels
      .attr('x', (d: any) => d.x)
      .attr('y', (d: any) => d.y + (d.weight ? d.weight + 7 : 12))
  })

  function dragstarted(event: D3DragEvent<any, any, any>) {
    if (!event.active)
      simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  function dragged(event: D3DragEvent<any, any, any>) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  function dragended(event: D3DragEvent<any, any, any>) {
    if (!event.active)
      simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }

  function zoomed(event: D3ZoomEvent<SVGSVGElement, unknown>) {
    const scale = event.transform.k
    const translateX = event.transform.x
    const translateY = event.transform.y

    const duration = 1600

    container.transition()
      .duration(duration)
      .ease(d3.easeCircleOut)
      .attrTween('transform', () => {
        const currentTransform = container.attr('transform') || 'translate(0,0) scale(1)'
        const translateMatch = currentTransform.match(/translate\(([^)]+)\)/)
        const currentTranslate = translateMatch ? translateMatch[1].split(',').map(Number) : [0, 0]
        const currentScaleMatch = currentTransform.match(/scale\(([^)]+)\)/)
        const currentScale = currentScaleMatch ? Number.parseFloat(currentScaleMatch[1]) : 1

        const scaleInterpolate = d3.interpolateNumber(currentScale, scale)

        const translateXInterpolate = d3.interpolateNumber(currentTranslate[0], translateX)
        const translateYInterpolate = d3.interpolateNumber(currentTranslate[1], translateY)

        return function (t) {
          const interpolatedScale = scaleInterpolate(t)
          const interpolatedTranslateX = translateXInterpolate(t)
          const interpolatedTranslateY = translateYInterpolate(t)
          return `translate(${interpolatedTranslateX},${interpolatedTranslateY}) scale(${interpolatedScale})`
        }
      })

    if (scale < props.hideScaleThreshold)
      labels.style('display', 'none')
    else
      labels.style('display', 'block')
  }

  // Initial zoom and shift Settings
  const initialScale = props.scale
  const initialTranslate: [number, number] = [props.width / 2, props.height / 2]

  svg.call(
    zoom.transform,
    d3.zoomIdentity.translate(...initialTranslate).scale(initialScale),
  )

  chartContainer.value.appendChild(svg.node())
}

function onRouteChange() {
  const targetNode = allNodes.find(node => node.title === title.value)

  if (targetNode) {
    const { x, y } = targetNode

    // console.log('Target Node:', targetNode)
    // console.log('Current Transform:', d3.zoomTransform(svg.node()))

    const currentTransform = d3.zoomTransform(svg.node()!)
    const scale = currentTransform.k

    const translateX = (props.width / 2 - x * scale)
    const translateY = (props.height / 2 - y * scale)

    // console.log('Translate:', translateX, translateY)

    svg.transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(translateX, translateY).scale(scale),
      )

    svg.selectAll('circle')
      .filter((d: any) => d.id === targetNode.id)
      .attr('fill', props.selectNodeColor)

    svg.selectAll('circle')
      .filter((d: any) => d.id !== targetNode.id)
      .attr('fill', (d: any) => color(d.group))
  }
}

onMounted(() => {
  createChart()

  setTimeout(() => {
    onRouteChange()
  }, 1000)
})
onBeforeUnmount(() => simulation.stop())
</script>

<template>
  <div ref="chartContainer" class="sakura-network-graph" />
</template>

<style lang="scss">
.sakura-graph-label-text {
  pointer-events: none;
}
</style>
