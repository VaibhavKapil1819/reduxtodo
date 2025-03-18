import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './todosSlice';

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      dispatch(addTodo(newTodoText));
      setNewTodoText('');
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;