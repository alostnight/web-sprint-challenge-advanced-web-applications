import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          return <Component {...props} />;
        } else {
          console.log("redirecting!");
          return <Redirect to="/bubblepage" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
