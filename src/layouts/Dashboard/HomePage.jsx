import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { SearchContext } from "../../components/SearchContext";
import "./HomePage.css";
import _ from "lodash";
import {
  API_GET_ALL_BRANCH_DATA,
  localStorage_USER_KEY,
} from "./../../CONSTANTS/API_URI";
import { EDIT_PAGE, LOGIN_PAGE } from "../../CONSTANTS/ROUTE_CONSTANTS";
// import EditPage from './EditPage';
import NavBar from "../../components/NavBar";

export default function HomePage() {
  const dummybranch = {
    branchID: 0,
    branchName: "",
    address: "",
    alarmSystemPhoneNumber: "",
    emergencyCallNumbers: "",
    companyNames: "",
    status: "",
    parentBranchID: 0,
  };
  const [BranchInfo, setBranchInfo] = useState([{}]);
  const [ArmedBranch, setArmedBranch] = useState([]);
  const [DisarmedBranchInfo, setDisarmedBranchInfo] = useState([]);
  const [noReplayBranchInfo, setNoReplayBranchInfo] = useState([]);

  const history = useHistory();
  const data = useLocation();

  //   console.log("PRINTNG.. SEARCH QUERY. ");
  //   console.log(searchQuery);

  // const [user, setUser] = useState({})

  // useEffect(() => {

  //     const itemStr = localStorage.getItem(localStorage_USER_KEY)
  //     // if the item doesn't exist, return null
  //     if (!itemStr) {
  //         // return null
  //     }
  //     const item = JSON.parse(itemStr)
  //     const now = new Date()
  //     // compare the expiry time of the item with the current time
  //     if (now.getTime() > item.expiry) {

  //         // If the item is expired, delete the item from storage
  //         // and return null
  //         console.log("in if")
  //         localStorage.removeItem(localStorage_USER_KEY)
  //         // return null
  //     }else{
  //         console.log("in else")
  //         setUser(item.value)
  //         console.log(user)
  //     }
  //     console.log(item.value)
  //     console.log(user)
  //     console.log(now.getTime())
  //     // return item
  // }, [])

  useEffect(() => {
    fetch(`${API_GET_ALL_BRANCH_DATA}`)
      .then((response) => response.json())
      .then((actualData) => {
        setBranchInfo(actualData.body);
        actualData.body.map((singleBranch) => {
          if (singleBranch.status.toString().toLowerCase() === "system armed") {
            setArmedBranch((oldData) => [...oldData, singleBranch]);
          } else if (
            singleBranch.status.toString().toLowerCase() === "system disarmed"
          ) {
            setDisarmedBranchInfo((oldData) => [...oldData, singleBranch]);
          } else if (
            singleBranch.status.toString().toLowerCase() === "no-reply"
          ) {
            setNoReplayBranchInfo((oldData) => [...oldData, singleBranch]);
          }
        });
        // actualData.body.map(singleBranch => {
        //     console.log(singleBranch.branchID)
        //     console.log(singleBranch)})
        // console.log(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });

    return () => {
      setBranchInfo(dummybranch);
      setArmedBranch(dummybranch);
      setDisarmedBranchInfo(dummybranch);
      setNoReplayBranchInfo(dummybranch);
    };
  }, []);

  function setColor(status) {
    if (status === "system armed") {
      return "#7ff2b7";
    } else if (status === "system disarmed") {
      return "#fbff7f";
    } else if (status === "no-reply") {
      return "#fd9f99";
    } else {
      return "#ffffff";
    }
  }

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

  function renderBranchInfos(branch) {
    const data = branch.sort((a, b) => {
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
        key={singleBranch.branchID + ""}
        onClick={(e) => {
          history.push({
            pathname: EDIT_PAGE,
            state: { singleBranch: singleBranch, isAddBranch: false },
          });
        }}
      >
        {/* <Link to={{pathname:EDIT_PAGE , state:{user:data.state.user}}}></Link> */}
        <tr style={{ backgroundColor: setColor(singleBranch.status) }}>
          <td>{index + 1}</td>
          <td>{singleBranch.branchName}</td>
          <td>{singleBranch.status}</td>
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
            <div className="armed-branch">
              {/* <div className="heading">
                                <h3>Armed Branches</h3>
                            </div> */}
              <div className="branches-list">
                {/* <div className="single-branch" style={{color: "red"}} ></div> */}
                <table id="branch_table">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <th>Branch Name</th>
                      <th>Status</th>
                    </tr>
                  </tbody>

                  {renderBranchInfos(ArmedBranch)}
                </table>
                {/* {BranchInfo.map((data)=>( data.branchID))} */}
              </div>
            </div>
          </div>
          <div className="not-active">
            <div className="disarmed-branch">
              {/* <div className="heading">
                                <h3>Disarmed Branches</h3>
                            </div> */}
              <div className="branches-list">
                {/* <div className="single-branch" style={{color: "red"}} ></div> */}
                <table id="branch_table">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <th>Branch Name</th>
                      <th>Status</th>
                    </tr>
                  </tbody>

                  {renderBranchInfos(DisarmedBranchInfo)}
                </table>
                {/* {BranchInfo.map((data)=>( data.branchID))} */}
              </div>
            </div>
            <div className="no-replay-branch">
              {/* <div className="heading">
                                <h3>No reply Branches</h3>
                            </div> */}
              <div className="branches-list">
                {/* <div className="single-branch" style={{color: "red"}} ></div> */}
                <table id="branch_table">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <th>Branch Name</th>
                      <th>Status</th>
                    </tr>
                  </tbody>
                  {renderBranchInfos(noReplayBranchInfo)}
                </table>
                {/* {BranchInfo.map((data)=>( data.branchID))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
