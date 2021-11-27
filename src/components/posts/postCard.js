import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../auth/authContext";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: "250px",
    height: "250px",

    [theme.breakpoints.down("sm")]: {
      width: "350px",
      height: "350px",
    },
    // [theme.breakpoints.down("lg")]: {
    //   width: "350px",
    //   height: "350px",
    // },
  },
  cardMedia: {
    width: "100%",
    // [theme.breakpoints.down("sm")]: {
    height: "70%",
    // },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "30%",
    // justifyContent: "center",
    padding: "0px !important",
    justifyContent: "center",
    // textAlign: "justify",
  },
  cardTitle: {
    ...theme.typography.h1,
    fontSize: "1rem",
  },
  cardCaption: {
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
    lineHeight: "1.2 !important",
    // alignItems: "center",
  },
}));

const PostCard = ({ post }) => {
  const classes = useStyles();
  console.log("PostListCard Initiated: ", post);
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  console.log("post.hiddenTitleFontSize: ", post.hiddenTitleFontSize);

  return (
    <Card
      key={post.id}
      className={classes.cardContainer}
      onClick={() => {
        console.log("post clicked!!");
        navigate(`/post/${post.id}`, { state: post });
      }}
    >
      <CardActionArea style={{ height: "100%" }}>
        <CardMedia
          className={classes.cardMedia}
          component="img"
          image={post.cardImage}
          alt="You're probably not online"
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant="h1"
            // gutterBottom
            align="center"
            className={classes.cardTitle}
            style={
              post.hiddenTitleFontSize
                ? { fontSize: post.hiddenTitleFontSize + "rem" }
                : { fontSize: "2rem" }
            }
          >
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.cardCaption}
          >
            {post.caption}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default PostCard;
