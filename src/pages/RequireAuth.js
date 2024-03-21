import {Navigate, Route} from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import {useContext} from "react";


const RequireAuth = ({ element: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);

  return auth.isAuthenticated ? (
    <Route {...rest} element={Component} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default RequireAuth;