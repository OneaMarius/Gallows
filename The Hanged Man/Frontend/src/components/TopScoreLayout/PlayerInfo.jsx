import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import mod from "./TopScore.module.css";

function PlayerInfo() {
    const authCtx = useContext(AuthContext);
    const user = authCtx.user;
   return (
      <div className={mod.Player}>
         <div className={mod.playerName}>{user.name}</div>
         <div className={mod.playerInfo}>
            <div className={mod.infoType}>
               <div className={mod.infoBox}>Games</div>
               <div className={mod.infoBox}>Wins</div>
               <div className={mod.infoBox}>Losses</div>
               <div className={mod.infoBox}>Rate</div>
               <div className={mod.infoBox}>Score</div>
            </div>
            <div className={mod.infoValue}>
               <div className={mod.infoBox}>{user.games}</div>
               <div className={mod.infoBox}>{user.win}</div>
               <div className={mod.infoBox}>{user.lose}</div>
               <div className={mod.infoBox}>{user.rate}</div>
               <div className={mod.infoBox}>{user.score}</div>
            </div>
         </div>
      </div>
   );
}

export default PlayerInfo;
