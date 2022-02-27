import React from 'react'
import mod from './TopScore.module.css'
import TopScoreItem from './TopScoreItem'

function TopScoreList(props) {
    const type = props.listType;
    let index = 1;
  return (
    <div className={mod.TopScoreList}>
        <div className={mod.ListName}>{props.listName}</div>
        {props.DB.map(item => {
            if (index > 10) {
                return null;
            }
            index++;
        return <TopScoreItem name={item.name} type={item[type]} place={index-1} key={Math.random()}/>})}
    </div>
  )
}

export default TopScoreList