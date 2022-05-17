import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createTodo, loadTodos} from "../../redux/features/todo";
import Todo from "../Todo";
import styles from './todolist.module.css'

const TodoList = () => {

    const dispatch = useDispatch();



    const todos = useSelector((state => state.todosReducer.todos))
    const loading = useSelector((state => state.todosReducer.loading))

  useEffect(() => {
    dispatch(loadTodos())
  },[dispatch])

    return (
        <div className={styles.toDoList}>
            <div>
                {
                    loading ? 'идет загрузка...':
                        todos.map((todo,index) => {
                            return (
                              !!todo.name &&
                                <Todo
                                  key={index}
                                  id={todo._id}
                                    todo={todo}
                               />
                            )
                        })
                }
            </div>
        </div>
    );
};

export default TodoList;