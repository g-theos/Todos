import React, { Fragment, useState, useEffect } from 'react';

import TodoList from '../Todos/TodoList';
import TodoInput from '../Todos/TodoInput';
import useHttp from '../../hooks/use-http';
//import Card from './components/UI/Card';
import styles from './MainPage.module.css';

const MainPage = () => {
  const [todos, setTodos] = useState([]);

  const { isLoading, error, sendRequest: fetchTodos } = useHttp();

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
    const transformTodos = (todosObj) => {
      const loadedTodos = [];

      for (const key in todosObj) {
        loadedTodos.push({
          id: key,
          text: todosObj[key].text,
          checked: todosObj[key].checked,
        });
      }

      setTodos(loadedTodos.reverse());
    };

    fetchTodos(
      {
        url: 'https://react-http-75feb-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
      },
      transformTodos
    );
  }, [fetchTodos]);

  /* const addTodoHandler = (enteredText) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.unshift({ text: enteredText, id: Math.random().toString() });
      return updatedTodos;
    });
  }; */

  /*   const addTodoHandler = async (enteredText) => {
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
 */

  const addTodoHandler = (enteredText) => {
    const createTodo = (todoData) => {
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        updatedTodos.unshift({
          text: enteredText,
          id: todoData.name,
          checked: false,
        }); // firebase-specific => "name" contains generated id
        return updatedTodos;
      });
    };

    fetchTodos(
      {
        url: 'https://react-http-75feb-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
        method: 'POST',
        body: { text: enteredText, checked: false },
        headers: { 'Content-Type': 'application/json' },
      },
      createTodo
    );
  };

  /* const deleteItemHandler = (todoId) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== todoId);
      return updatedTodos;
    });
  }; */

  /* const deleteItemHandler = async (todoId) => {
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

      useFetchTodosHandler(setTodos, setIsLoading, setError);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }; */

  const deleteItemHandler = (todoId) => {
    const deleteTodo = () => {
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.filter((todo) => todo.id !== todoId);
        return updatedTodos;
      });
    };

    fetchTodos(
      {
        url:
          'https://react-http-75feb-default-rtdb.europe-west1.firebasedatabase.app/todos/' +
          todoId +
          '.json',
        method: 'DELETE',
      },
      deleteTodo
    );
  };

  const checkItemHandler = (todoId) => {
    const checkedTodoIndex = todos.findIndex((todo) => todo.id === todoId);
    const newCheckValue = !todos[checkedTodoIndex].checked;

    const modifyTodo = () => {
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        updatedTodos[checkedTodoIndex].checked = newCheckValue;
        return updatedTodos;
      });
    };

    fetchTodos(
      {
        url:
          'https://react-http-75feb-default-rtdb.europe-west1.firebasedatabase.app/todos/' +
          todoId +
          '.json',
        method: 'PATCH',
        body: { checked: newCheckValue },
        headers: { 'Content-Type': 'application/json' },
      },
      modifyTodo
    );
  };

  let content = (
    <p style={{ textAlign: 'center' }}>No Tasks found. Maybe add one?</p>
  );

  if (todos.length > 0) {
    content = (
      <TodoList
        todos={todos}
        onDeleteItem={deleteItemHandler}
        onCheckItem={checkItemHandler}
      />
    );
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

export default MainPage;