import React from 'react';
//import {BASE_DOMAIN} from '../../../utils/constants';
import './MoviesCard.css';

function Film(props) {
  const Duration = (duration) => {
    if (duration > 60) {
      return `${Math.round(duration/60)} ч ${duration%60} мин`
    } 
    else {return `${duration%60} мин` } 
      }

return (    
    <li className="film">

            <img className="film__image" src={'https://api.nomoreparties.co' + props.card.image.url} alt={`Изображение ${props.card.nameRU}`}  />
            <div className="film__legend">

              <h2 className="film__title">{props.card.nameRU}</h2>
              <button type="button"
              className = {props.url === "/movies" ?  "film__like" : "film__delete"} 
              ></button>
            </div>
               <p className='film__duration'>{Duration(props.card.duration)}</p>
    </li>
    
    );
}

           
    
    export default Film; 