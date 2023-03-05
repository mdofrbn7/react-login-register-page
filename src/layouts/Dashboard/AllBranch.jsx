import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import { SearchContext } from "../../components/SearchContext";

import "./AllBranch.css";

import { API_GET_ALL_BRANCH_DATA } from "./../../CONSTANTS/API_URI";
import { EDIT_PAGE, LOGIN_PAGE } from "../../CONSTANTS/ROUTE_CONSTANTS";
// import EditPage from './EditPage';
import NavBar from "../../components/NavBar";

export default function AllBranch() {
  const history = useHistory();
  const data = useLocation();

  // let data = useLocation();
  // let history = useHistory();
  // const isLoggedIn = ()=>{
  //     if(data!=null){
  //         if(data.state.user!=null){
  //             return true
  //         }
  //     }else{
  //         return false
  //     }
  // }

  const [Branch, setBranch] = useState([{}]);

  function getBranchs() {
    fetch(`${API_GET_ALL_BRANCH_DATA}`)
      .then((response) => response.json())
      .then((actualData) => {
        setBranch(actualData.body);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  useEffect(() => {
    getBranchs();
  }, [Branch]);

  function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  }

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
  function renderAllBranch(Branch) {
    const data = Branch.sort((a, b) => {
      // if (a.active == true && b.active == false) {
      //   return -1;
      // }
      // if (b.active == true && a.active == false) {
      //   return -1;
      // }
      return compareStrings(a.branchName, b.branchName);
    });
    return search(data).map((singleBranch, index) => (
      <tbody
        key={index + ""}
        onClick={(e) => {
          history.push({
            pathname: EDIT_PAGE,
            state: { singleBranch: singleBranch, isAddBranch: false },
          });
        }}
      >
        <tr>
          <td>{index + 1}</td>
          <td>{singleBranch.branchName}</td>
          <td>{singleBranch.address}</td>
          <td>{singleBranch.alarmSystemPhoneNumber}</td>
          <td>{singleBranch.emergencyCallNumbers}</td>
          <td>{singleBranch.companyNames}</td>
          <td>{singleBranch.status}</td>
          <td>{singleBranch.parentBranchID}</td>
        </tr>
      </tbody>
    ));
  }
  return (
    <div className="body">
      <div className="mainbody">
        {/* <NavBar /> */}
        <div className="dashboard">
          <div className="active">
            <table id="allBranch">
              <tbody>
                <tr>
                  <th>branchID</th>
                  <th>branchName</th>
                  <th>address</th>
                  <th>alarmSystemPhoneNumber</th>
                  <th>emergencyCallNumbers</th>
                  <th>companyNames</th>
                  <th>status</th>
                  <th>parentBranchID</th>
                </tr>
              </tbody>
              {renderAllBranch(Branch)}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
