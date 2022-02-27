import React, { useEffect, useState } from "react";
import Card from "../components/Cards/Card";
import PlayerInfo from "../components/TopScoreLayout/PlayerInfo";
import TopScoreList from "../components/TopScoreLayout/TopScoreList";
import mod from "./ScorePage.module.css";

function ScorePage() {
   const [loading, setLoading] = useState(true);
   const [ScoreDB, setScoreDB] = useState();
   const [WinsDB, setWinsDB] = useState();
   const [GamesDB, setGamesDB] = useState();
   const [RateDB, setRateDB] = useState();

   useEffect(() => {
     async function fetchData() {
      let responseData;

      try {
         const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/users/allusers`
         );
         responseData = await response.json();
         if (!response.ok) {
            throw new Error(responseData.message);
         } else {
            // console.log(responseData.userList);
            const scoreDB = [...responseData.userList];
            const winsDB = [...responseData.userList];
            const gamesDB = [...responseData.userList];
            const rateDB = [...responseData.userList];
            scoreDB.sort(function (a, b) {
               return b.score - a.score;
            });
            winsDB.sort(function (a, b) {
               return b.win - a.win;
            });
            gamesDB.sort(function (a, b) {
               return b.games - a.games;
            });
            rateDB.sort(function (a, b) {
               return b.rate - a.rate;
            });
            setScoreDB(scoreDB);
            setWinsDB(winsDB);
            setGamesDB(gamesDB);
            setRateDB(rateDB);

            setLoading(false);
         }
      } catch (error) {
         console.log(error.message);
      }
     }
     fetchData()
   }, []);

   return (
      <Card className={mod.ScoreCard}>
         {loading && <div className={mod.info}>Se incarca</div>}
         {!loading && (
            <div className={mod.AllLists}>
              <PlayerInfo/>
              <TopScoreList DB={ScoreDB} listType='score' listName='Top 10 - Score'/>
              <TopScoreList DB={WinsDB} listType='win' listName='Top 10 - Wins'/>
              <TopScoreList DB={GamesDB} listType='games' listName='Top 10 - Games'/>
              <TopScoreList DB={RateDB} listType='rate' listName='Top 10 - Rate W/L'/>
            </div>
         )}
      </Card>
   );
}

export default ScorePage;
