import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    <>
      {
        // eslint-disable-next-line react/destructuring-assignment
        props.isLogin ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Component {...props} />
        ) : (
          <Redirect to='/signin' />
        )
      }
    </>
  </Route>
);

export default ProtectedRoute;
