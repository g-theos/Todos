import React, { useState } from "react";

const AuthContext = React.createContext({
  token: '',
  userId: '',
  isLoggedIn: false,
  login: (token, userId) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, userId) => {
    setToken(token);
    setUserId(userId);
  };

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
  };

  const contextValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthContext