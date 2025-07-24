import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Flash Cards</h1>
      <div className="percentage-bar">
        <span className="remaining">0 </span>
        <span>of 20</span>
      </div>

      <div>
        <div className="ques-ans">
          What is the difference between var, let and const?
        </div>

        <div>
          <span>Previous</span>
          <span>Show Answer</span>
          <span>Next</span>
        </div>
      </div>
    </>
  )
}

export default App
