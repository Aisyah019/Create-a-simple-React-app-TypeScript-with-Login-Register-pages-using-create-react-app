import React, { useState } from "react";
import "./TodoList.css";
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editIndex, setEditIndex] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? newTodo : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    setNewTodo({ title: "", description: "" });
  };
  const handleEdit = (index) => {
    setNewTodo(todos[index]);
    setEditIndex(index);
  };
  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  return (
    <div className="todo-list-container">
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newTodo.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={newTodo.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                <button
                  onClick={() => handleEdit(index)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TodoList;