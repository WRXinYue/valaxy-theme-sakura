<script setup lang="ts">
import * as d3 from 'd3'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { SimulationNodeDatum } from 'd3'
import data from './data.json'

const chartContainer = ref()

const width = 928
const height = 680
const color = d3.scaleOrdinal(d3.schemeCategory10)

function createChart() {
  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const links = data.links.map(d => ({ ...d }))
  const nodes = data.nodes.map(d => ({ ...d }))

  // Create a simulation with several forces.
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id((d: any) => d.id))
    .force('charge', d3.forceManyBody())
    .force('x', d3.forceX())
    .force('y', d3.forceY())

  // Create the SVG container.
  const svg = d3.create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .attr('style', 'max-width: 100%; height: auto;') as any

  const zoom = d3.zoom()
    .scaleExtent([0.1, 10])
    .on('zoom', zoomed)

  svg.call(zoom)

  const container = svg.append('g')

  // Add a line for each link, and a circle for each node.
  const link = svg.append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', d => Math.sqrt(d.value))

  const node = svg.append('g')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 5)
    .attr('fill', d => color(d.group))

  node.append('title')
    .text(d => d.id)

  // Add a drag behavior.
  node.call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended))

  // Set the position attributes of links and nodes each time the simulation ticks.
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)

    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  })
  // Reheat the simulation when drag starts, and fix the subject position.
  function dragstarted(event) {
    if (!event.active)
      simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  // Update the subject (dragged node) position during drag.
  function dragged(event) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  // Restore the target alpha so the simulation cools after dragging ends.
  // Unfix the subject position now that it’s no longer being dragged.
  function dragended(event) {
    if (!event.active)
      simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }

  function zoomed(event) {
    container.attr('transform', event.transform)
  }

  chartContainer.value.appendChild(svg.node())
}

onMounted(() => {
  createChart()
})

onBeforeUnmount(() => {
  simulation.stop()
})
</script>

<template>
  <div ref="chartContainer" />
</template>
