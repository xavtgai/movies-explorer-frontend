import {useState} from 'react';
import { withRouter} from 'react-router-dom';
import Header from '../../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../../Footer/Footer';

function SavedMovies (props) {

    const filterShorts = useState(false);
    const toFilter = filterShorts[0];
    let cardsToShow = props.cards;
    props.searchIsDone ? cardsToShow = props.serp : cardsToShow = props.cards;
    if (props.serp.length !== 0) {
        cardsToShow = props.serp    
    }

    if (toFilter) {
        cardsToShow = cardsToShow.filter((card) => { return card.duration < 60});
      } 
    return (
        <section className='movies'>
        
        <Header onLogout={props.onLogout} loggedIn = {props.loggedIn} />
        <main className='content'>
        <SearchForm 
                filterShorts= {filterShorts} 
                searchQuery = {props.searchQuery} 
                isSaved = {true}
                cards = {props.cards}
                search = {props.search}
                 />

        <MoviesCardList cards={cardsToShow} 
        location = {props.location.pathname} 
        onCardLike = {props.onCardLike}
        serp = {props.serp}
        searchIsDone = {props.searchIsDone}
        query = {props.query}
        savedQuery = {props.query}
        isLoading = {props.isLoading}
        />
        {/* <Preloader /> */}
        </main>
        <Footer />
    </section>)
}

export default  withRouter(SavedMovies);