import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom'; 
import {AiFillHome,AiFillMessage,AiFillSetting,AiOutlineLogout} from "react-icons/ai"
import {IoMdNotifications} from "react-icons/io"
import { logeduser } from '../slices/userSlices';
import { getAuth, signOut } from "firebase/auth";

const Sidebar = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let userInfo = useSelector ((state)=>(state.logedUser.value))


    let handleLogout = ()=>{
        signOut(auth).then(() => {
          dispatch(logeduser(null))
          
          localStorage.removeItem("user")
    
          navigate("/login")
      
        })
    }

    let[url,setUrl] = useState("home")


  return (
    <div className='sidebar'>
         <img className='sidebarimg' src={userInfo.photoURL} />
        <h1>{userInfo.displayName}</h1>

        <ul>
            <li onClick={()=>setUrl("home")} className={url=="home"&&"active"}>
                <Link to="/home">
                    <AiFillHome className='icon'/>
                </Link>
            </li>
            <li onClick={()=>setUrl("msg")}className={url=="msg"&&"active"}>
                <Link to="/msg">
                    <AiFillMessage className='icon'/>
                </Link>
            </li>
            <li onClick={()=>setUrl("notification")}className={url=="notification"&&"active"}>
                <Link to="/notification">
                    <IoMdNotifications className='icon'/>
                </Link>
            </li>
            <li><AiFillSetting className='icon'/>
            </li>

            
            <li><AiOutlineLogout onClick={handleLogout} className='icon'/></li>


        </ul>
   
  </div>
  )
}

export default Sidebar