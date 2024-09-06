// src/components/DataLoader.jsx

import React, { useState, useEffect } from 'react'
import { csv } from 'd3-fetch' // Import d3-fetch for loading CSV

const DataLoader = ({ onDataLoaded }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Load CSV data from a relative path
    csv('/data/WorldBank_Data.csv')
      .then((data) => {
        console.log(data) // Check if data is loaded correctly
        setData(data) // Update state with the loaded data
        onDataLoaded(data) // Pass data to parent or handler
      })
      .catch((error) => {
        console.error('Error loading CSV data:', error)
      })
  }, [onDataLoaded]) // Dependency array: re-run if onDataLoaded changes

  return <p>Loading data...</p>;

  // if (!data) return <p>Loading...</p> // Display loading state

  // return (
  //   <div>
  //     <h2>Data Loaded</h2>
  //     {/* Render or process the data here */}
  //     <pre>{JSON.stringify(data, null, 2)}</pre>
  //   </div>
  // )
}

export default DataLoader
