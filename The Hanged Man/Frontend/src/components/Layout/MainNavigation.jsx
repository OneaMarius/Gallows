import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import mod from "./MainNavigation.module.css";

function MainNavigation(props) {
   const authCtx = useContext(AuthContext);
   const isLoggedIn = authCtx.isLoggedIn;

   function logoutHandler() {
      authCtx.logout();
   }


   return (
      <header className={mod.header}>
         <nav className={mod.nav}>
            {isLoggedIn && (
               <ul className={mod.ul_login}>
                  <li>
                     <Link
                        to="/game">
                        Game
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="/score">
                        Top Score
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="/login" onClick={logoutHandler}>
                        Logout
                     </Link>
                  </li>
               </ul>
            )}
            {!isLoggedIn && (
               <ul className={mod.ul_logout}>
                   
                   <li>
                     <Link
                        to="/login">
                        Login
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="/signup">
                        Signup
                     </Link>
                  </li>
               </ul>
            )}
         </nav>
      </header>
   );
}

export default MainNavigation;
