//import { useState } from 'react';
import Button from '../UI/Button';
import classes from './TodoItem.module.css';

const TodoItem = (props) => {
  console.log(props.checked)
  
  //const [checkedTodo, setCheckedTodo] = useState(props.checked);
  //console.log('checkedTodo:'+checkedTodo)

  const checkboxHandler = () => {
    //setCheckedTodo((prevState) => !prevState);
    //console.log('inside handler'+checkedTodo)
    props.onCheck(props.id, !props.checked);
  };

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <li
      className={`${classes['todo-item']} ${
        props.checked === true ? classes.checked : ''
      }`}
    >
      <div>
        <input type="checkbox" onClick={checkboxHandler}></input>
        {props.children}
      </div>
      {props.checked && <Button onClick={deleteHandler}>Delete</Button>}
    </li>
  );
};

export default TodoItem;
