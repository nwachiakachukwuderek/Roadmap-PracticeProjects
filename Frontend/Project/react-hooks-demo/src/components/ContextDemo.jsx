import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ContextDemo = () => {
    const { state, dispatch } = useContext(AppContext);

    const handleIncrement = () => {
        dispatch({ type: 'INCREMENT' });
    };

    const handleDecrement = () => {
        dispatch({ type: 'DECREMENT' });
    };

    return (
        <div>
            <h2>Context API Demo</h2>
            <p>Current Count: {state.count}</p>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
        </div>
    );
};

export default ContextDemo;