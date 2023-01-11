import { useState } from 'react';
import Button from '../UI/Button';
import classes from './TodoItem.module.css';
import useHttp from '../../hooks/use-http';


const TodoItem = (props) => {
  console.log(props.checked)
  const { isLoading, error, sendRequest: fetchTodos } = useHttp();
  const [checkedTodo, setCheckedTodo] = useState(props.checked);
  //console.log('checkedTodo:'+checkedTodo)

  const checkboxHandler = () => {
    setCheckedTodo((prevState) => {
      console.log('prevstate'+prevState)
      return !prevState});
    console.log('inside handler'+checkedTodo)

    const modifyTodo = () => {
        /* setTodos((prevTodos) => {
          prevTodos[checkedTodoIndex].checked = !prevTodos[checkedTodoIndex].checked;
          const updatedTodos = prevTodos;
          console.log('updated todos:'+updatedTodos);
          return updatedTodos;
        }); */
      };

      fetchTodos(
        {
          url:
            'https://react-http-75feb-default-rtdb.europe-west1.firebasedatabase.app/todos/' +
            props.id +
            '.json',
          method: 'PATCH',
          body: { checked: checkedTodo },
          headers: { 'Content-Type': 'application/json' },
        },
        modifyTodo
      );
  };

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <li
      className={`${classes['todo-item']} ${
        checkedTodo === true ? classes.checked : ''
      }`}
    >
      <div>
        <input type="checkbox" value={checkedTodo} onClick={checkboxHandler}></input>
        {props.children}
      </div>
      {checkedTodo && <Button onClick={deleteHandler}>Delete</Button>}
    </li>
  );
};

export default TodoItem;
