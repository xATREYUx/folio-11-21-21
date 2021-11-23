import React, { useState, useContext, useRef } from "react";
import { FormContainer } from "./contacts.styles";
import { appendErrors, useForm } from "react-hook-form";

import axios from "axios";
import domain from "../../util/domain";

import Captcha from "../form-elements/captcha";
import { Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    justifyContent: "left",
    padding: "1rem",
    marginLeft: "40px",
    marginTop: "2rem",
  },
  contactMeTitle: {
    fontFamily: "Bangers",
    // fontSize: "rem",
    letterSpacing: ".2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  textField: {},
  input: {
    // ...theme.input,
    backgroundColor: "white",
  },
  captchaContainer: {
    width: "40%",
  },
}));

const ContactUs = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState();
  const recaptchaRef = useRef();
  // const { sendRequest } = useHttpClient();
  const [resetComponent, setResetComponent] = useState(false);

  const resetForm = () => setResetComponent(!resetComponent);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    useFormContext,
  } = useForm();

  const submitContact = async (data) => {
    console.log("send data", data);
    var formData = new FormData();
    const values = getValues();
    console.log("values log", values);
    try {
      const dataFunction = async () => {
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("message", values.message);
      };
      await dataFunction();
      const config = {
        headers: {
          Authorization: "Bearer " + captcha.token,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios
        .post(`${domain}/contacts`, formData, config)
        .then((res) => console.log("submitContact axios res", res))
        .catch((err) => console.log("submitContact axios err", err));
      reset();
      recaptchaRef.current.reset();
    } catch (err) {
      console.log("submitContact error", err);
    }
  };

  return (
    // <Paper id="form-container">
    <Paper
      position="relative"
      className={classes.formContainer}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(submitContact)}
    >
      {/* <form className="new-contact-form" onSubmit={submitContact}> */}
      <h2 className={classes.contactMeTitle}>Contact Me</h2>
      <TextField
        className={classes.textField}
        label="Name"
        variant="outlined"
        placeholder="Name"
        name="name"
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          className: classes.input,
        }}
        {...register("name")}
      />
      <br />
      <TextField
        className={classes.textField}
        label="Email"
        variant="outlined"
        placeholder="Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          className: classes.input,
        }}
        {...register("email")}
      />
      <br />
      <TextField
        type="textarea"
        placeholder="Message"
        fullWidth
        rows="10"
        multiline
        label="Message"
        name="message"
        {...register("message")}
        onChange={(e) => setMessage(e.target.value)}
        InputProps={{
          className: classes.input,
        }}
      />
      <br />
      <div className={classes.captchaContainer}>
        <Captcha setCaptcha={setCaptcha} recaptchaRef={recaptchaRef} />
      </div>
      {appendErrors.password && <p>{appendErrors.password.message}</p>}
      <br />
      <Button color="success" variant="contained" type="submit">
        Send
      </Button>
      {/* </form> */}
    </Paper>
    // </Paper>
  );
};

export default ContactUs;
