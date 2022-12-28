import { useCallback } from 'react';

const useFetchTodosHandler = (setTodos, setIsLoading, setError) => {
  const sendRequest = useCallback(async () => {
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
  }, []);

  sendRequest();
};

export default useFetchTodosHandler;
