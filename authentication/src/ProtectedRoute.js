// src/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './Auth/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/signin" replace />;
  }

  // Render the children components if the user is authenticated
  return children;
};

export default ProtectedRoute;
