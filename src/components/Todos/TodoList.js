import TodoItem from './TodoItem';
import classes from './TodoList.module.css';

const TodoList = (props) => {
  return (
    <ul className={classes['todo-list']}>
      {props.todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} onDelete={props.onDeleteItem}>
          {todo.text}
        </TodoItem>
      ))}
    </ul>
  );
};

export default TodoList;
