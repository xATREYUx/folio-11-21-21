import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import domain from "../../util/domain";
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// import EnterUserAdmin from "../../components/admin/MakeUserAdmin";

// import EnterUserAdmin from "../components/adminComponents/MakeUserAdmin";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();

  //checks if user is logged in
  const getLoggedIn = async () => {
    try {
      setIsLoading(true);
      console.log("getLoggedIn Initiated", localStorage.getItem("token"));
      const validatedUser = await axios.get(`${domain}/auth/loggedIn`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      });
      const userData = validatedUser.data;
      console.log("AuthContextProvider validatedUser", userData);
      // console.log("Is User Logged In?: ", loggedIn);
      setLoggedIn(userData);
      // if (validatedUser) {
      //   firebase.auth().onAuthStateChanged((user) => {
      //     user
      //       .getIdTokenResult()
      //       .then((idTokenResult) => {
      //         validatedUser.user.claims = idTokenResult.claims;
      //         setLoggedIn(validatedUser);
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //       });
      //   });
      // }
      setIsLoading(false);
    } catch (e) {
      console.log("Logout error", e);
    }
  };

  //creates a user
  const createUser = async ({ email, password, passwordVerify }) => {
    console.log("New User Creation Initiated", props);
    try {
      //create user and get token response
      let fbToken = { token: null };
      const createUserRes = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential accessToken", createUserRes.user.accessToken);
      fbToken = { fbToken: createUserRes.user.accessToken };
      console.log("fbToken console.log", fbToken);
      const createResponse = await axios.post(`${domain}/auth/create`, fbToken);
      console.log(
        "Created User. Checking authentication...",
        JSON.stringify(createResponse)
      );
      localStorage.setItem("token", createResponse.data.token);
    } catch (err) {
      console.log("New User Creation Error: ", err);
    }
  };

  //logs in user
  const loginUser = async ({ email, password }) => {
    //Sign In user and get token response
    try {
      let fbToken = { token: null };
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      fbToken = { token: user.accessToken };
      const loginResponse = await axios.post(`${domain}/auth/login`, fbToken);
      if (loginResponse.data.token) {
        console.log(loginResponse);
        setLoggedIn(false);
      } else {
        localStorage.setItem("token", loginResponse.data.token);
        return "Login successfull";
      }
    } catch (err) {
      console.log(err.code);
      console.log(err.message);
      console.log(err);
      return err.code;
    }
  };

  const logout = async () => {
    console.log("Logout Initiated");
    try {
      await auth.signOut();
      await axios.post(`${domain}/auth/logout`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      });
      localStorage.setItem("token", null);
      setLoggedIn(null);
      // signed out
    } catch (e) {
      console.log("Logout error", e);
    }
  };

  const CheckAdmin = () => {
    const [admin, setAdmin] = useState(false);
    // return <div style={{ fontSize: "45px" }}>Admin Section</div>;
    auth.onAuthStateChanged((user) => {
      user
        .getIdTokenResult()
        .then((idTokenResult) => {
          if (!!idTokenResult.claims.admin) {
            setAdmin(true);
            console.log("I'm an Admin!");
          } else {
            console.log("Not an Admin");
            return null;
          }
        })
        .catch((error) => {
          console.log("idTokenResult.claims.admin", error);
        });
    });

    return (
      <div>
        {/* <div>{idTokenResult.claims.admin}</div> */}
        {/* {true && <EnterUserAdmin />} */}
      </div>
    );
  };

  useEffect(() => {
    console.log("Initiate authContext");
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        createUser,
        loginUser,
        loggedIn,
        getLoggedIn,
        logout,
        CheckAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

export { AuthContextProvider };
