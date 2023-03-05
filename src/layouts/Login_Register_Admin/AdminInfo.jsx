import React, { useState, useEffect, useContext } from "react";
import NavBar from "../../components/NavBar";
import _ from "lodash";
import { SearchContext } from "../../components/SearchContext";
import {
  API_ADD_USER,
  API_DELETE_USER,
  API_GET_ALL_USER_DATA,
  API_UPDATE_USER,
} from "../../CONSTANTS/API_URI";
import "./AdminInfo.css";
function AdminInfo() {
  const blankStateAdmin = {
    id: 0,
    username: "",
    email: "",
  };
  const [allAdmin, setallAdmin] = useState([{}]);
  // const [isEdit, setisEdit] = useState(false)
  // const [singleAdmin, setsingleAdmin] = useState({})

  const [admin, setAdmin] = useState(blankStateAdmin);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  // const [adminInfo, setadminInfo] = useState({})

  // const [isAddAdmin, setisAddAdmin] = useState(false)

  function getAllAdmin() {
    fetch(`${API_GET_ALL_USER_DATA}`)
      .then((response) => response.json())
      .then((actualData) => {
        setallAdmin(actualData.body);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  useEffect(() => {
    getAllAdmin();
  }, []);

  // useEffect(() => {
  //     if(props.location.state.user!=null){
  //         setadminInfo(props.location.state.user)
  //         // console.log(props.location.state.user)
  //     }
  // }, [adminInfo])

  // const handleChange= (e)=>{
  //     setusername(e.target.value)
  //     const newadmin = {
  //     username: username,
  //     email: email,
  //     password: ""
  //     }
  //     // console.log('canges............')
  //     setAdmin(newadmin)
  // }
  // const { id, username,Admin_st} = Admin
  // const handleDelete = (e,id)=>{
  //     setisEdit(false)
  //     fetch(`${API_DELETE_AdminWORD}/?id=${id}`)
  //         .then((response) => response.json())
  //         .then((data) => {
  //             console.log('Success:', data);
  //         })
  //         .catch((error) => {
  //             console.error('Error:', error);
  //         });
  //         e.preventDefault();

  // }
  const handleDelete = (e, id) => {
    // setisEdit(false)
    const data = {
      id: id,
    };
    fetch(`${API_DELETE_USER}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    getAllAdmin();
    // e.preventDefault();
  };
  const handleSubmit = (e) => {
    // setAdmin(id,username, email,)
    // var data = new FormData();
    // data.append(  JSON.stringify( Admin ) );
    const newadmin = {
      username: username,
      email: email,
      password: "",
    };
    fetch(`${API_ADD_USER}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newadmin),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(admin);

    // console.log(Admin)
    getAllAdmin();
    // e.preventDefault()
  };

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

  function renderAdminWords(allAdmin) {
    return search(allAdmin).map((singleAdmin) => (
      <tbody key={singleAdmin.id + ""}>
        {/* <Link to={{pathname:EDIT_PAGE , state:{user:data.state.user}}}></Link> */}
        <tr>
          <td>{singleAdmin.id}</td>
          <td>{singleAdmin.username}</td>
          <td>{singleAdmin.email}</td>
          <td>
            <button
              onClick={(e) => {
                handleDelete(e, singleAdmin.id);
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
      <div className="mainBody_Admin">
        {/* <NavBar user={props.location.state.user}/> */}
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
                    <th>id</th>
                    <th>username</th>
                    <th>email</th>
                    <th>Delete</th>
                  </tr>
                </tbody>

                {renderAdminWords(allAdmin)}
              </table>
              {/* {BranchInfo.map((data)=>( data.branchID))} */}
            </div>
          </div>
        </div>
        <div className="main_form">
          <h3>Add New Admin</h3>

          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>username</label>
                <input
                  type="name"
                  className="form-control"
                  name="username"
                  value={username}
                  placeholder="username"
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label>email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  placeholder="email"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add New
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminInfo;
