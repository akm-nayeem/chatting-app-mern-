import { useState } from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import ForgotPassword from './pages/ForgotPassword';


const router = createBrowserRouter(
  createRoutesFromElements(
   <Route>
     <Route
          path="/"
         element={<Registration/>}
        />
          <Route
          path="/login"
         element={<Login/>}
        />

        <Route
          path="/forgotpassword"
         element={<ForgotPassword/>}
        />

         <Route
          path="/home"
          element={<Home/>}
        />
   </Route>
      
  )
);



function App() {



  return (
    <>
         <RouterProvider router={router} />
         <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </>
  )
}

export default App
