import { useContext } from "react";
import { Redirect, Route, useNavigate } from "react-router-dom";
// import Register from "../components/auth/Register";
import AuthContext from "../components/auth/authContext";
import UserPage from "../pages/userPage";
import AuthPage from "../pages/authPage";

export const PrivateRoute = ({ component }) => {
  const { loggedIn } = useContext(AuthContext);
  const finalComponent = loggedIn ? component : <AuthPage />;
  return finalComponent;
};

export const AuthRoute = ({ component }) => {
  const { loggedIn } = useContext(AuthContext);
  console.log("AuthRoute: ", loggedIn);
  const finalComponent = !loggedIn ? <AuthPage /> : component;
  return finalComponent;
};
