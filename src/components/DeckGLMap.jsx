import React, { useRef, useEffect } from 'react'
import DeckGL from '@deck.gl/react'
import { MapView } from '@deck.gl/core'
import { ScatterplotLayer } from '@deck.gl/layers'
import * as THREE from 'three'

const DeckGLMap = ({ data }) => {
  // Accept data as a prop
  const deckRef = useRef(null)

  useEffect(() => {
    // Initialize THREE.js scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // Create a basic 3D globe
    const geometry = new THREE.SphereGeometry(5, 32, 32)
    const material = new THREE.MeshBasicMaterial({
      color: 0x0077ff,
      wireframe: true,
    })
    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)
    camera.position.z = 10

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      globe.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    animate()

    // Cleanup function
    return () => {
      document.body.removeChild(renderer.domElement)
    }
  }, [])

  // Define DeckGL layers with the loaded data
  const deckGlLayers = [
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: data
        ? data.map((d) => ({
            position: [parseFloat(d['Longitude']), parseFloat(d['Latitude'])], // Ensure these fields exist
            size: 100,
            color: [255, 0, 0],
          }))
        : [], // Default to empty array if no data
      getPosition: (d) => d.position,
      getFillColor: (d) => d.color,
      getRadius: (d) => d.size,
    }),
  ]

  return (
    <DeckGL
      ref={deckRef}
      views={[new MapView({ controller: true })]}
      layers={deckGlLayers}
      initialViewState={{
        longitude: -122.41669,
        latitude: 37.7853,
        zoom: 11,
        pitch: 30,
        bearing: 0,
      }}
      style={{ position: 'absolute', width: '100%', height: '100%' }} // Ensure it takes full screen
    />
  )
}

export default DeckGLMap
