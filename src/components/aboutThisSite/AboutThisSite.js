import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { ClassSharp } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  aboutThisSiteContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    // justifyContent: "center",
    marginBottom: "2rem",
    textAlign: "justify",
    width: "75%",
  },
  aboutThisSiteType: {
    ...theme.typography.subtitle1,
    color: "white",
    // maxWidth: "400px",
    // marginBottom: "1rem",
    // margin: "2rem",
    // textJustify: "inter-word",
    [theme.breakpoints.down("md")]: {
      // alignItems: "center",
      // width: "85%",
      // padding: "1rem",
      // margin: "1rem",
    },
  },
  mainTitle: {
    color: "white",
    fontFamily: "Bangers",
    fontSize: "3rem",
    letterSpacing: ".2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
}));

export default function BasicCard() {
  const classes = useStyles();
  return (
    <Box className={classes.aboutThisSiteContainer}>
      <h1 className={classes.mainTitle}>React Engineering</h1>
      <div className={classes.aboutThisSiteType}>
        Using ReactJS and Node I create single-page apps and components capable
        of monetization, data charting, api calls, user authentication and
        authorization, database and context management, and more.
      </div>
    </Box>
  );
}
