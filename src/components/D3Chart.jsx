// src/components/D3Chart.jsx
import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

const D3Chart = ({ data }) => {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!data) return

    const svg = d3.select(svgRef.current).attr('width', 500).attr('height', 500)

    const width = +svg.attr('width')
    const height = +svg.attr('height')
    const margin = { top: 20, right: 30, bottom: 40, left: 40 }
    const x = d3
      .scaleBand()
      .range([margin.left, width - margin.right])
      .padding(0.1)
    const y = d3.scaleLinear().range([height - margin.bottom, margin.top])

    x.domain(data.map((d) => d.category)) // Assuming 'category' is a column in your data
    y.domain([0, d3.max(data, (d) => d.value)]) // Assuming 'value' is a column in your data

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.category))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - margin.bottom - y(d.value))

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
  }, [data])

  return <svg ref={svgRef} />
}

export default D3Chart
