import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import "../styles/todolist.css"
import { IconContext } from 'react-icons';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const todosPerPage = 7;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos?_page=${currentPage + 1}&_limit=${todosPerPage}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const total = response.headers.get('x-total-count');
        setPageCount(Math.ceil(total / todosPerPage));
        return response.json();
      })
      .then(data =>{
        setIsLoading(false);
        setTodos(data)
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const markComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <>
    <div className="global-body">
    {!isLoading && ( <ul className="todo-list-container">
    {error && <div className="error text-red">Error: {error}</div>}
   
    {todos.map(todo => (
  <li key={todo.id} className="todo-item">
    <label className="todo-label"> {/* Add this label element */}
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => markComplete(todo.id)}
      />
      {todo.title}
    </label> {/* Close the label element */}
    <button
      className="todo-delete-btn"
      onClick={() => deleteTodo(todo.id)}
    >
      Delete
    </button>
  </li>
))}
    </ul>)}
    </div>
    <ReactPaginate
      breakLabel={'...'}
      previousLabel={
        <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
          <AiFillLeftCircle />
        </IconContext.Provider>
      }
      nextLabel={
        <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
          <AiFillRightCircle />
        </IconContext.Provider>
      }
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      pageClassName={'pageClassname'}
      onPageChange={handlePageClick}
      containerClassName={'pagination-container'}
     
      activeLinkClassName={'activeLinkClass'}
      pageLinkClassName={'page-link'}
      breakClassName={'break-label-link'}
    />
  </>
  
  );
}

export default TodoList;
