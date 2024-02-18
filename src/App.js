


import { useEffect, useState } from 'react';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import "./styles/app.css"
function App() {
  
  return (
    <div className="container">
       <div className='flex-1'>
        <Counter/>
        
      </div>
      <ul className='flex-1'>
      
       <TodoList/>

    </ul>
      
    </div>
  );
}

export default App;
