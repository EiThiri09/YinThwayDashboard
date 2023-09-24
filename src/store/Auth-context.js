import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  user: '',
  isLoggedIn: false,
  login: (token) => { },
  logout: () => { },
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedUser.idToken,
    duration: remainingTime,
    user: storedUser
  };
};

export const AuthContextProvider = (props) => {

  const tokenData = retrieveStoredToken();

  let initialToken;
  let user;
  if (tokenData) {
    initialToken = tokenData.token;
    user = tokenData.user;
  }
  const [userData, setUserData] = useState(user);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(!!initialToken);

  const logoutHandler = useCallback(() => {
    setUserData(null);
    setUserIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (userD, expirationTime) => {
    setUserIsLoggedIn(!!userD.idToken)
    setUserData(userD);
    localStorage.setItem('user', JSON.stringify(userD));
    localStorage.setItem('expirationTime', expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);

  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    user: userData,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
   
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;