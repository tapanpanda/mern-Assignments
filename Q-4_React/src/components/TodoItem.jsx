import React from "react";
import "./TodoItem.css";

const TodoItem = ({ task, toggleTask, deleteTask }) => {
  return (
    <li className="todo-item">
      <span
        onClick={() => toggleTask(task.id)}
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;

