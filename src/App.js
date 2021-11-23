import "./App.css";
import axios from "axios";
import domain from "./util/domain";

//initialize app
import firebaseConfig from "./firebase/config";

import Router from "./routing/Router";
import Layout from "./components/layout";
import HomePage from "./pages/homePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthContextProvider } from "./components/auth/authContext";
import { PostContextProvider } from "./components/posts/postContext";

require("dotenv").config();

const theme = createTheme({
  palette: {
    primary: { 500: "#E85B25" },
  },
  typography: {
    h1: {
      fontFamily: "Bangers",
    },
    h3: {
      fontFamily: "Bangers",
      letterSpacing: 1.4,
    },
    subtitle1: {
      fontFamily: "Cuprum",
      fontSize: "1rem",
      fontWeight: 500,
    },
    body: {
      fontFamily: "Cuprum",
      fontSize: "1.5rem",
      fontWeight: 400,
      background: "white",
    },
    blogPost: {
      overflowX: "auto",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      fontFamily: "Cuprum",
      fontSize: "1.5rem",
      fontWeight: 400,
      background: "white",
    },
    // input: {
    //   backgroundColor: "white",
    // },
  },
});

console.log("ENV: ", process.env.NODE_ENV);
const serverCheck = async () => {
  const serverConnected = await axios.get(`${domain}/auth`);
  console.log("Server Connected: ", serverConnected);
};
serverCheck();

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Router />
          </Layout>
        </ThemeProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
