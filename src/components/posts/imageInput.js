import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";

const ImageInput = ({ name, reset }) => {
  const [selectedImage, setSelectedImage] = useState();
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
        {/* <input
          type="file"
          accept=".jpg,.png,.jpeg"
          style={{ display: "none" }}
          {...fields}
          ref={(instance) => {
            ref(instance); // RHF wants a reference to this input
            inputRef.current = instance; // We also need it to manipulate the elemnent
          }}
          // onChange={imageChange}
        /> */}
        {!selectedImage && <p>Pick an image.</p>}
        {selectedImage && (
          <div className={classes.previewContainer}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Thumb"
              className={classes.previewImage}
            />
            {/* <button onClick={removeSelectedImage} style={styles.delete}>
              Remove This Image
            </button> */}
          </div>
        )}
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

export default ImageInput;

// // Just some styles
// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: 50,
//   },
//   preview: {
//     marginTop: 50,
//     display: "flex",
//     flexDirection: "column",
//   },
//   image: { maxWidth: "100%", maxHeight: 320 },
//   delete: {
//     cursor: "pointer",
//     padding: 15,
//     background: "red",
//     color: "white",
//     border: "none",
//   },
// };

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
