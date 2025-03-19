import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo,addCategory ,selectTasksByCategory} from './todosSlice';

const Todos = () => {
  const todos = useSelector((state) => state.todos.tasks);
  const categories = useSelector((state) => state.todos.categories);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newCategory, setNewCategory] = useState('');


  const handleAddTodo = () => {
    if (newTodoText.trim() && selectedCategory !== 'All') {
      dispatch(addTodo({ text: newTodoText, category: selectedCategory }));
      setNewTodoText('');
    }
  };
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory));
      setNewCategory('');
    }
  };

  const filteredTasks = useSelector((state) =>
    selectTasksByCategory(state, selectedCategory)
  );


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
         <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <div>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add a new category"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      <ul>
        {filteredTasks.map((todo) => (
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