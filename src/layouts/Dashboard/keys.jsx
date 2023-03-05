import React, { useState, useEffect, useContext } from "react";
import NavBar from "../../components/NavBar";
import _ from "lodash";
import { SearchContext } from "../../components/SearchContext";
import {
  API_ADD_KEYWORD,
  API_DELETE_KEYWORD,
  API_GET_ALL_KEYWORD_DATA,
  API_UPDATE_KEYWORD,
} from "../../CONSTANTS/API_URI";
import "./keys.css";
function Keys(props) {
  const blankStateKey = {
    key_ID: 0,
    key_name: "",
    key_string: "",
  };
  const [allKey, setallKey] = useState([{}]);
  const [isEdit, setisEdit] = useState(false);
  // const [singleKey, setsingleKey] = useState({})
  const [key, setkey] = useState(blankStateKey);
  const [key_name, setkey_name] = useState("");
  const [key_string, setkey_string] = useState("");
  const [adminInfo, setadminInfo] = useState({});

  function getAllKeys() {
    fetch(`${API_GET_ALL_KEYWORD_DATA}`)
      .then((response) => response.json())
      .then((actualData) => {
        setallKey(actualData.body);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  useEffect(() => {
    getAllKeys();
  }, []);

  const handleDelete = (e, id) => {
    setisEdit(false);
    console.log(`${API_DELETE_KEYWORD}/?id=${id}`);
    fetch(`${API_DELETE_KEYWORD}/?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    getAllKeys();
    setkey(blankStateKey);
    // e.preventDefault();
  };
  const handleSubmit = (e, id) => {
    // setkey(key_ID,key_name, key_string,)
    // var data = new FormData();
    // data.append(  JSON.stringify( key ) );
    if (isEdit) {
      const newKey = {
        key_ID: id,
        key_name: key_name,
        key_string: key_string,
      };
      console.log(API_UPDATE_KEYWORD);
      fetch(`${API_UPDATE_KEYWORD}`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newKey),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log(key);
      // getAllKeys()
      setisEdit(false);
    } else {
      const changed_key = {
        key_name: key_name,
        key_string: key_string,
      };
      console.log(API_ADD_KEYWORD);
      fetch(`${API_ADD_KEYWORD}`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changed_key),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // console.log(`${API_UPDATE_KEYWORD}`)
      console.log(key);

      setisEdit(false);
    }

    getAllKeys();
    // console.log(key)
    // e.preventDefault()
  };

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
  function renderKeyWords(allkey) {
    const data = allKey.sort((a, b) => {
      // if (a.active == true && b.active == false) {
      //   return -1;
      // }
      // if (b.active == true && a.active == false) {
      //   return -1;
      // }
      return compareStrings(a.key_string, b.key_string);
    });

    return search(data).map((singleKey, index) => (
      <tbody
        key={index + ""}
        onClick={(e) => {
          // history.push({
          //     pathname:EDIT_PAGE,
          //     state:{user:data.state.user,singleKeys:singleKeys, isAddkeys:false}
          // })
          // console.log(singleKey)
          setisEdit(true);
          console.log(isEdit);
          // setkey(singleKey)
          if (isEdit === true) {
            setkey(singleKey);
            setkey_name(singleKey.key_name);
            setkey_string(singleKey.key_string);
          } else {
            setkey(blankStateKey);
          }
        }}
      >
        {/* <Link to={{pathname:EDIT_PAGE , state:{user:data.state.user}}}></Link> */}
        <tr>
          <td>{index + 1}</td>
          <td>{singleKey.key_name}</td>
          <td>{singleKey.key_string}</td>

          <td>
            <button
              onClick={(e) => {
                handleDelete(e, singleKey.key_ID);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    ));
  }

  return (
    <>
      <div className="mainBody_Key">
        {/* <NavBar /> */}
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
                    <th>key_ID</th>
                    <th>key_name</th>
                    <th>key_string</th>
                    <th>Delete</th>
                  </tr>
                </tbody>

                {renderKeyWords(allKey)}
              </table>
              {/* {BranchInfo.map((data)=>( data.branchID))} */}
            </div>
          </div>
        </div>
        <div className="main_form">
          <h3>Add/Edit Keys</h3>

          <form>
            <p>key_ID: {key.key_ID}</p>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>key_name</label>
                <input
                  type="name"
                  className="form-control"
                  name="key_name"
                  value={key_name}
                  placeholder="key_name"
                  onChange={(e) => {
                    setkey_name(e.target.value);
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label>key_string</label>
                <input
                  type="text"
                  className="form-control"
                  name="key_string"
                  value={key_string}
                  placeholder="key_string"
                  onChange={(e) => {
                    setkey_string(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                handleSubmit(e, key.key_ID);
              }}
            >
              save
            </button>
            &nbsp; &nbsp;
            {key_name !== "" && (
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  setkey_name("");
                  setkey_string("");
                }}
              >
                clear
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Keys;
