import { useState } from 'react'
import '../style.css'
import '../progressBar.css'

const content = [
  {
    question: "What is JavaScript?",
    answer: "JavaScript is a programming language used to create dynamic and interactive effects within web browsers."
  },
  {
    question: "What is a variable in JavaScript?",
    answer: "A variable is a container for storing data values."
  },
  {
    question: "How do you declare a variable in JavaScript?",
    answer: "You can declare a variable using var, let, or const keywords."
  },
  {
    question: "What is the difference between let and var?",
    answer: "let is block scoped while var is function scoped."
  },
  {
    question: "What is a function in JavaScript?",
    answer: "A function is a block of code designed to perform a particular task."
  },
  {
    question: "How do you write a function in JavaScript?",
    answer: "function myFunction() { // code }"
  },
  {
    question: "What is an array?",
    answer: "An array is a data structure that can hold multiple values in a single variable."
  },
  {
    question: "How do you add an element to an array?",
    answer: "You can use the push() method to add an element to the end of an array."
  },
  {
    question: "What is an object in JavaScript?",
    answer: "An object is a collection of key-value pairs."
  },
  {
    question: "How do you access a property of an object?",
    answer: "You can use dot notation or bracket notation, e.g., obj.key or obj['key']."
  },
  {
    question: "What is a callback function?",
    answer: "A callback function is a function passed into another function as an argument."
  },
  {
    question: "What is the DOM?",
    answer: "The DOM (Document Object Model) represents the structure of a web page."
  },
  {
    question: "How do you select an element in the DOM?",
    answer: "You can use document.getElementById(), document.querySelector(), etc."
  },
  {
    question: "What is event bubbling?",
    answer: "Event bubbling is the propagation of events from child to parent elements in the DOM."
  },
  {
    question: "What is 'use strict'?",
    answer: "'use strict' is a directive that enables strict mode, which helps catch common coding mistakes."
  },
  {
    question: "What is JSON?",
    answer: "JSON (JavaScript Object Notation) is a format for storing and exchanging data."
  },
  {
    question: "How do you parse JSON in JavaScript?",
    answer: "You can use JSON.parse() to convert a JSON string into a JavaScript object."
  },
  {
    question: "What is a promise?",
    answer: "A promise is an object representing the eventual completion or failure of an asynchronous operation."
  },
  {
    question: "How do you handle errors in JavaScript?",
    answer: "You can use try...catch blocks to handle errors."
  },
  {
    question: "What is hoisting?",
    answer: "Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope."
  }
];

function FlashCards() {
  const [current, setCurrent] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const prevButton = () => {
    setShowAnswer(false)
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const nextButton = () => {
    setShowAnswer(false)
    setCurrent((prev) => (prev < content.length - 1  ? prev + 1 : prev))
  }

  const showQuesAnswer = () => setShowAnswer((prev) => !prev)

  // calculate progress bar rate
  const progressPercent = ((current + 1) / content.length) * 100
    return (
      <>
      <div className="percentage-bar">
        <div className="progress-bar-outer">
          <div
            className="progress-bar-inner"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className='progress'>
          <span className="remaining">{current + 1} </span>
          <span>of {content.length}</span>
        </div>
      </div>

          <div className="question-container">
            <div className='questions'>
              {showAnswer ? content[current].answer : content[current].question }
            </div>

            <div className='toggle-buttons'>
              <button onClick={prevButton} disabled={current === 0}>Previous</button>
              <button onClick={showQuesAnswer}>Show Answer</button>
              <button onClick={nextButton} disabled={current === 19} >Next</button>
            </div>
      </div>
      </>
    )
}

export default FlashCards