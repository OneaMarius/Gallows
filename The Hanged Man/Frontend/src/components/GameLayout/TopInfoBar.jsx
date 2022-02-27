import React, { useEffect, useState } from "react";
import mod from "./Game.module.css";

function TopInfoBar(props) {
   const games = +props.getWins + +props.getLosses;
   let rate = 0;
   if (props.getLosses == 0) {
      rate = +props.getWins + 1;
   } else {
      rate = props.getWins / props.getLosses;
   }

   return (
      <div className={mod.TopInfoBar}>
         <div className={mod.info}>
            <div className={mod.infoName}>Score</div>
            <div className={mod.infoValue}>{props.getScore}</div>
         </div>
         <div className={mod.info}>
            <div className={mod.infoName}>Wins</div>
            <div className={mod.infoValue}>{props.getWins}</div>
         </div>
         <div className={mod.info}>
            <div className={mod.infoName}>Losses</div>
            <div className={mod.infoValue}>{props.getLosses}</div>
         </div>
         <div className={mod.info}>
            <div className={mod.infoName}>Games</div>
            <div className={mod.infoValue}>{games}</div>
         </div>
         <div className={mod.info}>
            <div className={mod.infoName}>Rate</div>
            <div className={mod.infoValue}>{rate.toFixed(2)}</div>
         </div>
      </div>
   );
}

export default TopInfoBar;
