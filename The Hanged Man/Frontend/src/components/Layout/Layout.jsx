import React from "react";  
import mod from './Layout.module.css';
import MainNavigation from "./MainNavigation";

function Layout(props) {
  return (
    <div className={mod.Layout}>
        <MainNavigation />
        <main className={mod.main}>
            {props.children}
        </main>
    </div>
  )
}

export default Layout