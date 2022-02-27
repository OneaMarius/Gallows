import React from "react";
import mod from './Button.module.css';

function Button(props) {
   return (
      <button
         type={`${props.type ? props.type : "button"}`}
         className={`${mod.Button} ${props.className ? props.className : ""}`}
         style={props.style}
         onClick={props.onClick}>
         {props.children}
      </button>
   );
}

export default Button;
