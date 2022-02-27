import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import Button from "../Buttons/Button";
import Card from "../Cards/Card";
import mod from "./LoginSignupForm.module.css";

function LoginForm() {
   const emailRef = useRef();
   const passwordRef = useRef();
   const navigate = useNavigate();
   const authCtx = useContext(AuthContext);


   async function submitHandler(e) {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const selectedUser = {
         email,
         password
      };
      // console.log(selectedUser);
   
      try {
        const response = await fetch(
           `${process.env.REACT_APP_BACKEND_URL}/users/login`,
           {
              method: "POST",
              headers: {
                 "Content-type": "application/json",
              },
              body: JSON.stringify(selectedUser),
           }
        );
        const responseData = await response.json();
        if (!response.ok) {
           throw new Error(responseData.message);
        } else {
            // console.log(responseData);
            if (responseData.login === true) {
                
                authCtx.login(responseData.user);
                navigate('/game');
            };
        }
     } catch (error) {
      //   console.log(error.message);
     }
   }

   return (
      <Card className={mod.FormCard}> 
         
         <form  className={mod.form}  onSubmit={submitHandler}>
            <div className={mod.element}>
               <label htmlFor="email">Email:</label>
               <input type="text" id="email" ref={emailRef} required placeholder="email"/>
            </div>
            <div className={mod.element}>
               <label htmlFor="password">Password:</label>
               <input
                  type="password"
                  id="password"
                  ref={passwordRef}
                  required
                  placeholder="password"
               />
            </div>
            <div className={mod.element}>
               <Button type='submit'>Login</Button>
            </div>
         </form>
      </Card>
   );
}

export default LoginForm;
