import React, { useEffect, useState } from "react";
import mod from "./HangMan.module.css";

function HangedMan(props) {
   const [head, setHead] = useState(false);
   const [body, setBody] = useState(false);
   const [hand1, setHand1] = useState(false);
   const [hand2, setHand2] = useState(false);
   const [leg1, setLeg1] = useState(false);
   const [leg2, setLeg2] = useState(false);

   useEffect(() => {
      if (props.errors === 0) {
         setHead(false);
         setBody(false);
         setHand1(false);
         setHand2(false);
         setLeg1(false);
         setLeg2(false);
      }
      if (props.errors === 1) {
         setHead(true);
      }
      if (props.errors === 2) {
         setBody(true);
      }
      if (props.errors === 3) {
         setHand1(true);
      }
      if (props.errors === 3) {
         setHand2(true);
      }
      if (props.errors === 4) {
         setLeg1(true);
      }
      if (props.errors === 4) {
         setLeg2(true);
      }
   }, [props.errors]);

   return (
      <div className={mod.HangedMan}>
         <div className={mod.HMerrors}>{props.errors}</div>
         
         <div className={mod.hangBox}>
            <div className={mod.armA}></div>
            <div className={mod.armB}></div>
            <div className={mod.armC}></div>
            <div className={mod.armD}></div>

            {body && <div className={`${mod.body} ${props.errors === 5 && mod.hang}`}>
              {props.errors === 5 && <div><div className={mod.stain1}></div>
               <div className={mod.stain2}></div>
               <div className={mod.stain3}></div></div>} 
               </div>}
            {hand1 && <div className={`${mod.handR } ${props.errors === 5 && mod.hangR}`}></div>}
            {hand2 && <div className={`${mod.handL } ${props.errors === 5 && mod.hangL}`}></div>}
            {leg1 && <div className={`${mod.legR } ${props.errors === 5 && mod.hangLleg}`}></div>}
            {leg2 && <div className={`${mod.legL } ${props.errors === 5 && mod.hangRleg}`}></div>}
            {head && (
               <div
                  className={`${mod.head } ${props.errors === 5 && mod.hangHead}`}>
                     <div className={mod.eye1}>{props.errors === 5 ? 'x':'o'}</div>
                     <div className={mod.eye2}>{props.errors === 5 ? 'x':'o'}</div>
                     <div className={mod.mouth}>{props.errors === 5 ? '(':')'}</div>
                  </div>
            )}
         </div>
         <div className={mod.lettersBar}>REGULI: <word>[1]</word> Se pot face maxim 5 greseli. <word>[2]</word> Daca se apasa "New Word" jocul incepe si se scad 100p, iar jocul este considerat pierdut(Losses +1). <word>[3]</word> Daca jocul este castigat se adauga 100p*(5 - numarul cuvintelor gresite), Wins + 1 si Losses - 1.</div>
      </div>
   );
}

export default HangedMan;
