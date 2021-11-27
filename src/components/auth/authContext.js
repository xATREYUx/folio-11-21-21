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
      console.log("getLoggedIn Initiated");
      const validatedUser = await axios.get(`${domain}/auth/loggedIn`);
      const userData = validatedUser.data;
      // console.log("AuthContextProvider validatedUser", validatedUser.data);
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
      await createUserWithEmailAndPassword(auth, email, password)
        .then((createUserRes) => {
          let fbToken = { token: null };
          console.log(
            "userCredential accessToken",
            createUserRes.user.accessToken
          );
          fbToken = { token: createUserRes.user.accessToken };
          return fbToken;
        })
        .then((fbToken) => {
          console.log("fbToken console.log", fbToken);
          return axios.post(`${domain}/auth/create`, fbToken, {
            withCredentials: true,
          });
        })
        .then((res) => {
          console.log("Created User. Checking authentication...");
          // getLoggedIn();
          // setLoggedIn(res);
        });
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
      await axios.post(`${domain}/auth/login`, fbToken, {
        withCredentials: true,
      });
      return "Login successfull";

      // .then(({ user }) => {
      //     console.log("user: ", user);
      //     user
      //       .getIdToken()
      //       .then((tokenId) => {
      //         fbToken = tokenId;
      //       })
      //       .catch((err) => {
      //         console.log("login error: ", err);
      //       });
      //   })
      //   .catch((err) => {
      //     console.log("login error 2: ", err);
      //     document.getElementById("error").innerHTML = err.message;
      //     return;
      //   });

      // //Take token and use to set browser cookie
      // await axios.post(`${domain}/auth/login`, fbToken);
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
      await axios.post(`${domain}/auth/logout`, "", { withCredentials: true });
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
