<script setup lang="ts">
import * as d3 from 'd3'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { D3DragEvent, D3ZoomEvent, Selection, Simulation, SimulationLinkDatum, SimulationNodeDatum } from 'd3'
import data from './data.json'

const chartContainer = ref()

const width = 928
const height = 680
const color = d3.scaleOrdinal(d3.schemeCategory10)
let simulation: Simulation<SimulationNodeDatum, SimulationLinkDatum<SimulationNodeDatum>>

function createChart() {
  const links = data.links.map(d => ({ ...d }))
  const nodes = data.nodes.map(d => ({ ...d })) as SimulationNodeDatum[]

  simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id((d: any) => d.id))
    .force('charge', d3.forceManyBody())
    .force('x', d3.forceX())
    .force('y', d3.forceY())

  const svg = d3.create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .attr('style', 'max-width: 100%; height: auto;') as Selection<SVGSVGElement, unknown, null, undefined>

  const zoom = d3.zoom<SVGSVGElement, unknown>()
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
    .data(nodes)
    .join('circle')
    .attr('r', 5)
    .attr('fill', (d: any) => color(d.group))

  node.append('title')
    .text((d: any) => d.id)

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
    container.attr('transform', event.transform.toString())
  }

  chartContainer.value.appendChild(svg.node())
}

onMounted(() => createChart())
onBeforeUnmount(() => simulation.stop())
</script>

<template>
  <div ref="chartContainer" />
</template>
