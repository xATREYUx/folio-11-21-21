import { ClassNames } from "@emotion/react";
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { defaults } from "js-cookie";
import React from "react";
import LoginForm from "../components/auth/login";
import RegisterForm from "../components/auth/register";
// import { AuthPageContainer } from "./auth-page-styles";
const useStyles = makeStyles((theme) => ({
  authPageContainer: {
    // display: "flex",
    // flexDirection: "column",
    // width: "70%",
    // fontFamily: "breakers",
    // justifyContent: "center",
    // alignItems: "center",
    textAlign: "center",
    // padding: "2rem",
    margin: "4rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "1rem",
      marginRight: "1rem",
    },
  },
  authPageGrid: {
    // width: "70%",
  },
}));
const AuthPage = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.authPageContainer}>
      <Grid
        container
        justify="center"
        spacing={1}
        className={classes.authPageGrid}
      >
        <Grid item xs={12} sm={12} md={6}>
          <LoginForm />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <RegisterForm />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AuthPage;
