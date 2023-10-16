import React, { useEffect, useState } from 'react'
import gimg from "../assets/img.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,set,push, remove  } from "firebase/database";
import { useSelector } from 'react-redux';

import { ProgressBar } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Userlist = () => {

  const db = getDatabase();
  let [userslist,setUserslist] = useState([])
  let [reqList,setReqList] = useState([])
  const [fnd,setFnd]=useState([])
  const [cancelReqList, setCancelReqList] = useState([])
  let [load,setLoad] = useState(false)
  
 

  let userInfo = useSelector(state=> state.logedUser.value)


  useEffect(()=>{
       const userRef = ref(db,'users');
       onValue(userRef,(snapshot)=>{
       let arr = []
       snapshot.forEach(item=>{
          if(userInfo.uid != item.key){
          arr.push ({...item.val(),userid:item.key})
        }

      })
      setUserslist(arr)
    });

  },[])

  let handleFriendRequest =(info)=>{
    console.log(info)
    setLoad(true);

    set (ref(db,'friendrequest/'+ info.userid),{
      whosendname: userInfo.displayName,
      whosendid: userInfo.uid,
      whoreceivename: info.username,
      whoreceiveid: info.userid,
    });
      
  }


const handleCancelRequest = (info) => {
console.log(info)
remove(ref(db,"friendrequest/"+info.userid))
    
   
    
  }

  

  useEffect(()=>{
    const friendrequestRef = ref(db, 'friendrequest' );
    onValue(friendrequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
       
          arr.push(item.val().whoreceiveid+item.val().whosendid)
        
      })
      setReqList(arr)
   
});

  },[])

  useEffect(()=>{
    const frindsList = ref(db, 'friends' );
    onValue(frindsList, (snapshot) => {
     
      let arr = []
      snapshot.forEach(item=>{
       console.log(item.val())
          arr.push(item.val().whoreceiveid+item.val().whosendid)
        
      })
      setFnd(arr)
   
});

  },[])

console.log(fnd)
 

  return (
    <div className='box'>
    <h3>User List</h3>

    {userslist.map(item=>(

        <div className='list'>
        <img src={gimg}/>
        <h4>{item.username} </h4>
        
        {reqList.includes(item.userid+userInfo.uid) ||  reqList.includes(userInfo.uid
        +item.userid) ?
        <>

         <Button  variant="contained" color='error'>Pending</Button>
         <Button onClick={()=>handleCancelRequest(item)}  variant="contained" color='error'>Cancel</Button>
        </>
      
        
        : fnd.includes(item.userid + userInfo.uid ) || fnd.includes(userInfo.uid + item.userid) ? 
        
        <Button variant="contained">Friends</Button>
        :
        
        <Button onClick={()=>handleFriendRequest(item)} variant="contained">
             Add Friend
          
          </Button>
           
             
        
}
        </div>

    ))}
   
</div>
  )
}

export default Userlist