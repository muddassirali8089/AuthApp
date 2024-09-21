// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load the token from cookies when the component mounts
    const tokenFromCookie = Cookies.get('jwt');
   
    console.log("token from cokkie" , tokenFromCookie);
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);

  // Function to update the token
  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      Cookies.set('token', newToken, { expires: 7 }); // Set token in cookie with 7 days expiration
    } else {
      Cookies.remove('token'); // Remove token if it is null
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken }}>

      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
