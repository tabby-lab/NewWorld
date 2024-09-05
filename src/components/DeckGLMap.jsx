// src/components/DeckGLMap.jsx

import React, { useRef, useEffect } from 'react'
import DeckGL from '@deck.gl/react'
import { MapView} from '@deck.gl/core'
import { ScatterplotLayer } from '@deck.gl/layers'
import * as THREE from 'three'

const DeckGLMap = () => {
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

  // Define DeckGL and MapView
  const deckGlLayers = [
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: [
        { position: [-122.41669, 37.7853], size: 100 },
        // Add more data points here
      ],
      getPosition: (d) => d.position,
      getFillColor: [255, 0, 0],
      getRadius: (d) => d.size,
    }),
  ]

  return (
    <DeckGL
      ref={deckRef}
      views={[new MapView({ controller: true })]} // Using MapView from deck.gl
      layers={deckGlLayers}
      initialViewState={{
        longitude: -122.41669,
        latitude: 37.7853,
        zoom: 11,
        pitch: 30,
        bearing: 0,
      }}
    />
  )
}

export default DeckGLMap
