import React, { useState } from 'react'
import bg from '../assets/registrationbg.png'
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification  } from "firebase/auth";
import Alert from '@mui/material/Alert';
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai';
import { ColorRing } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';





const Registration = () => {
  const auth = getAuth();
  let navigate = useNavigate()


let [formdata,setFormData] = useState({
  fullname:"",
  email:"",
  password:""
})


let [fullnameError,setFullNameError] = useState("")
let [emailError,setEmailError] = useState("")
let [passwordError,setPasswordError] = useState("")
let [open,setOpen] = useState(false)
let [load,setLoad] = useState(false)


let handleChange = (e)=>{

  setFormData({

    ...formdata,
    [e.target.name]: e.target.value

  })

  if(e.target.name == "fullname"){
    setFullNameError("")
  }

  if(e.target.name == "email"){
    setEmailError("")
  }

  if(e.target.name == "password"){
    setPasswordError("")
  }


}

  let handleRegistration = ()=>{
   
   
    if(!formdata.fullname){
      setFullNameError("Fullname Required")
    }

    if(!formdata.email){
      setEmailError("Email Required")
    }

    if(!formdata.password){
      setPasswordError("Password Required")
    }

    if(formdata.email && formdata.fullname && formdata.password){

      let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      // let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      // if(!pattern.test(formdata.email)){
      //   setEmailError("Invalid Email")
      // }

      // if(formdata.fullname.length < 3){
      //   setFullNameError("FullName must be 3 character")
      // }

      // if(!re.test(formdata.password)){
      //   setPasswordError("Password not strong")
      // }

     setLoad(true)
      createUserWithEmailAndPassword(auth,formdata.email,formdata.password).then(()=>{

        sendEmailVerification(auth.currentUser).then(()=>{

          setFormData({
            fullname:"",
            email:"",
            password:""
          })
  
          setLoad(false)
          // toast("Registration successfull! Please verify your email")
          toast.success('🦄 Registration successfull ! please verify your email', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

            setTimeout (()=>{
              navigate("/login")
            },1000)
           
  
        })  .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;


        if(errorCode.includes("email")){
          setEmailError("Email already Exixts  ")
          toast.error('Email already Exixts', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

          
        }



          setLoad(false)

          
        });

        })
        
       
     
    }

  }

  return (
    <div className='registration'>
        <div className='left'>
         <div className='text-container'>
         <h2>Get started with easily register</h2>
          <p>Free register and you can enjoy it</p>
          
      <TextField onChange={handleChange} name="fullname" className='inputCss' type='Full name' id="outlined-basic" label="Full 
      Name" variant="outlined" value={formdata.fullname}/>

      {fullnameError &&  
       <Alert variant="filled" severity="error">
       {fullnameError}
      </Alert>}

      <TextField onChange={handleChange} name="email" className='inputCss' type='Email' id="outlined-basic"
       label="Email" variant="outlined" value={formdata.email}/>


     {emailError   &&  
       <Alert variant="filled" severity="error">
       {emailError}
      </Alert>}

     <div>
     <TextField onChange={handleChange} name="password" className='inputCss' type={open ? "text":"password"} id="outlined-basic" 
      label="Password" variant="outlined" value={formdata.password}/>

      {open 

      ? 
      <AiFillEye onClick={()=>setOpen(false)} className='eye'/>
      :
      <AiFillEyeInvisible onClick={()=>setOpen(true)}  className='eye'/>
      }

     </div>

     {passwordError &&  
       <Alert variant="filled" severity="error">
       {passwordError}
      </Alert>}

      {load
      ?
      <Button  className='regbtn' 
      variant="contained">
        <ColorRing
  visible={true}
  height="20"
  width="40"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
      </Button>
      :
      <Button onClick={handleRegistration} className='regbtn' 
      variant="contained">Sign up</Button>
      
      }

      <p>Already have an account ? <Link to="/login" className='fucas'>Sign in</Link> </p>

         </div>
        </div>
        <div className='right'>
            <Image src={bg} className="bg"/>
        </div>
    </div>
  )
}

export default Registration