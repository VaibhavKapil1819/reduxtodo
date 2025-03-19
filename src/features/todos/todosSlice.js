import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    { id: 1, text: 'Learn React', completed: false, category: 'Work' },
    { id: 2, text: 'Buy groceries', completed: true, category: 'Shopping' },
  ],
  categories: ['Work', 'Personal', 'Shopping'],
};
// src/features/todos/todosSlice.js
export const selectTasksByCategory = (state, category) => {
  if (category === 'All') {
    return state.todos.tasks;
  }
  return state.todos.tasks.filter((task) => task.category === category);
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        category: action.payload.category,
      };
      state.tasks.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const todo = state.tasks.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todo= state.tasks.filter((todo) => todo.id !== action.payload);
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    }
  },
});

export const { addTodo, toggleTodo, deleteTodo,addCategory } = todosSlice.actions;
export default todosSlice.reducer;