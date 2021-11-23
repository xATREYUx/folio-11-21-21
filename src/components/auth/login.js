// import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../auth/authContext";
import domain from "../../util/domain";
// import { createUser, loginUser } from "./authActions";
// import { AuthFormContainer } from "./auth-form-styles";
// import Button from "../form-elements/button";
import FormErrors from "../form-elements/formErrors";
import { Button, Paper, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  authFormContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    margin: "auto",
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  formTitle: { ...theme.typography.h3, margin: 0 },
  input: {
    margin: ".5rem",
  },
}));
const LoginForm = () => {
  const { getLoggedIn, loggedIn, loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const classes = useStyles();

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };
      const loginRes = await loginUser(loginData);
      if (loginRes != "Login successfull") {
        const error = FormErrors(loginRes);
        setLoginError(error);
      }
      navigate("/user");
    } catch (err) {
      console.log("Error in login function", err);
    }
    getLoggedIn();
  };

  return (
    <Box
      onSubmit={login}
      position="relative"
      className={classes.authFormContainer}
      component="form"
      noValidate
      autoComplete="off"
    >
      {/* <form onSubmit={login} className="auth-form"> */}
      <h3 className={classes.formTitle}>Login</h3>

      <TextField
        className={classes.input}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        InputProps={{
          className: classes.input,
        }}
      />
      <TextField
        className={classes.input}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        InputProps={{
          className: classes.input,
        }}
      />
      <div>{loginError}</div>
      <Button color="success" variant="contained" type="submit">
        Login
      </Button>
      <div id="error"></div>
      {/* </form> */}
    </Box>
  );
};

export default LoginForm;
