import React,{useState, useEffect} from 'react'
import { Link,useHistory,useLocation } from 'react-router-dom'
import { API_UPDATE_USER, localStorage_USER_KEY } from '../../CONSTANTS/API_URI'



export default function SignUpPage() {




    const dummy = {
        id:0,
        username:"",
        password:"",
        email:""
    }
    const [username, setuserName] = useState("")
    const [password, setpassWord] = useState("")
    const [email, setemail] = useState("")
    const [user, setUser] = useState({dummy})



      // const dummy = {
    //     id:0,
    //     username:"",
    //     password:""
    // }
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [user, setUser] = useState(dummy)

    function checkIfLoggedIn(key) {
        const itemStr = localStorage.getItem(key)
        // if the item doesn't exist, return null
        if (!itemStr) {
            return 
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            
            // If the item is expired, delete the item from storage
            // and return null
            setIsLoggedIn(false)
            localStorage.removeItem(key)
            // return null
        }else{
            setIsLoggedIn(true)
            setUser(JSON.parse(item.value))
        }
        // console.log(JSON.parse(item.value))
        // return JSON.parse(item.value)
    }
    
    useEffect(() => {
        checkIfLoggedIn(localStorage_USER_KEY)
    //     console.log("consoling.. ")
    //   console.log(checkIfLoggedIn(localStorage_USER_KEY))
      setUser(JSON.parse(JSON.parse(localStorage.getItem(localStorage_USER_KEY)).value))
      console.log(JSON.parse(JSON.parse(localStorage.getItem(localStorage_USER_KEY)).value))
    return(()=>{
        setUser(dummy)
    })

    },[])

    const handleChange= (e)=>{
        // console.log('canges............')
        setUser({...user,[e.target.name]:e.target.value})
    }
     // const { key_ID, key_name,key_st} = key
   
    const handleRegister = (e,user)=>{
        console.log(user)
        console.log(API_UPDATE_USER)
        fetch(`${API_UPDATE_USER}`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            })
            .then((response) => response.json())
            .then((data) => {
                alert('Success:', data);

            })
            .catch((error) => {
                console.error('Error:', error);
            });

        
        e.preventDefault()
            
    }

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


    return (
         <>
            <div className="text-center m-5-auto">
            
            <h5>Admin info</h5>
            <form action="/home">
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="username" required value={user.username} onChange={handleChange} />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" required value={user.email} onChange={handleChange}/>
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" required value={user.password} onChange={handleChange}/>
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={(e)=>{handleRegister(e,user)}}>Save </button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
         </>
    )

}
