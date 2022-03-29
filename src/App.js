//Basic dependencies
import React, { useState, useEffect } from "react";
//import CssBaseline from "@material-ui/core/CssBaseline";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";

import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Authenticated from "./components/Authenticated/Authenticated.jsx";

//Styling
import "./App.css";

import routes from "./utilities/routes/routes.jsx";
import UnAuthenticated from "./components/UnAuthenticated/UnAuthenticated.jsx";
import { getUserSessionAction } from "./redux/user/userActions.js";

import Navbar from "./components/Navbar/Navbar.jsx";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*": {
      scrollbarWidth: "thin",
      scrollbarColor: "#B7B7B7 transparent",
      "&::-webkit-scrollbar": {
        width: 8,
        height: 6,
        backgroundColor: "transparent",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: 6,
        backgroundColor: "#B7B7B7",
        minHeight: 24,
        minWidth: 24,
      },
      "&::-webkit-scrollbar-thumb:focus": {
        backgroundColor: "#adadad",
      },
      "&::-webkit-scrollbar-thumb:active": {
        backgroundColor: "#adadad",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#adadad",
      },
      "&::-webkit-scrollbar-corner": {
        backgroundColor: "transparent",
      },
    },
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#008B8B",
      light: "#00b3b3",
      dark: "#006666",
      // dark: "#001d3e",
    },
    secondary: {
      main: "#00cccc",
      light: "#00b3b3",
      dark: "#006666",
    },
    // button: {
    //   main: "#1d4369",
    //   hover: "#4D8AC9",
    // },
    success: {
      main: "#4caf50",
      secondary: "#3e8e41",
    },
    error: {
      main: "#f44336",
      secondary: "#c2160a",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2160,
      xxxl: 3840,
    },
  },
});

const App = () => {
  const styles = useStyles();

  const dispatch = useDispatch();
  //const isAuthenticated = useSelector((state) => state.User.authenticated);

  useEffect(() => {
    dispatch(getUserSessionAction());
  }, [dispatch]);

  const routeComponents = routes.map(({ path, component }, key) => (
    <Route path={path} exact element={component} key={key} />
  ));

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <UnAuthenticated>
          <LandingPage />
        </UnAuthenticated>
        <Authenticated>
          <Router>
            <Navbar>
              <Routes>
                <Route>{routeComponents}</Route>
              </Routes>
            </Navbar>
          </Router>
        </Authenticated>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
