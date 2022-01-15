import React from 'react';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import Film from '../MoviesCard/MoviesCard';

function MoviesCardList (props) {
    const initialCardNum = React.useRef(12);
    
    const initialMovies = props.cards.slice(0, initialCardNum.current);

  const [needMoreFilms, setNeedMoreFilms] = React.useState(false);
 function addFilms() {
     setNeedMoreFilms(true); 
 }

 React.useEffect(() => {
     if (needMoreFilms) {   
        let availableWidth = window.screen.width;
        if (availableWidth > 1150)
           { initialCardNum.current+=3;
            setNeedMoreFilms(false);
            }
        else if (availableWidth > 700) 

            { if (initialCardNum.current %2 ===0)
                {initialCardNum.current+=2;
                setNeedMoreFilms(false);}
              else {
                initialCardNum.current+=3;
                setNeedMoreFilms(false);
              }
             }
        else 
             { initialCardNum.current+=1;
              setNeedMoreFilms(false);
              }
        }     
          
    }, 
[needMoreFilms]);

let query = '';
if (props.location === '/movies') query = props.query;
if (props.location === '/saved-movies') query = props.savedQuery;

const searchResults = localStorage.getItem('searchResults') ? JSON.parse(localStorage.getItem('searchResults')) : [];

    return (
<section className='movies__frame'>
    {props.isLoading ? <Preloader /> : 
        <div className='movies__serp-title'>
            {props.searchIsDone && query != '' ?
            (searchResults.length === 0)  ? `Ничего не найдено по запросу "${props.query}"` : `Результаты поиска по запросу "${props.query}"`
            : null                   
            }
            {console.log(props.serp, 'serp', query, localStorage.getItem('searchResults'))}
            </div>
    }
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
        <button onClick={addFilms} className = { initialCardNum.current <= initialMovies.length 
            ? 'movies__add-more' : 'movies__button-invisible'} >Ещё</button>
        
            </section>
    
    ) 
}

export default MoviesCardList;