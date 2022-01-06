import React from 'react';
import './MoviesCardList.css';
import Film from '../MoviesCard/MoviesCard';

function MoviesCardList (props) {
    
    const initialMovies = props.cards.slice(0, 12);
    //const allFilms = props.cards;
 //   const shortFilms = props.cards.filter((card) => {if (card.duration < 60) {return card}});
        
    return (
<section className='movies__frame'>
        <div className='movies__serp-title'>
            {props.searchIsDone ?
            props.serp.length === 0 ? `Ничего не найдено по запросу "${props.query}"` : `Результаты поиска по запросу "${props.query}"`
            : null                   
            }
            </div>
        <ul className="movies__list">
              { 
              initialMovies.map((card) => (
            <Film 
                key = {card.id}
                 card={card} 
                 url = {props.location}
                onCardLike = {props.onCardLike}
                
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