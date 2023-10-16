import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logeduser } from '../slices/userSlices';
import Grid from '@mui/material/Grid';
import Grouplist from '../components/Grouplist';
import Friendrequest from '../components/Friendrequest';
import Friends from '../components/Friends';
import Mygroup from '../components/Mygroup';
import Userlist from '../components/Userlist';
import Blockeduser from '../components/Blockeduser';





const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let data = useSelector(state=> state.logedUser.value)
  console.log(data)
  useEffect(()=>{
    if(!data){
      navigate("/login")
    }
  },[])

  let handleLogOut = ()=>{
    signOut(auth).then(() => {
      dispatch(logeduser(null))
      
      localStorage.removeItem("user")

      navigate("/login")
  
    })
  }

  return (
<>


    <Grid container spacing={2}>
        <Grid item xs={4}>
      
      <Grouplist/>
      <Friendrequest/>
        </Grid>
        <Grid item xs={4}>
            <Friends/>
            <Mygroup/>
        </Grid>
        <Grid item xs={4}>
          <Userlist/>
          <Blockeduser/>
        </Grid>
   </Grid>
    
 
   
   
    <Button onClick={handleLogOut} variant="contained">Logout</Button>

</>
  
  )
}

export default Home