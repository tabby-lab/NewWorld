import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThreeScene from './components/ThreeScene'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <h1>Three.js with React and Vite</h1>
        <ThreeScene />
    </>
  )
}

export default App
