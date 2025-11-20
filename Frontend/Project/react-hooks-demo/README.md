# React Hooks Demo

This project is a demonstration of various React hooks including `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`, and `context`. Each hook is showcased in its own component, allowing for a clear understanding of how and when to use them.

## Project Structure

```
react-hooks-demo
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public
│   └── favicon.svg
└── src
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components
    │   ├── UseStateDemo.jsx
    │   ├── UseEffectDemo.jsx
    │   ├── UseCallbackDemo.jsx
    │   ├── UseMemoDemo.jsx
    │   ├── UseRefDemo.jsx
    │   └── ContextDemo.jsx
    ├── context
    │   └── AppContext.jsx
    └── hooks
        └── usePrevious.js
```

## Getting Started

To run this project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd react-hooks-demo
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to see the application in action.

## Hooks Demonstrated

- **useState**: Demonstrates state initialization and updating state.
- **useEffect**: Shows how to perform side effects in functional components.
- **useCallback**: Memoizes callback functions to prevent unnecessary re-renders.
- **useMemo**: Memoizes expensive calculations to optimize performance.
- **useRef**: Creates mutable references that persist for the full lifetime of the component.
- **Context**: Demonstrates how to provide and consume context for state management.

## License

This project is licensed under the MIT License.