import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

const D3Chart = ({ data }) => {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr('width', 500).attr('height', 500)
    svg.selectAll('*').remove() // Clear previous content

    // Example: Create a bar chart
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d['Year']))
      .range([0, 500])
      .padding(0.1)

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          data,
          (d) =>
            +d[
              'Unemployment, total (% of total labor force) (modeled ILO estimate)'
            ]
        ),
      ])
      .nice()
      .range([500, 0])

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d['Year']))
      .attr('y', (d) =>
        yScale(
          +d[
            'Unemployment, total (% of total labor force) (modeled ILO estimate)'
          ]
        )
      )
      .attr('width', xScale.bandwidth())
      .attr(
        'height',
        (d) =>
          500 -
          yScale(
            +d[
              'Unemployment, total (% of total labor force) (modeled ILO estimate)'
            ]
          )
      )
      .attr('fill', 'blue')

    // Add x and y axes
    svg
      .append('g')
      .attr('transform', 'translate(0,500)')
      .call(d3.axisBottom(xScale))

    svg.append('g').call(d3.axisLeft(yScale))
  }, [data])

  return <svg ref={svgRef} />
}

export default D3Chart
