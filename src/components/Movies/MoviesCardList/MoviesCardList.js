import React from 'react';
import './MoviesCardList.css';
import Film from '../MoviesCard/MoviesCard';

function MoviesCardList (props) {
    const initialMovies = props.cards.slice(0, 12);
    const allFilms = props.cards;
 //   const shortFilms = props.cards.filter((card) => {if (card.duration < 60) {return card}});
    
    
    return (
<section className='movies__frame'>
        <ul className="movies__list">
              { 
              initialMovies.map((card) => (
            <Film 
                key = {card.id}
                 card={card} 
                 url = {props.location}
            />
            )
            )
        }
        </ul>
        <button className='movies__add-more'>Ещё</button>
        </section>
    ) 
}

export default MoviesCardList;