import React, {useState} from 'react';
import styles from './todo.module.css'
import {useDispatch, useSelector} from "react-redux";
import {completeUpdateTodo, deleteTodo, textUpdateTodo} from "../../redux/features/todo";
import setting from '../../assets/setting.png'

const Todo = (props) => {

  const dispatch = useDispatch()

  const [text,setText] = useState('');
  const [changeOpened, setChangeOpened] = useState(false);

  const handleCompleted = (id, completed)=> {
    dispatch(completeUpdateTodo(id, completed))
  }

  const loading = useSelector((state => state.todosReducer.loading));
  const idUser = localStorage.getItem('id');
  const admin = idUser === '627a4d4cc3270ba00e20d446'

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleToggleChange = () => {
    setChangeOpened(!changeOpened)
  }

  const handleInput = (e) => {
    setText(e.target.value)
  }

  const handleTextClick = (id) => {
    dispatch(textUpdateTodo(id, text));
    setChangeOpened(!changeOpened)
  };

  return (
    <>
    {loading
      ?
      'идет загрузка...'
      :
        <div className={styles.todo}>
          <div className={styles.checkbox}>
            {
              admin ?
                <input type="checkbox" checked={props.todo.completed} className={styles.checkbox} onChange={()=>handleCompleted(props.todo._id,props.todo.completed)} />:
                <input type="checkbox" checked={props.todo.completed} className={styles.checkbox}/>
            }
          </div>
          <div className={styles.nameText}>
            <div className={styles.name}><span>Имя: {props.todo.name}</span></div>
            <div className={styles.texta}>
              {admin ?
                <>
                {
                 changeOpened ?
                   <>
                   <input
                     className={styles.input}
                     type="text"
                     name="input"
                     placeholder="Введите изменение ..."
                     onChange={(e)=>handleInput(e)}
                   />
                   <button
                     type="button"
                     className={styles.btn}
                     onClick={() => handleTextClick(props.todo._id)}
                   >
                     Add
                   </button>
                   </>: <><img src={setting} alt="set" onClick={handleToggleChange}/><span>Дело:</span> <span>{props.todo.text}</span></>
                }
                </> :
                <>
                  <span>Дело:</span> <span>{props.todo.text}</span></>
              }
            </div>
          </div>
          <div className={styles.deleteTodo}>
            <button className={styles.deleteTodo} onClick={()=>handleDelete(props.todo._id)}>❌</button>
          </div>
        </div>}
    </>
    );
};

export default Todo;