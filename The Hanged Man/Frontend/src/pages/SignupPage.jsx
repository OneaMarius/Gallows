import React from 'react'
import mod from "./LoginSignupPages.module.css";
import SignupForm from '../components/Forms/SignupForm';
import { Link } from 'react-router-dom';
import Card from '../components/Cards/Card';
import Button from '../components/Buttons/Button';

function SignupPage() {
  return (
    <div className={mod.signupPage}>
    <Card className={mod.FormCard}>
       <h1>Crate New Account</h1>
       <SignupForm />
       <div className={mod.control}>
          <p>You already have an account?</p>
          <Link to="/login">
             <Button className={mod.switchBtn}>Login</Button>
          </Link>
       </div>
    </Card>
 </div>
  )
}

export default SignupPage