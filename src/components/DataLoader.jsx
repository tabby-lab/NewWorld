// src/components/DataLoader.jsx
import React, { useState, useEffect } from 'react'
import { csv } from 'd3-fetch'

const DataLoader = ({ onDataLoaded }) => {
  useEffect(() => {
    csv('/path/to/your/data.csv')
      .then((data) => {
        onDataLoaded(data)
      })
      .catch((error) => {
        console.error('Error loading CSV data:', error)
      })
  }, [onDataLoaded])

  return null
}

export default DataLoader
