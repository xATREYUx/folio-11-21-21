import React, { useRef, useEffect } from "react";

import PersonDown from "../images/personDown@3x.png";
import FreeFall from "../images/freefall.svg";
import CoupleSitting from "../images/girlAndBoy.svg";
import ManHanging from "../images/hangingman.png";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  animationLookdownContainer: {
    position: "relative",
    width: "100%",
  },
  personDown: {
    position: "absolute",
    top: "-48px",
    left: "-15px",
    height: "50px",
  },
  animationFreeFallContainer: {
    // backgroundColor: "red",
    position: "relative",
    width: "100%",
    zindex: "2",
    height: "10px",
    top: "160px",
  },
  personFalling: {
    position: "absolute",
    height: "30px",
    // transform: "scaleX(-1)",
    left: "-120px",
    // top: "0px",
  },
}));

export const AnimationLookDown = () => {
  const classes = useStyles();

  return (
    <div className={classes.animationLookdownContainer}>
      <img src={PersonDown} alt="person down" className={classes.personDown} />
    </div>
  );
};

export const AnimationFreeFall = () => {
  const classes = useStyles();
  const freefall = useRef();

  useEffect(() => {
    const parallax = () => {
      if (freefall.current) {
        let scrolledValue = window.scrollY / 4.5;
        freefall.current.style.transform = `translateY(
      ${scrolledValue + "px"} 
      )`;
        // console.log("scrolling...", scrolledValue);
        // console.log("start location", startlocation);
      }
    };
    window.addEventListener("scroll", parallax);
    return () => window.removeEventListener("scroll", parallax);
  }, [freefall]);
  return (
    <div className={classes.animationFreeFallContainer}>
      <img
        ref={freefall}
        src={FreeFall}
        alt="person-falling"
        className={classes.personFalling}
      />
    </div>
  );
};

export const AnimationCoupleSitting = () => {
  return (
    <div>
      <img src={CoupleSitting} alt="couple-sitting" />
    </div>
  );
};

export const AnimationManHanging = () => {
  const classes = useStyles();
  return (
    <div>
      <img src={ManHanging} alt="man-hanging" className={classes.manHanging} />
    </div>
  );
};

// export const AnimationLookDown = () => {
//   return (
//     <AnimationLookDownContainer>
//       <img src={PersonDown} alt="person down" />
//     </AnimationLookDownContainer>
//   );
// };

// export const AnimationFreeFall = () => {
//   return (
//     <AnimationFreeFallContainer>
//       <img src={FreeFall} alt="person-fallng" />
//     </AnimationFreeFallContainer>
//   );
// };

// export const AnimationCoupleSitting = () => {
//   return (
//     <AnimationCoupleSittingContainer>
//       <img src={CoupleSitting} alt="couple-sitting" />
//     </AnimationCoupleSittingContainer>
//   );
// };
