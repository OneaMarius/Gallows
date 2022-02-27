import React, { useContext, useState } from "react";
import Layout from './components/Layout/Layout';


import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ScorePage from "./pages/ScorePage";
import AuthContext from "./context/auth-context";
import { Navigate, Route, Routes } from "react-router-dom";


function App() {
const authCtx = useContext(AuthContext);
const isLoggedIn = authCtx.isLoggedIn;

   return (
    <Layout>  
    {isLoggedIn && (
       <Routes>
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/signup" element={<SignupPage />} exact />
          <Route path="/score" element={<ScorePage />} exact />
          <Route path="/game" element={<GamePage />} exact />
       </Routes>
    )}
    {!isLoggedIn && (
       <Routes>
          <Route path="/" element={<Navigate to="/login"/>} exact />
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/signup" element={<SignupPage />} exact />
          <Route path="*" element={<Navigate to="/login"/>} />
       </Routes>
    )}
 </Layout>
   
   );
}

export default App;
