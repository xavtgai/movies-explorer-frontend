import React from 'react';
//import {BASE_DOMAIN} from '../../../utils/constants';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import './MoviesCard.css';

function Film(props) {
  const currentUser = React.useContext(CurrentUserContext);


    function toggleLike () {
      props.onCardLike(props.card);
               
  }
  
  const Duration = (duration) => {
    if (duration >= 60) {
      return `${Math.round(duration/60)} ч ${duration%60} мин`
    } 
    else {return `${duration%60} мин` } 
      }
    
    const isLiked = () => {
      if (currentUser.likedFilms !==[]) {return currentUser.likedFilms.some(i => i === props.card.id)}
      else {
        return false;
      }
    }
    const filmLikeButtonClassName = (
      `${isLiked() ? 'film__liked' : 'film__like'}`
       );
    
return (    
    <li className="film">

            <a href={props.card.trailerLink} target='_blank' rel='noreferrer' className='film__trailer'><img className="film__image" src={'https://api.nomoreparties.co' + props.card.image.url} alt={`Изображение ${props.card.nameRU}`}  /></a>
            <div className="film__legend">
              <h2 className="film__title">{props.card.nameRU}</h2>
              <button type="button" id = 'like-button'
              className = {props.url === "/movies" ?  filmLikeButtonClassName : "film__delete"} 
              onClick = { toggleLike }
              >

              </button>
            </div>
               <p className='film__duration'>{Duration(props.card.duration)}</p>
    </li>
    
    );
}

           
    
    export default Film; 