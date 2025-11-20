import React, { useMemo, useState } from 'react';

const UseMemoDemo = () => {
    const [count, setCount] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const expensiveCalculation = (num) => {
        console.log('Calculating...');
        let sum = 0;
        for (let i = 0; i <= num; i++) {
            sum += i;
        }
        return sum;
    };

    const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

    return (
        <div>
            <h2>useMemo Demo</h2>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <p>Expensive Calculation Result: {memoizedValue}</p>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type something..."
            />
        </div>
    );
};

export default UseMemoDemo;