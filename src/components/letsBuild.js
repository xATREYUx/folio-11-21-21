import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  letsBuild: {
    justifyContent: "center",
    fontFamily: "Cuprum",
  },
});

const LetsBuild = () => {
  const [subTitle, setSubtitle] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const classes = useStyles();

  const text = "LET'S BUILD.";
  useEffect(() => {
    const type = () => {
      if (textIndex < text.length) {
        setTimeout(() => setSubtitle(subTitle + text.charAt(textIndex)), 100);
        setTextIndex(textIndex + 1);
      }
    };
    type();
  }, [subTitle]);

  return <h1 className={classes.letsBuild}>{subTitle}</h1>;
};

export default LetsBuild;
