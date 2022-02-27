import React from 'react'
import Button from '../components/Buttons/Button'
import Card from '../components/Cards/Card'
import mod from "./LoginSignupPages.module.css";
import LoginForm from '../components/Forms/LoginForm';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className={mod.loginPage}>
    <Card className={mod.FormCard}>
       <h1>Login</h1>
       <LoginForm />
       <div className={mod.control}>
          <p>You don't have an account yet?</p>
          <Link to="/signup">
             <Button className={mod.switchBtn}>
                Create new account
             </Button>
          </Link>
       </div>
    </Card>  
 </div>
  )
}

export default LoginPage