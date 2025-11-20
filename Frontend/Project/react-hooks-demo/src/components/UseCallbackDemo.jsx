import React, { useState, useCallback } from 'react';

const UseCallbackDemo = () => {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const incrementCount = useCallback(() => {
        setCount(prevCount => prevCount + 1);
    }, []);

    return (
        <div>
            <h1>useCallback Demo</h1>
            <button onClick={incrementCount}>Increment Count</button>
            <p>Count: {count}</p>
            <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Type something..."
            />
        </div>
    );
};

export default UseCallbackDemo;