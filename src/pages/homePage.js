import React, { useEffect, useContext, useRef } from "react";

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ReactComponent as BlobTop } from "../shared/images/blobTop.svg";
import world from "../shared/images/logo.svg";
import blobTop from "../shared/images/blobTop.svg";
import { ReactComponent as BubbleBlobs } from "../shared/images/bubbleBlobs.svg";
// import PostList from "../components/posts/postList";
import {
  AnimationLookDown,
  AnimationFreeFall,
  AnimationCoupleSitting,
} from "../shared/SilhouetteBlocks/SilhouetteBlocks";
// import personDown from "../shared/images/personDown@3x.png";
// import freeFall from "../shared/images/freefall.svg";
import coupleSitting from "../shared/images/girlAndBoy.svg";
import AboutThisSite from "../components/aboutThisSite/AboutThisSite";
import { Box } from "@mui/system";
import AuthContext from "../components/auth/authContext";
import PostList from "../components/posts/postList";
import PostContext from "../components/posts/postContext";
import AboutThisSiteTwo from "../components/aboutThisSite/aboutThisSiteTwo";
import LetsBuild from "../components/letsBuild";
import ContactUs from "../components/contacts/NewContactForm";
// import { AnimationFreeFall } from "../shared/SilhouetteBlocks/SilhouetteBlocks";

const useStyles = makeStyles((theme) => ({
  sectionOne: {
    display: "flex",
    flexDirection: "column",
    height: "85vh",
    alignItems: "center",
    justifyContent: "center",
  },
  world: {
    height: "30vw",
    maxWidth: "250px",
    // transform: "translatey(-30px)",
    /* margin: 40px; */
    /* margin-top: 60px; */
  },
  sectionTwo: {
    backgroundImage: `url(${blobTop})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundWidth: "100%",
    paddingBottom: "66.64%",
  },
  coupleSitting: {
    height: "4rem",
    left: "35%",
    top: "-35px",
    // display: "flex",
    position: "relative",
  },
  bubbleBlobs: {
    zIndex: "-2",
    position: "absolute",
    width: "40%",
    height: "60vh",
    bottom: "-1400px",
  },
}));

const HomePage = () => {
  const { loggedIn } = useContext(AuthContext);
  const { posts } = useContext(PostContext);
  const bubblesRef = useRef();

  console.log("HomePage loggedIn", loggedIn);
  const classes = useStyles();

  useEffect(() => {
    const parallax = () => {
      if (bubblesRef.current) {
        let scrolledValue = window.scrollY / 3.5;
        bubblesRef.current.style.transform = `translateY(
      -${scrolledValue + "px"} 
      )`;
      }
    };
    window.addEventListener("scroll", parallax);
    return () => window.removeEventListener("scroll", parallax);
  }, [bubblesRef]);

  return (
    <Box>
      <div className={classes.sectionOne}>
        <img src={world} className={classes.world} />
        <LetsBuild className={classes.letsBuild} />
      </div>
      <div className={classes.sectionTwo}>
        <img
          src={coupleSitting}
          alt="coupleSitting"
          className={classes.coupleSitting}
        />
        <Grid container>
          <Grid item item xs={12} md={7}>
            <AboutThisSite />
            <PostList posts={posts} dataLimit={4} pageLimit={4} title="" />
          </Grid>
          <Grid item align="center" xs={12} md={5}>
            <AboutThisSiteTwo />
            <ContactUs />
          </Grid>
        </Grid>
        <BubbleBlobs className={classes.bubbleBlobs} ref={bubblesRef} />
      </div>
    </Box>
  );
};

export default HomePage;
