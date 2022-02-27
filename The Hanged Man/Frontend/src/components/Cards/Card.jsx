import React from 'react';
import mod from './Card.module.css';

function Card(props) {
  return (
    <div className={`${mod.Card} ${props.className ? props.className: '' }`}>{props.children}</div>
  )
}

export default Card