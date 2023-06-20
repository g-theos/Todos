import { useContext, useRef, useState } from 'react';
import useHttp from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';

import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const { isLoading, error, sendRequest: fetchPassword } = useHttp();
  const authCtx = useContext(AuthContext);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    //add validation

    const passwordData = (data) => {
      setPasswordChanged(true)
    };

    fetchPassword(
      {
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key='+process.env.REACT_APP_FIREBASE_API_KEY,
        method: 'POST',
        body: {
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        },
        headers: { 'Content-Type': 'application/json' },
      },
      passwordData
    );
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="8"
          ref={newPasswordInputRef}
        />
      </div>
      {!isLoading && !error && (
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      )}
      {isLoading && <p>Sending request...</p>}
      {error && <p>{error}</p>}
      {passwordChanged && <p>Password changed successfully</p> }
    </form>
  );
};

export default ProfileForm;
