import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const FileInput = ({ name }) => {
  const [selectedImage, setSelectedImage] = useState();
  const { control } = useForm();

  const imageChange = (e) => {
    console.log("imageChange onChange triggered");
    console.log("e.target.files[0]", e.target.files[0]);

    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      console.log("e.target.files[0]", e.target.files[0]);
    }
  };

  return (
    <Controller
      control={control}
      // name="fileInput"
      render={({ name }) => (
        <input
          type="file"
          accept=".jpg,.png,.jpeg"
          // style={{ display: "none" }}
          onChange={imageChange}
          // ref={register}
        />
      )}
    />
  );
};
export default FileInput;
