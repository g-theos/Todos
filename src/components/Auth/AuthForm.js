import { useState, useRef, useContext } from 'react';
import useHttp from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const history = useHistory();  

  const [isLoginIsNotSignUp, setIsLoginIsNotSignUp] = useState(true);
  const [formIsValid, setFormIsValid] = useState(true);
  const { isLoading, error, sendRequest: fetchUser } = useHttp();

  const switchAuthModeHandler = () => {
    setIsLoginIsNotSignUp((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

   /* if (!(enteredPassword.trim().length > 8)) {
      setFormIsValid(false);
      return;
    } */

    const userData = (data) => {
      authCtx.login(data.idToken);
      history.replace('/');
    };

    let url;
    if (isLoginIsNotSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDaQBW_7UGJxSZiGUVYdEwnf9iyDqHFzdc';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDaQBW_7UGJxSZiGUVYdEwnf9iyDqHFzdc';
    }

    fetchUser(
      {
        url: url,
        method: 'POST',
        body: {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
        headers: { 'content-type': 'application/json' },
      },
      userData
    );

    setFormIsValid(true);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLoginIsNotSignUp ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && !error && (
            <button>{isLoginIsNotSignUp ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          {error && <p>{error}</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLoginIsNotSignUp
              ? 'Create new account'
              : 'Login with existing account'}
          </button>
        </div>
        <div>
          {!formIsValid && (
            <p>Please enter a password with at least 8 characters</p>
          )}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
