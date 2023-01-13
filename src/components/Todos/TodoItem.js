//import { useState } from 'react';
import Button from '../UI/Button';
import classes from './TodoItem.module.css';
import useHttp from '../../hooks/use-http';


const TodoItem = (props) => {
  console.log(props.checked)
  
  //const [checkedTodo, setCheckedTodo] = useState(props.checked);

  const checkboxHandler = () => {
    //setCheckedTodo((prevState) => !prevState);
    props.onCheck(props.id);
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
        <input type="checkbox" defaultChecked={props.checked} onClick={checkboxHandler}></input>
        {props.children}
      </div>
      {props.checked && <Button onClick={deleteHandler}>Delete</Button>}
    </li>
  );
};

export default TodoItem;
