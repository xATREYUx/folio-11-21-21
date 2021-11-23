import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

// import Button from "./button";
import { ImageUploadContainer } from "./form-elements-style";
const useStyles = makeStyles({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "3px",
  },
  previewContainer: {
    display: "flex",
    position: "relative",
    border: "1px solid #C4C4C4",
    borderRadius: "4px",
    width: "250px",
    height: "175px",
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: "250px",
    height: "175px",
    borderRadius: "4px",
  },
  pickImageButton: {
    minWidth: "0 !important",
    width: "40px",
    height: "40px",
    borderRadius: "50px !important",
    top: "-20px",
  },
});

const ImageUpload = (props) => {
  const classes = useStyles();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const setImage = props.setImage;
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      if (props.previewImage) {
        console.log("Edit Mode");
        setPreviewUrl(props.previewImage);
      } else {
        console.log("file not loaded");
        return;
      }
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file, props.previewImage]);

  // useEffect(() => {
  //   // filePickerRef.current.value = "";
  //   // setPreviewUrl("");
  // }, [props.resetImage]);

  const pickedHandler = (event) => {
    console.log("pickedHandler", event.target);
    let pickedFile = "";
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    setImage(pickedFile);
    // props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <Box className={classes.inputContainer}>
      {/* <div>{filePickerRef?.current?.value}</div> */}
      <div className={classes.previewContainer}>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className={classes.previewImage}
          />
        )}
        {!previewUrl && <p>Pick an image.</p>}
        <input
          // id={props.id}
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        {/* {!isValid && <p>{props.errorText}</p>} */}
      </div>
      <Button
        variant="contained"
        className={classes.pickImageButton}
        onClick={pickImageHandler}
      >
        +
      </Button>
    </Box>
  );
};

export default ImageUpload;
