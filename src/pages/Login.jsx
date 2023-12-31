import React, { useState,useEffect } from 'react'
import bg2 from '../assets/loginbg2.png'
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,signInWithEmailAndPassword,GoogleAuthProvider,FacebookAuthProvider ,signInWithPopup,   } from "firebase/auth";
import { getDatabase, ref, set,push } from "firebase/database";
import Alert from '@mui/material/Alert';
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai';
import { ColorRing } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logeduser } from '../slices/userSlices';


const Login = () => {
  const auth = getAuth();
  
  const provider = new GoogleAuthProvider();
  const db = getDatabase();
  
  // const provider = new FacebookAuthProvider();
  
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let data = useSelector(state=> state.logedUser.value)

  useEffect(()=>{
    if(data){
      navigate("/home")
    }
  },[])

let [formdata,setFormData] = useState({

  email:"",
  password:""
})

let [emailError,setEmailError] = useState("")
let [passwordError,setPasswordError] = useState("")
let [open,setOpen] = useState(false)
let [load,setLoad] = useState(false)


let handleChange = (e)=>{

  setFormData({

    ...formdata,
    [e.target.name]: e.target.value

  })

  if(e.target.name == "email"){
    setEmailError("")
  }

  if(e.target.name == "password"){
    setPasswordError("")
  }
}

  let handleLogin = ()=>{
   
    if(!formdata.email){
      setEmailError("Email Required")
    }

    if(!formdata.password){
      setPasswordError("Password Required")
    }

    if(formdata.email &&  formdata.password){

       
     setLoad(true)

     signInWithEmailAndPassword(auth, formdata.email, formdata.
      password).then((user)=>{

        setLoad(false)

        console.log(user.user.emailVerified)
        // if(user.user.emailVerified){
          navigate("/home")
          dispatch(logeduser(user.user))
          localStorage.setItem("user",JSON.stringify(user.user))
        
          toast.success('Please verify your email for login', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          setTimeout(()=>{
            navigate("/home")
          },1000)

        // }
        
        // else{    
        //   toast.error('Please verify your email ', {
        //     position: "bottom-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        //     });
        // }


     })

     .catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;


    if(errorCode.includes("user")){
      setLoad(false)
      setEmailError(`${errorCode}`)
      toast.error(`${errorCode}`, {
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
    if(errorCode.includes("password")){
      setLoad(false)
      setPasswordError(`${errorCode}`)
      toast.error(`${errorCode}`, {
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
    
  })
  }
  
    }

    let handleGoogleLogin = ()=>{
      signInWithPopup(auth, provider).then((user)=>{
        navigate("/home")
        dispatch(logeduser(user.user))
          localStorage.setItem("user",JSON.stringify(user.user))
      
        set(push(ref(db, 'users')), {
          username: user.user.displayName,
          email: user.user.email,
          profile_picture : user.user.photoURL
        });
      })
    }

    let handleFacebookLogin = ()=>{
      signInWithPopup(auth, provider).then((result)=>{
        console.log("facebook log done",result.user)
      })

    }


  return (
    <div className='registration'>
        <div className='left'>
         <div className='text-container'>
         <h2>Login to your account!</h2>
         <Button onClick={handleGoogleLogin} className='loginbtn' variant="contained"> Google sign in</Button>
         <Button onClick={handleFacebookLogin} className='loginbtn' variant="contained"> Facebook </Button>
          
    

      <TextField onChange={handleChange} name="email" className='inputCss' type='Email' id="outlined-basic"
       label="Email Address" variant="outlined" value={formdata.email}/>


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

     <p> Forgot Password ? <Link to="/forgotpassword" className='fucas'>Click Here</Link> </p>

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
      <Button onClick={handleLogin} className='regbtn' 
      variant="contained">Login to Continue</Button>
      
      }

      <p>Don't have an account ? <Link to="/" className='fucas'>Sign up</Link> </p>
     
         </div>
        </div>
        <div className='right'>
            <Image src={bg2} className="bg2"/>
        </div>
    </div>
  )
}

export default Login
