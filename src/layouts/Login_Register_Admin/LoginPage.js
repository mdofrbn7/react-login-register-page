import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../../App.css";
import { Button } from "react-bootstrap";
import API_URI, {
  API_GET_SINGLE_USER_DATA,
  localStorage_EXPIRE_TIME,
  localStorage_USER_KEY,
} from "../../CONSTANTS/API_URI";
import { HOME_DASHBOARD } from "../../CONSTANTS/ROUTE_CONSTANTS";

export default function SignInPage() {
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [user, setUser] = useState(null);

  // const history = useHistory()
  // let location = useLocation();
  function setWithExpiry(key, value, ttl) {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  useEffect(() => {
    console.log(userName);
    console.log(password);
    console.log(
      `${API_GET_SINGLE_USER_DATA}/?username=${userName}&password=${password}`
    );
    fetch(
      `${API_GET_SINGLE_USER_DATA}/?username=${userName}&password=${password}`
    )
      .then((response) => response.json())
      .then((actualData) => {
        setWithExpiry(
          localStorage_USER_KEY,
          JSON.stringify(actualData),
          localStorage_EXPIRE_TIME
        );
        setUser(actualData);
        // handleRoute(user)
        // console.log(user.password)
        // console.log(user.email)
        console.log(actualData);
      })
      .catch((err) => {
        setUser(null);
        console.log(err.message);
      });
    // return () => {
    //     // setUser({}); // This worked for me
    //   };
  }, [userName, password]);

  return (
    <div className="text-center m-5-auto login_form">
      <h3> Branch Manager</h3>
      <hr />

      <p>
        <label>Username</label>
        <br />
        <input
          type="text"
          value={userName}
          name="first_name"
          required
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </p>
      <p>
        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          name="password"
          required
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
      </p>
      <hr />
      {/* <div className="button" onClick={handleRoute(user)}>
                {(user!=null)?(<Link to={{pathname:HOME_DASHBOARD,
                state:{user:user} }} >Login</Link>):(<> (¬_¬) , provide correct info...</>)}
                </div> */}
      <div className="button">
        {user != null ? (
          <p onClick={window.location.reload(true)}>Logging in...</p>
        ) : (
          <> (¬_¬) , provide correct info...</>
        )}
      </div>
    </div>
  );
}
