import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThreeScene from './components/ThreeScene'
import DeckGLMap from './components/DeckGLMap'
import D3Chart from './components/D3Chart'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>3D Mapping with Deck.gl and Three.js</h1>
      <DeckGLMap />
      <h2>D3.js Visualization</h2>
      <D3Chart />
    </>
  )
}

export default App
