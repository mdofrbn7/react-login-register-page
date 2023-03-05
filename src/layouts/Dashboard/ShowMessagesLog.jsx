import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { SearchContext } from "../../components/SearchContext";
import _ from "lodash";
import "./ShowMessagesLog.css";

import { API_GET_ALL_SMS_DATA } from "./../../CONSTANTS/API_URI";
import { LOGIN_PAGE } from "../../CONSTANTS/ROUTE_CONSTANTS";
// import EditPage from './EditPage';
import NavBar from "../../components/NavBar";

export default function ShowMessagesLog() {
  let data = useLocation();
  let history = useHistory();
  const isLoggedIn = () => {
    if (data != null) {
      if (data.state.user != null) {
        return true;
      }
    } else {
      return false;
    }
  };
  const dummySms = {
    id: 0,
    smsTime: "",
    branchName: "",
    smsNumber: "",
    smsText: "",
  };
  const [SMS, setSMS] = useState([{ dummySms }]);

  useEffect(() => {
    fetch(`${API_GET_ALL_SMS_DATA}`)
      .then((response) => response.json())
      .then((actualData) => {
        setSMS(actualData.body);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const query = useContext(SearchContext);
  const search = (data) => {
    const filter = _.filter(data, (singleData) => {
      return _.includes(
        _.lowerCase(JSON.stringify(_.values(singleData))),
        _.lowerCase(query.searchQuery)
      );
    });
    return filter;
  };
  function renderSMS(SMS) {
    return search(SMS)
      .slice()
      .reverse()
      .map((singleSMS) => (
        <tbody key={singleSMS.id + ""}>
          <tr>
            <td>{singleSMS.id}</td>
            <td>{singleSMS.smsTime}</td>
            <td>{singleSMS.branchName}</td>
            <td>{singleSMS.smsNumber}</td>
            <td>{singleSMS.smsText}</td>
          </tr>
        </tbody>
      ));
  }
  function render500SMS(SMS) {
    return SMS.slice()
      .reverse()
      .map(
        (singleSMS, index) =>
          index < 500 && (
            <tbody key={singleSMS.id + ""}>
              <tr>
                <td>{singleSMS.id}</td>
                <td>{singleSMS.smsTime}</td>
                <td>{singleSMS.branchName}</td>
                <td>{singleSMS.smsNumber}</td>
                <td>{singleSMS.smsText}</td>
              </tr>
            </tbody>
          )
      );
  }
  return (
    <div className="body">
      <div className="mainbody">
        {/* <NavBar /> */}
        <div className="dashboard">
          <div className="active">
            <table id="SMS_table">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>SMS Time</th>
                  <th>Branch Name</th>
                  <th>SMS Number</th>
                  <th>SMS Text</th>
                </tr>
              </tbody>

              {query.searchQuery !== "" ? renderSMS(SMS) : render500SMS(SMS)}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
