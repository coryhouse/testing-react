import React from 'react';
import TodoItem from './TodoItem';

const TodoLists = props => {
  return (
    <div className="todo-list">
      {props.todos.length === 0 && <p>No todos found. Please add some.</p>}
      {props.todos.map((todo, index) => (
        <TodoItem key={index} todo={todo}></TodoItem>
      ))}
    </div>
  );
};

export default TodoLists;
