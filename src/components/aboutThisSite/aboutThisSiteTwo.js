import { useEffect, useRef } from "react";
import { Paper, Typography } from "@mui/material";
import {
  AnimationFreeFall,
  AnimationLookDown,
  AnimationManHanging,
} from "../../shared/SilhouetteBlocks/SilhouetteBlocks";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  aboutThisSiteTwoContainer: {
    width: "70%",
    marginLeft: "40px",
    marginTop: "40px",
  },
  salvation: {
    color: "white",
    padding: "10px",
  },
}));

const AboutThisSiteTwo = () => {
  const classes = useStyles();
  // const freefall = useRef();

  // useEffect(() => {
  //   const parallax = () => {
  //     if (freefall.current) {
  //       let scrolledValue = window.scrollY / 3.5;
  //       freefall.current.style.transform = `translateY(
  //     -${scrolledValue + "px"}
  //     )`;
  //       console.log("scrolling...", scrolledValue);
  //     }
  //   };
  //   window.addEventListener("scroll", parallax);
  //   return () => window.removeEventListener("scroll", parallax);
  // }, [freefall]);

  return (
    <Paper className={classes.aboutThisSiteTwoContainer}>
      <AnimationLookDown />
      <AnimationFreeFall />
      <Typography className={classes.salvation}>
        Code is salvation. Supercharging processes with tech is fun. Red pill,
        all day. Redux rocks. Teach script to kids. I got components for days.
        StackOverflow amazes me. I like them styled with Sass. More beeps and
        boops. Keep renders down. Make javascript your b****. Captain Archer is
        the best starship Captain - change my mind. Data, Data, Data. If google
        can’t answer your question, you’re asking the wrong one. Must learn more
        Python. "The jungian thing." It’s only logical. K. I. S. S. Dare to
        dream. Covid sucks. Dark mode 24/7. The Rock for President. Birds &
        squirrels, home runs & touchdowns. Thrive, don’t survive. I could have
        loved Cary Grant. Port in, zone out. Cable guys don’t know what a packet
        is. I scream love and punk rock at the sky. There are levels to this
        game.
      </Typography>
      {/* <AnimationManHanging /> */}
    </Paper>
  );
};

export default AboutThisSiteTwo;
