import React, { useContext } from "react";

import { useNavigate } from "react-router";
import AuthContext from "./auth/authContext";
import { makeStyles } from "@mui/styles";
import NavBar from "./navbar";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    page: {
      minHeight: "2000px",
      width: "100%",
    },

    toolbar: theme.mixins.toolbar,
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box elevation={0} display="relative">
      <div className={classes.toolbar}></div>
      <div className={classes.page}>{children}</div>;
    </Box>
  );
};

export default Layout;
