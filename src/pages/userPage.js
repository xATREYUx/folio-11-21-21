import React, { useContext, useEffect, useState } from "react";
// import { Column } from "../shared/shared.styles";
// import { UserPageContainer } from "./user-page-styles";
import { Grid, Paper } from "@mui/material";
import PostForm from "../components/posts/postForm";
import PostList from "../components/posts/postList";
import PostContext from "../components/posts/postContext";
import AuthContext from "../components/auth/authContext";
// import EnterUserAdmin from "../components/admin/MakeUserAdmin";
import { makeStyles } from "@mui/styles";

import { getAuth } from "firebase/auth";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  userPageBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  userName: {
    ...theme.typography.h3,
    alignItems: "center",
  },
}));

const UserPage = () => {
  const { getUsersPosts, usersPosts } = useContext(PostContext);
  const { getLoggedIn, loggedIn, CheckAdmin } = useContext(AuthContext);
  const [editPostData, setEditPostData] = useState("");
  const [resetForm, setResetForm] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    getUsersPosts();
  }, []);

  console.log("UserPage: ", loggedIn);
  return (
    <div className={classes.userPageBox}>
      <h3 className={classes.userName}>{loggedIn.user.email}</h3>
      <Grid container>
        <Grid item align="center" xs={12} sm={12} md={6}>
          {/* <div>{loggedIn.user.email}</div> */}
          <PostList title={""} posts={usersPosts} dataLimit={6} pageLimit={4} />
        </Grid>
        <Grid item item xs={12} md={6}>
          <PostForm
            editPostData={editPostData}
            setEditPostData={setEditPostData}
          />
          {/* <div>
            <CheckAdmin />
          </div> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default UserPage;
