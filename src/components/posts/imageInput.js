import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";

const ImageInput = ({ name, reset, defaultImage }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [defImage, setDefImage] = useState(defaultImage);

  const classes = useStyles();
  const inputRef = useRef();

  const { register } = useFormContext();
  const { control } = useForm();

  useEffect(() => {
    setSelectedImage();
  }, [reset]);

  const pickImageHandler = async () => {
    inputRef.current?.click();
  };
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  const imageChange = (e) => {
    setDefImage();
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      console.log("e.target.files[0]", e.target.files);
    }
  };

  const { ref, ...fields } = register(`${name}`, {
    onChange: (e) => {
      imageChange(e);
    },
  });

  return (
    <Box className={classes.inputContainer}>
      <div className={classes.previewContainer}>
        <Controller
          control={control}
          render={() => (
            <input
              type="file"
              accept=".jpg,.png,.jpeg"
              style={{ display: "none" }}
              {...fields}
              ref={(instance) => {
                ref(instance); // RHF wants a reference to this input
                inputRef.current = instance; // We also need it to manipulate the elemnent
              }}
            />
          )}
        />
        <div className={classes.previewContainer}>
          {!selectedImage && !defImage ? <p>Pick an image.</p> : null}
          {defImage && (
            <img className={classes.previewImage} src={defaultImage} />
          )}
          {selectedImage && !defImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Thumb"
              className={classes.previewImage}
            />
          ) : null}
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          className={classes.pickImageButton}
          onClick={pickImageHandler}
        >
          +
        </Button>
      </div>
    </Box>
  );
};

export default ImageInput;

const useStyles = makeStyles({
  inputContainer: {
    position: "relative",
    // display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // margin: "3px",
    height: "100%",
  },
  previewContainer: {
    display: "flex",
    position: "relative",
    // border: "1px solid #C4C4C4",
    borderRadius: "4px",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    // borderRadius: "4px",
  },
  pickImageButton: {
    minWidth: "0 !important",
    width: "40px",
    height: "40px",
    borderRadius: "50px !important",
    top: "-20px",
  },
});
