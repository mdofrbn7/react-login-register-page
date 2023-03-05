import React,{useState, useEffect} from 'react'
import NavBar from '../../components/NavBar'
import { API_ADD_BRANCH, API_DELETE_BRANCH, API_UPDATE_BRANCH } from '../../CONSTANTS/API_URI'
import axios from 'axios'
function EditPage(props) {
    

    

    const [branchInfo, setbranchInfo] = useState({})
    const [adminInfo, setadminInfo] = useState({})
    const {branchID, branchName,address, alarmSystemPhoneNumber, emergencyCallNumbers, companyNames,parentBranchID, status} = branchInfo
    const blankStateBranch = {
        branchID : 0, 
        branchName: "",
        address: "",
        alarmSystemPhoneNumber: "",
        emergencyCallNumbers: "",
        companyNames: "",
        status: "no-reply",
        parentBranchID: 0
        
    }
    const [isAddBranch, setisAddBranch] = useState(false)
 
    useEffect(() => {
        if(props.location.state.isAddBranch!=null){
            if(props.location.state.isAddBranch===true){
                setisAddBranch(true)
            }else{
                setisAddBranch(false)
            }
            
        }else{
           return false ;
        }
    }, [isAddBranch])
    // console.log('true or false')
    // console.log(isAddBranch)
    
    useEffect(() => {
        if(isAddBranch){
            setbranchInfo(blankStateBranch)
        }else{
            if(props.location.state.singleBranch!=null){
                setbranchInfo(props.location.state.singleBranch) 
            }
        }
    }, [])

    
    // useEffect(() => {
    //     if(props.location.state.user!=null){
    //         setadminInfo(props.location.state.user)
    //         console.log(props.location.state.user)
    //     }
    // }, [adminInfo])
     
    const handleChange= (e)=>{
        // console.log('canges............')
        setbranchInfo({...branchInfo,[e.target.name]:e.target.value})
    }
    // const { branchID, branchName,address,alarmSystemPhoneNumber,emergencyCallNumbers,companyNames,parentBranchID,status} = branchInfo


    const handleDelete = (e,id)=>{
        // setisEdit(false)
        fetch(`${API_DELETE_BRANCH}/?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                alert('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            setbranchInfo(blankStateBranch)
            e.preventDefault();
            
    }
    const handleSubmit = (e)=>{
        // setbranchInfo(branchID,branchName, address, alarmSystemPhoneNumber, emergencyCallNumbers, companyNames, parentBranchID, status)
        // var data = new FormData();
        // data.append(  JSON.stringify( branchInfo ) );
        if(isAddBranch){

            const newBranch = { 
                branchName: branchInfo.branchName,
                address: branchInfo.address,
                alarmSystemPhoneNumber: branchInfo.alarmSystemPhoneNumber,
                emergencyCallNumbers: branchInfo.emergencyCallNumbers,
                companyNames: branchInfo.companyNames,
                status: "no-reply",
                parentBranchID: 0
            }
            console.log(API_ADD_BRANCH)
            fetch(`${API_ADD_BRANCH}`,{
                method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBranch),
            })
            .then((response) => response.json())
            .then((data) => {
                alert('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            setbranchInfo(blankStateBranch)
            console.log(JSON.stringify(newBranch))
        }else{
            
            fetch(`${API_UPDATE_BRANCH}`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(branchInfo),
            })
            .then((response) => response.json())
            .then((data) => {
                alert('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            console.log(`${API_UPDATE_BRANCH}`)
            console.log(branchInfo)
        }
      
        // console.log(branchInfo)
        setbranchInfo(blankStateBranch)
        e.preventDefault()

    }

  return ( <>
    <div className='mainbody'>
    {/* <NavBar /> */}

    <div className='main_form'>
    <h3>{isAddBranch?(<>Add </>):(<>Edit </>)}Branch</h3>

<form>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label >BranchName: {branchInfo.branchID}</label>
      <input type="name" className="form-control" name="branchName" value={branchName} placeholder="branchName"  onChange={handleChange}/>
    </div>
    <div className="form-group col-md-6">
      <label >Address</label>
      <input type="text" className="form-control" name="address" value={address}  placeholder="Address" onChange={handleChange} />
    </div>
  </div>
  <div className="form-group">
    <label >Alarm system phone number</label>
    <input type="text" name="alarmSystemPhoneNumber" className="form-control" value={alarmSystemPhoneNumber} placeholder="Include +880" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label >Emergency call numbers</label>
    <input type="text" className="form-control" name="emergencyCallNumbers" value={emergencyCallNumbers} placeholder="Emergency Call Numbers"  onChange={handleChange}/>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label >company name</label>
      <input type="text" className="form-control"  placeholder="Company Name" name="companyNames" value={companyNames} onChange={handleChange} />
    </div>
    <div className="form-group col-md-4">
      <label >status</label>
      <input type="text" className="form-control"  placeholder="no-reply" name="status" readOnly={true} value={branchInfo.status}   />
    </div>
    
    <div className="form-group col-md-2">
      <label>Parent Branch ID</label>
      <input type="text" className="form-control"  placeholder="0" name="parentBranchID" readOnly={true} value={parentBranchID} onChange={handleChange}  />
    </div>
  </div>
  <div className="form-group">

  </div>
  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>{isAddBranch?(<>Add </>):(<>Save </>)}</button>
  {!isAddBranch && (
    <button type="delete" className="dlt btn btn-primary" onClick={(e)=>{handleDelete(e,branchID)}}>delete</button>
  )}
</form>
</div>
    </div>
  
</>

  )
}

export default EditPage
