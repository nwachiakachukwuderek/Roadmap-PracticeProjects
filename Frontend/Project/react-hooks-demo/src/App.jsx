import React from 'react';
import { AppProvider } from './context/AppContext';
import UseStateDemo from './components/UseStateDemo';
import UseEffectDemo from './components/UseEffectDemo';
import UseCallbackDemo from './components/UseCallbackDemo';
import UseMemoDemo from './components/UseMemoDemo';
import UseRefDemo from './components/UseRefDemo';
import ContextDemo from './components/ContextDemo';

const App = () => {
    return (
        <AppProvider>
            <div>
                <h1>React Hooks Demo</h1>
                <UseStateDemo />
                <UseEffectDemo />
                <UseCallbackDemo />
                <UseMemoDemo />
                <UseRefDemo />
                <ContextDemo />
            </div>
        </AppProvider>
    );
};

export default App;