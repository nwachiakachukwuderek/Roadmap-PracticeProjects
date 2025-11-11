import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState('static');
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('nigeria');
  const [submittedValue, setSubmittedValue] = useState('');

  console.log(error)
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        // Using fetch to request API data
        const response = await 
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=d12dcc0698523bb7aa05fcb3cdfb35b7&units=metric`);

        setLoading('requesting')

        // Check if response was succesful 
        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Pass the response body as a json
        const result = await response.json();
        console.log(result)

        // Update the state with the fetched Data
        setData(result);
      } catch (e) {
        // Update the error state if the fetch fails
        setError(e.message);
      } finally {
        // set Loading to false once the operation stops(if it fails or success) is complete
        setLoading('loaded')
      }
    };

    fetchData();

    //the initial render, similar to 'componentDidMount' in class componenets
  }, [submittedValue])

  function handleChange(e) {
    setInputValue(e.target.value);
  };

  function handleSubmit() {
    setSubmittedValue(inputValue);
  }

  if (loading === 'static') {
    return (
      <div>
        <h1>Welcome to My Weather App</h1>
      </div>
    )
  }

  if (loading === 'requesting') {
    return (
      <>
      <div>
        <p>
          Pls wait, your request is loading......
        </p>
      </div>
      </>
    )
  }

  const m = data.main

  return (
    <>
      <div>
        <h1>My Weather App</h1>

        <form action="">
          <label>
            Location: <br />
            <input 
            type="text"
            placeholder='Enter your Desired Location'
            value={inputValue}
            onChange={handleChange}
            />
          </label>
        </form>

        <button onClick={handleSubmit}>Reload</button>

        {
          submittedValue && (
            <p>Last submitted Query: {submittedValue}</p>
          )
        }

        <div>
          <div>
            Local Weather Report
            <span>
              {/* Weather image goes here */}
            </span>

              <h2>
                27*c
              </h2>
              <h3>
                {submittedValue}
              </h3>
          </div>

          <div>
            <p>
              {m.humidity}
              
            </p>
            <br />
            <span>
               wind speed
               {data.wind.speed}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
export default App