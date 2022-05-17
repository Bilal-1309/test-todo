import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {createTodo, loadTodos} from "../../redux/features/todo";
import styles from "./input.module.css";

const Input = () => {

  const dispatch = useDispatch();
  const [todos, setTodos] = useState("");
  const [name, setName] = useState("");


  const handleInputTodo = (e) => {
    setTodos(e.target.value);
  };
  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleClick = () => {
    dispatch(createTodo(name, todos));
    setTodos("");
    setName("");
  };

  return (
    <div className={styles.add}>
      <input
        className={styles.input}
        value={name}
        type="text"
        name="input"
        placeholder="Введите имя ..."
        onChange={(e) => handleInputName(e)}
      />
      <input
        className={styles.input}
        value={todos}
        type="text"
        name="input"
        placeholder="Введите задачу ..."
        onChange={(e) => handleInputTodo(e)}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={!todos || !name}
        className={styles.btn}
      >
        Add
      </button>{' '}
    </div>
  );
};

export default Input;
