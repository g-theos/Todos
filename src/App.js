import React, { Fragment, useState, useEffect, useCallback } from 'react';

import TodoList from './components/Todos/TodoList';
import TodoInput from './components/Todos/TodoInput';
import useFetchTodosHandler from './hooks/useFetchData';
//import Card from './components/UI/Card';
import styles from './App.module.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /* const fetchTodosHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://react-http-75feb-default-rtdb.europe-west1.firebasedatabase.app/todos.json'
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedTodos = [];

      for (const key in data) {
        loadedTodos.push({
          id: key,
          text: data[key].text,
        });
      }

      setTodos(loadedTodos);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []); */

  useEffect(() => {
    useFetchTodosHandler(setTodos,setIsLoading, setError);
  }, [useFetchTodosHandler]);

  /* const addTodoHandler = (enteredText) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.unshift({ text: enteredText, id: Math.random().toString() });
      return updatedTodos;
    });
  }; */

  const addTodoHandler = async (enteredText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://react-http-75feb-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
        {
          method: 'POST',
          body: JSON.stringify({ text: enteredText }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      useFetchTodosHandler(setTodos, setIsLoading, setError);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  /* const deleteItemHandler = (todoId) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== todoId);
      return updatedTodos;
    });
  }; */

  const deleteItemHandler = async (todoId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://react-http-75feb-default-rtdb.europe-west1.firebasedatabase.app/todos/' +
          todoId +
          '.json',
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      /* setTodos((prevTodos) => {
        const updatedTodos = prevTodos.filter((todo) => todo.id !== todoId);
        return updatedTodos;
      }); */

      useFetchTodosHandler(setTodos, setIsLoading, setError);

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  let content = (
    <p style={{ textAlign: 'center' }}>No Tasks found. Maybe add one?</p>
  );

  if (todos.length > 0) {
    content = <TodoList todos={todos} onDeleteItem={deleteItemHandler} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <Fragment>
      <section id={styles['todo-form']}>
        <TodoInput onAddTodo={addTodoHandler} />
      </section>
      <section id={styles.todos}>{content}</section>
    </Fragment>
  );
};

export default App;
