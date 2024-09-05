// src/components/D3Chart.jsx

import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

const D3Chart = () => {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr('width', 500).attr('height', 500)

    // Sample D3.js code to draw a circle
    svg
      .append('circle')
      .attr('cx', 250)
      .attr('cy', 250)
      .attr('r', 50)
      .style('fill', 'blue')
  }, [])

  return <svg ref={svgRef} />
}

export default D3Chart
