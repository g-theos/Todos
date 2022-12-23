import { useState } from 'react';
import Button from '../UI/Button';
import classes from './TodoItem.module.css';

const TodoItem = (props) => {
  const [deletedTodo, setDeletedTodo] = useState(false);

  const checkboxHandler = () => {
    setDeletedTodo((prevState) => !prevState);
  };

  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <li
      className={`${classes['todo-item']} ${
        deletedTodo === true ? classes.deleted : ''
      }`}
    >
      <div>
        <input type="checkbox" onClick={checkboxHandler}></input>
        {props.children}
      </div>
      {deletedTodo && <Button onClick={deleteHandler}>Delete</Button>}
    </li>
  );
};

export default TodoItem;
