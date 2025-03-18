import React from 'react';
import Todos from './features/todos/Todos';
import './styles.css';

function App() {
  return (
    <div className="App" style={{ backgroundColor: 'red', padding: '20px' }}>
      <h1>Redux To-Do List</h1>
      <Todos />
    </div>
  );
}

export default App;