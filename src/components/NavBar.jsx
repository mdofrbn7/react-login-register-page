import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  ADD_ACC_PAGE,
  ADMIN_PAGE,
  BRANCHS,
  EDIT_PAGE,
  HOME_DASHBOARD,
  KEYS_PAGE,
  LOGIN_PAGE,
  LOG_PAGE,
} from "../CONSTANTS/ROUTE_CONSTANTS";
import { localStorage_USER_KEY } from "../CONSTANTS/API_URI";
import { SearchContext } from "./SearchContext";
function NavBar() {
  const dummy = {
    id: 0,
    username: "",
    password: "",
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(dummy);

  function checkIfLoggedIn(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      setIsLoggedIn(false);
      localStorage.removeItem(key);
      return null;
    } else {
      setIsLoggedIn(true);
      setUser(JSON.parse(item.value));
    }
    console.log(JSON.parse(item.value));
    return JSON.parse(item.value);
  }

  useEffect(() => {
    checkIfLoggedIn(localStorage_USER_KEY);
    //     console.log("consoling.. ")
    //   console.log(checkIfLoggedIn(localStorage_USER_KEY))
    setUser(
      JSON.parse(JSON.parse(localStorage.getItem(localStorage_USER_KEY)).value)
    );

    //   console.log(JSON.parse(JSON.parse(localStorage.getItem(localStorage_USER_KEY)).value))
    return () => {
      setUser(dummy);
    };
  }, []);

  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // const dummy = {
  //       id:0,
  //       username:"",
  //       password:""
  //   }
  // const [user, setUser] = useState()

  // useEffect(() => {
  //   const itemStr = localStorage.getItem(localStorage_USER_KEY)
  //     const item = JSON.parse(itemStr)
  //     const now = new Date()
  //     if (now.getTime() > item.expiry) {
  //         localStorage.removeItem(localStorage_USER_KEY)

  //     }
  //     else{

  //         setUser(item.value)
  //     }
  //     setUser(item.value)
  //     console.log(item)
  // })

  //     useEffect(() => {

  //   //   console.log(checkIfLoggedIn(localStorage_USER_KEY))
  //     setUser(JSON.parse(JSON.parse(localStorage.getItem(localStorage_USER_KEY)).value))

  //   //   console.log(JSON.parse(JSON.parse(localStorage.getItem(localStorage_USER_KEY)).value))
  //   return(()=>{
  //       setUser(dummy)
  //   })

  // },[])

  const { id, username, email } = user;
  return (
    <div className="nav_main">
      {/* {console.log("from nvabar.. user")}
        {console.log(user)} */}
      <div className="heading">
        <h5>Branch manager</h5>
        {/* <hr/> */}
      </div>

      <div className="sidebar">
        <div className="dashboard-menu">
          {/* <h3>DashBoard</h3> */}
          <ul>
            <li>
              <NavLink
                exact={true}
                to={{
                  pathname: HOME_DASHBOARD,
                  state: { user: user },
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: BRANCHS,
                  state: { user: user },
                }}
              >
                Branches
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: LOG_PAGE,
                  state: { user: user },
                }}
              >
                SMS Log
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: KEYS_PAGE,
                  state: { user: user },
                }}
              >
                Keywords
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: EDIT_PAGE,
                  state: { user: user, isAddBranch: true },
                }}
              >
                Add Data
              </NavLink>
            </li>
            <li>
              <NavLink to={{ pathname: ADMIN_PAGE, state: { user: user } }}>
                Admin
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: ADD_ACC_PAGE,
                  state: { user: user },
                }}
              >
                Add Admin
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="search">
          <input
            type="text"
            name="search"
            className="search_input"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="logout_button">
          <a
            href={LOGIN_PAGE}
            onClick={() => {
              localStorage.removeItem(localStorage_USER_KEY);
            }}
          >
            Log out
            {/* @{username} */}
          </a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
