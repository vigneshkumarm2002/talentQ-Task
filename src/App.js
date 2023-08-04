import React, { useState } from 'react';
import './App.css';
import Dashboard from './comps/Dashboard';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <button onClick={toggleDarkMode} className='colorButton'>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Dashboard />
    </div>
  );
}

export default App;
