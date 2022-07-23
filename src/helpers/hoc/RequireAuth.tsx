import React from 'react';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }: any, hasUser: boolean) {
  if (!hasUser) {
   
    return <Navigate to="/sign-in" />;
  }
  
  return children;
}

export { RequireAuth };
