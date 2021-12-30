import React from 'react';
//import {BASE_DOMAIN} from '../../../utils/constants';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import './MoviesCard.css';

function Film(props) {
  console.log(props.card);
  const currentUser = React.useContext(CurrentUserContext);
  function handleCardClick () {
        props.onCardClick(props.card)        
    }

    function toggleLike () {
      props.onCardLike(props.card);
          
  }
    function removeFilm () {
      props.onRemoveFilm(props.card);
    }
  
  const Duration = (duration) => {
    if (duration > 60) {
      return `${Math.round(duration/60)} ч ${duration%60} мин`
    } 
    else {return `${duration%60} мин` } 
      }

return (    
    <li className="film">

            <a href={props.card.trailerLink} target='_blank' rel='noreferrer' class='film__trailer'><img className="film__image" src={'https://api.nomoreparties.co' + props.card.image.url} alt={`Изображение ${props.card.nameRU}`}  /></a>
            <div className="film__legend">

              <h2 className="film__title">{props.card.nameRU}</h2>
              <button type="button"
              className = {props.url === "/movies" ?  "film__like" : "film__delete"} 
              onClick = {props.url === "/movies" ? toggleLike : removeFilm}
              >

              </button>
            </div>
               <p className='film__duration'>{Duration(props.card.duration)}</p>
    </li>
    
    );
}

           
    
    export default Film; 