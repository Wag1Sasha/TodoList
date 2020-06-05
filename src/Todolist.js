import React from "react";
import "./App.css";

export default function Todolist() {
  const [todos, setTodos] = React.useState([]);

  const idGen = (title) => {
    const id = title + Math.random();
    return id;
  };

  const deleteTodo = (id) => {
    const filterTodo = todos.filter((todo) => id !== todo.id);
    setTodos([...filterTodo]);
  };

  const setCompletedTodo = (id) => {
    const markTodo = todos.find((todo) => id === todo.id);
    markTodo.completed = !markTodo.completed;
    setTodos([...todos]);
  };

  const createTodo = (title) => {
    const newTodos = setTodos([
      ...todos,
      {
        title: title,
        id: idGen(title),
        completed: false,
      },
    ]);
  };
  return (
    <div className="todolist">
      <Form createTodo={createTodo} />
      {todos.map((todo, index) => (
        <Todo
          key={todo.id}
          title={todo.title}
          setCompletedTodo={setCompletedTodo}
          id={todo.id}
          deleteTodo={deleteTodo}
          completed={todo.completed}
        />
      ))}
    </div>
  );
}

function Todo({ title, id, setCompletedTodo, completed, deleteTodo }) {
  console.log(completed);
  const iCompl = (
    <span
      className="material-icons"
      onClick={() => {
        setCompletedTodo(id);
      }}
    >
      check_box
    </span>
  );
  const iNCompl = (
    <span
      className="material-icons"
      onClick={() => {
        setCompletedTodo(id);
      }}
    >
      check_box_outline_blank
    </span>
  );
  return (
    <div className="todo">
      {completed ? iCompl : iNCompl}
      <p>{title}</p>
      <span
        className="material-icons"
        onClick={() => {
          deleteTodo(id);
        }}
      >
        delete
      </span>
    </div>
  );
}

function Form({ createTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") return;
    createTodo(value);
    setValue("");
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="form">
      <h1>TODO LIST</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="inputForAddTitle"
          onChange={onChange}
          value={value}
          placeholder="Create Todo"
        ></input>
      </form>
    </div>
  );
}
