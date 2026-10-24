import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../../common/AuthContext';

function PrivateRoute({ component: Component, isAdminRoute, ...rest }) {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return <Redirect to="/login" />;
        }
        if (isAdminRoute && !isAdmin) {
          return <Redirect to="/products" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
