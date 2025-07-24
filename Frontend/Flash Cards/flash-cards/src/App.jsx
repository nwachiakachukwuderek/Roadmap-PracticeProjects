import { useState } from 'react'
import './App.css'
import './style.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Flash Cards</h1>
      <div className="percentage-bar">
       <div className='progress'>
        <span className="remaining">0 </span>
        <span>of 20</span>
       </div>
      </div>

      <div className="question-container">
        <div className='questions'>
          What is the difference between var, let and const?
        </div>

        <div className='toggle-buttons'>
          <button>Previous</button>
          <button>Show Answer</button>
          <button>Next</button>
        </div>
      </div>
    </>
  )
}

export default App
