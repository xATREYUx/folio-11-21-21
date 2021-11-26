import React, { useState } from "react";
// import { PostPageContainer } from "./post-page-styles";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import Linkify from "react-linkify";
import { Box, display } from "@mui/system";
import world from "../shared/images/logo.svg";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Hidden, Paper, Typography } from "@mui/material";
import editPostPage from "./editPostPage";
import EditPostPage from "./editPostPage";

const useStyles = makeStyles((theme) => ({
  imageSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-evenly",
    padding: "40px",
  },
  imageContainer: {
    width: "300px",
    height: "210px",
    border: "4px solid #E85B25",
    overflow: "hidden",
    borderRadius: "10px",
  },
  postImage: {
    // display: "block",
    width: "100%",
    height: "100%",
    // border: "3px solid #E85B25",
    // borderRadius: "10px",
    // overflow: "hidden",
  },
  detailsContainer: {
    padding: "40px",
    margin: "40px",
    textAlign: "justify",
  },
  postContent: {
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  worldFooter: {
    height: "5rem",
    position: "absolute",
  },
}));

const PostPage = (props) => {
  const navigate = useNavigate();
  const postDetails = useLocation().state;
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);

  console.log("PostPage props", postDetails);
  return (
    <div>
      {!editMode ? (
        <Box>
          <Grid container align="center" spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.imageContainer}>
                <img
                  className={classes.postImage}
                  src={postDetails.postURLs[0]}
                  alt="Youre probably not online"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.imageContainer}>
                <img
                  className={classes.postImage}
                  src={postDetails.postURLs[1]}
                />
              </Paper>
            </Grid>
          </Grid>
          <Button
            color="success"
            variant="contained"
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
          <Paper className={classes.detailsContainer}>
            <Typography variant="h3">{postDetails.title}</Typography>
            <br />
            <Typography variant="blogPost">{postDetails.caption}</Typography>
            <br />
            <Linkify>
              <Typography variant="blogPost">{postDetails.content}</Typography>
            </Linkify>
            <div className={classes.logoContainer}>
              <img src={world} alt="logo" className={classes.worldFooter} />
            </div>
          </Paper>
        </Box>
      ) : (
        <EditPostPage setEditMode={setEditMode} />
      )}
    </div>
  );
};

export default PostPage;
