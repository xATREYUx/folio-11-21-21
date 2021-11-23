import React, { useState } from "react";
import domain from "../../util/domain";

import axios from "axios";
import Cookies from "js-cookie";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const createUser = async (props) => {
  console.log("New User Creation Initiated", props);
  const { email, password, passwordVerify } = props;
  let userObject = { tokenId: null };

  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("userCredential function", userCredential.user);
        userObject = { tokenId: userCredential.user.accessToken };
      })
      .catch((err) => {
        console.log("createUser Error", err);
      });
    return axios
      .post(`${domain}/auth/create`, userObject, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("createUser res: ", res);
      });
  } catch (err) {
    console.log("New User Creation Error: ", err);
  }
};

export const loginUser = async (props) => {
  console.log("Login Initiated", props);

  const { email, password } = props;
  let userObject = { tokenId: null };

  try {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log("user: ", user);
        user
          .getIdToken()
          .then((tokenId) => {
            userObject = { tokenId: tokenId };
          })
          .catch((err) => {
            console.log("login error: ", err);
          });
      })
      .catch((err) => {
        console.log("login error 2: ", err);
        document.getElementById("error").innerHTML = err.message;
        return;
      });
    return axios.post(`${domain}/auth`, userObject);
  } catch (err) {
    console.log(err);
  }
};
