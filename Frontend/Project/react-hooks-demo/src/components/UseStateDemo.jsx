import React, { useState } from 'react';

const UseStateDemo = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleChange = (event) => {
        setName(event.target.value);
    };

    return (
        <div>
            <h1>useState Demo</h1>
            <div>
                <p>Count: {count}</p>
                <button onClick={increment}>Increment</button>
            </div>
            <div>
                <input 
                    type="text" 
                    value={name} 
                    onChange={handleChange} 
                    placeholder="Enter your name" 
                />
                <p>Your name is: {name}</p>
            </div>
        </div>
    );
};

export default UseStateDemo;