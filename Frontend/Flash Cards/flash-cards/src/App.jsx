import { useState } from 'react'
import './App.css'
import FlashCards from './Components/FlashCards'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Flash Cards</h1>
      <FlashCards />
    </>
  )
}

export default App
