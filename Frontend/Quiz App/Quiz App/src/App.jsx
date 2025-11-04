import { useState } from 'react';
import './App.css';
// import quizData from './components/quizData.json';

function App() {
  const [isStart, setIsStart] = useState(false)
  const [isNumber, setIsNumber] = useState(1)

  function startButton() {
    setIsStart(true)
  }

  function nextQuestion() {
    setIsNumber(isNumber + 1)
  }

  function prevQuestion() {
    setIsNumber(isNumber - 1)
  }
  return (
    <>
      {
        !isStart ? 
        <button onClick={startButton}>Start</button> :
        <div>       
          <div>
            <span>{isNumber}</span>
            <span> of 20</span>
            <div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus assumenda id illum. Quasi, aspernatur exercitationem magnam velit provident facilis saepe harum numquam dolores quae, excepturi ipsa voluptatibus sequi iusto quibusdam.</p>
              <button>Option A</button>
              <button>Option B</button>
              <button>Option C</button>
              <button>Option D</button>
            </div>
          </div>
          <div>
            <button onClick={prevQuestion} disabled={isNumber === 1}>Previous</button>
            <button onClick={nextQuestion} disabled={isNumber === 20}>Next</button>
          </div>
        </div>
        }
    </>
  )
}

export default App
