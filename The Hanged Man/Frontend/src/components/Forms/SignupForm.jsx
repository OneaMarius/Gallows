import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import Button from "../Buttons/Button";
import Card from "../Cards/Card";
import mod from "./LoginSignupForm.module.css";

function SignupForm() {
   const navigate = useNavigate();
   const emailRef = useRef();
   const passwordRef = useRef();
   const nameRef = useRef();
   const authCtx = useContext(AuthContext);

   async function submitHandler(e) {
      e.preventDefault();

      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const name = nameRef.current.value;
      // console.log(name, email, password);
     const UserData = {
        email: email,
        password: password,
        name: name
     }

      let responseData;
      try {
         const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
            {
               method: "POST",
               headers: {
                  "Content-type": "application/json",
               },
               body: JSON.stringify(UserData),
            }
         );
         responseData = await response.json();
         if (!response.ok) {
            throw new Error(responseData.message);
         } else {
            // console.log(responseData);
            authCtx.login(responseData.user);
            navigate("/game");
         }
      } catch (error) {
         // console.log(error.message);
      }
   }

   return (
      <Card className={mod.FormCard}>
         <form className={mod.form} onSubmit={submitHandler}>
            <div className={mod.element}>
               <label htmlFor="email">Email:</label>
               <input type="text" id="email" ref={emailRef} required />
            </div>
            <div className={mod.element}>
               <label htmlFor="password">Password:</label>
               <input
                  type="password"
                  id="password"
                  ref={passwordRef}
                  minLength={4}
                  required
               />
            </div>
            <div className={mod.element}>
               <label htmlFor="name">Name:</label>
               <input type="text" id="name" ref={nameRef} required  minLength={4}/>
            </div>
            
            <div className={mod.element}>
               <Button type="submit">Create Account</Button>
            </div>
         </form>
      </Card>
   );
}

export default SignupForm;
