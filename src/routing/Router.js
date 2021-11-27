import React, { useContext, useEffect } from "react";
// import { AppContainer } from "../shared/shared.styles";
import AuthContext from "../components/auth/authContext";

import { PrivateRoute, AuthRoute } from "../routing/PrivateRoute";

import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";

import HomePage from "../pages/homePage";
import UserPage from "../pages/userPage";
import Register from "../components/auth/register";
// import NavBar from "../components/navBar/NavBar";
// import PostPage from "../pages/postPage";
import AuthPage from "../pages/authPage";

import NavBar from "../components/navbar";
import PostPage from "../pages/postPage";
import ScrollToTop from "./scrollToTop";

window.history.scrollRestoration = "manual";
const Router = () => {
  const { isLoading, loggedIn, getLoggedIn } = useContext(AuthContext);
  {
    loggedIn && console.log("Router loggedIn: ", loggedIn);
  }
  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div>
        <NavBar />
        <Routes>
          <Route
            path="/auth"
            element={<AuthRoute component={<AuthPage />} />}
          />
          {/* <AuthRoute path="/register" component={Register} /> */}
          {/* <AuthRoute path="/register" component={Register} auth={loggedIn} /> */}
          <Route
            path="/user"
            element={<PrivateRoute component={<UserPage />} />}
          />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
