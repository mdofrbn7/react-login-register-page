import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginPage from "./layouts/Login_Register_Admin/LoginPage";
import RegisterPage from "./layouts/Login_Register_Admin/RegisterPage";
import HomePage from "./layouts/Dashboard/HomePage";
import ErrorNotFound from "./components/ErrorNotFound";
import AdminInfo from "./layouts/Login_Register_Admin/AdminInfo";
import ShowMessagesLog from "./layouts/Dashboard/ShowMessagesLog";
import EditPage from "./layouts/Dashboard/EditPage";
import { SearchContext } from "./components/SearchContext";

import {
  ADD_ACC_PAGE,
  ADMIN_PAGE,
  BRANCHS,
  EDIT_PAGE,
  ERROR_PAGE,
  HOME_DASHBOARD,
  KEYS_PAGE,
  LOGIN_PAGE,
  LOG_PAGE,
} from "./CONSTANTS/ROUTE_CONSTANTS";
import NavBar from "./components/NavBar";
import keys from "./layouts/Dashboard/keys";
import DefaultRoutes from "./DefaultRoutes";

import "./App.css";
import AllBranch from "./layouts/Dashboard/AllBranch";
import { localStorage_USER_KEY } from "./CONSTANTS/API_URI";

export default function App() {
  // const dummy = {
  //     id:0,
  //     username:"",
  //     password:""
  // }

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(dummy)

  function checkIfLoggedIn(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      setIsLoggedIn(false);
      localStorage.removeItem(key);
      // return null
    } else {
      setIsLoggedIn(true);
      // setUser(JSON.parse(item.value))
    }
    // console.log(JSON.parse(item.value))
    // return JSON.parse(item.value)
  }

  useEffect(() => {
    checkIfLoggedIn(localStorage_USER_KEY);
    //     console.log("consoling.. ")
    //   console.log(checkIfLoggedIn(localStorage_USER_KEY))
    //   setUser(JSON.parse(JSON.parse(localStorage.getItem(localStorage_USER_KEY)).value))

    //   console.log(JSON.parse(JSON.parse(localStorage.getItem(localStorage_USER_KEY)).value))
    // return(()=>{
    //     setUser(dummy)
    // })
  }, []);

  if (isLoggedIn) {
    return (
      <>
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
          <Router>
            <NavBar />
            <Switch>
              <Route exact path={HOME_DASHBOARD} component={HomePage} />
              <Route path={BRANCHS} component={AllBranch} />
              <Route path={ADD_ACC_PAGE} component={AdminInfo} />
              <Route path={EDIT_PAGE} component={EditPage} />
              <Route path={KEYS_PAGE} component={keys} />
              <Route path={LOG_PAGE} component={ShowMessagesLog} />
              <Route path={ADMIN_PAGE} component={RegisterPage} />
              {/* <Route path={LOGIN_PAGE} component={ LoginPage } /> */}
              <Route path={ERROR_PAGE} component={ErrorNotFound} />
            </Switch>
            <Footer />
          </Router>
        </SearchContext.Provider>
      </>
    );
  } else {
    return (
      <>
        <Router>
          <Switch>
            {/* <Route exact path={HOME_DASHBOARD} component={ HomePage } />
                        <Route path={BRANCHS} component={ AllBranch } />
                        <Route path={ADD_ACC_PAGE} component={ RegisterPage } />
                        <Route path={EDIT_PAGE} component={ EditPage } />
                        <Route path={KEYS_PAGE} component={ keys } />
                        <Route path={LOG_PAGE} component={ ShowMessagesLog } />
                        <Route path={ADMIN_PAGE} component={ AdminInfo } /> */}
            <Route exact path={LOGIN_PAGE} component={LoginPage} />
            <Route path={ERROR_PAGE} component={ErrorNotFound} />
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

const Footer = () => {
  return (
    <p className="footer_style" style={FooterStyle}>
      Designed & coded by{" "}
      <a
        href="https://www.github.com/mdofrbn7"
        target="_blank"
        rel="noopener noreferrer"
      >
        Mohammad Omar Faruk
      </a>{" "}
      | Copyright © 2023, Southeast Bank Limited.
    </p>
  );
};

const FooterStyle = {
  marginTop: "2px",
  background: "#000",
  fontSize: ".7rem",
  color: "#fff",
  textDecoration: "none",
  position: "absolute",
  bottom: 0,
  padding: "0px",
  margin: 0,
  width: "100%",
  opacity: ".8",
};
