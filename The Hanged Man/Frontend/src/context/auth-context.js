import { createContext, useCallback, useState } from "react";
import React from "react";

const AuthContext = createContext({
   isLoggedIn: false,
   user: '',
   updateUser: () => {},
   login: () => {},
   logout: () => {},
});

export const AuthContextProvider = (props) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [loggedUser, setLoggedUser] = useState('No user is logged in');


   const login = useCallback((user) => {
      setIsLoggedIn(true);
      setLoggedUser(user);
      // console.log(user);
   }, []);

   const updateUser = (user) => {
      setLoggedUser(user);
      // console.log(user);
   }

   const logout = useCallback(() => {
      
      setIsLoggedIn(false);
      setLoggedUser('No user is logged in');
   }, []);
   
   
   const contextValue = {
       isLoggedIn: isLoggedIn,
       user: loggedUser,
       updateUser,
       login: login,
       logout: logout,
   }

   return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;