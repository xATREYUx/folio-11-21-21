// import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "./authContext";
import domain from "../../util/domain";
import { makeStyles } from "@mui/styles";
import { Button, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
// import Button from "../form-elements/button";
// import { AuthFormContainer } from "./auth-form-styles";

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
const RegisterForm = () => {
  const { getLoggedIn, loggedIn, createUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const classes = useStyles();
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const registerData = {
        email,
        password,
        passwordVerify,
      };
      await createUser(registerData);
      await getLoggedIn();
      navigate("/user");
    } catch (err) {
      console.log("Error in createUser function: ", err);
    }
  };

  return (
    <Box
      onSubmit={register}
      position="relative"
      className={classes.authFormContainer}
      component="form"
      autoComplete="off"
    >
      {/* <form onSubmit={register} className="auth-form"> */}
      <h3 className={classes.formTitle}>Register</h3>
      <TextField
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        InputProps={{
          className: classes.input,
        }}
      />
      <TextField
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        InputProps={{
          className: classes.input,
        }}
      />
      <TextField
        type="password"
        placeholder="Verify your password"
        onChange={(e) => setPasswordVerify(e.target.value)}
        value={passwordVerify}
        InputProps={{
          className: classes.input,
        }}
      />
      <Button color="success" variant="contained" type="submit">
        Register
      </Button>
      {/* </form> */}
    </Box>
  );
};

export default RegisterForm;
