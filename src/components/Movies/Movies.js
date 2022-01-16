import { useState } from 'react';
import { withRouter} from 'react-router-dom';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';
import './Movies.css';
import { SHORT_FILM_DURATION } from '../../utils/constants';


function Movies (props) {

    const filmsFromStorage = JSON.parse(localStorage.getItem('searchResults'));
    const filterStateFromStorage = JSON.parse(localStorage.getItem('filterState'));
    const queryFromStorage = localStorage.getItem('searchQuery');
    

    const filterShorts = useState(false);
    
    const toFilter = filterStateFromStorage ? filterStateFromStorage : filterShorts[0];
    
    let cardsToShow = props.cards;
    queryFromStorage ? cardsToShow = filmsFromStorage : cardsToShow = props.cards;
    if (props.serp.length !== 0) {
        cardsToShow = props.serp    
    }

    if (toFilter) {
        cardsToShow = cardsToShow.filter((card) => { return card.duration < SHORT_FILM_DURATION});
    } 

   return (
        <section className='movies'>
            <Header onLogout={props.onLogout} loggedIn = {props.loggedIn} />
            <main className='content'> 
                    
        <SearchForm 
            filterShorts= {filterShorts} 
            searchQuery = {props.searchQuery}
            cards = {props.cards}
            isSaved = {false}
            filterStateFromStorage = {filterStateFromStorage}
                 
         />

        <MoviesCardList cards={cardsToShow} 
            location = {props.location.pathname} 
            onCardLike = {props.onCardLike}
            serp = {props.serp}
            searchIsDone = {props.searchIsDone}
            query = {queryFromStorage}
            isLoading = {props.isLoading}
            
             />
            
        </main>
        <Footer />
    </section>
    )
}

export default withRouter(Movies);
