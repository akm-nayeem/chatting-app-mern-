import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const auth = getAuth();
    let [email,setEmail] = useState("")
    let navigate = useNavigate()

    let handleForgotPassword = ()=>{
        sendPasswordResetEmail(auth, email)

       
        .then(() => {
          toast.success(' Check your email', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            navigate("/login")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }

  return (
    <div className='forgotpage'>
        
        <div className="forgotbox">
        <h3>Forgot Password</h3>
        <TextField onChange={(e)=> setEmail (e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
        <br />
        <Button onClick={handleForgotPassword} variant="contained">Send</Button>
        </div>
    </div>
  )
}

export default ForgotPassword