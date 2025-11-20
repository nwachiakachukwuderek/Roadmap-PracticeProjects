import React, { useRef } from 'react';

const UseRefDemo = () => {
    const inputRef = useRef(null);
    const previousValueRef = useRef('');

    const handleFocus = () => {
        inputRef.current.focus();
    };

    const handleChange = (event) => {
        previousValueRef.current = event.target.value;
    };

    return (
        <div>
            <h2>useRef Demo</h2>
            <input
                type="text"
                ref={inputRef}
                onChange={handleChange}
                placeholder="Type something..."
            />
            <button onClick={handleFocus}>Focus Input</button>
            <p>Previous Value: {previousValueRef.current}</p>
        </div>
    );
};

export default UseRefDemo;