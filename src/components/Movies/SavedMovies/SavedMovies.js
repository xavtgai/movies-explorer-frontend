import {useState} from 'react';
import { withRouter} from 'react-router-dom';
import Header from '../../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies (props) {

    const filterShorts = useState(false);
    const toFilter = filterShorts[0];
    const shortFilms = props.cards.filter((card) => { return card.duration < 60});
    let cardsToShow = props.cards;

    if (toFilter) {
        cardsToShow = shortFilms;
    } 
  
    return (
        <section className='movies'>
        
        <Header onLogout={props.onLogout} loggedIn = {props.loggedIn} />
        <main className='content'>
        <SearchForm filterShorts= {filterShorts} searchQuery = {props.searchQuery} />
        <MoviesCardList cards={cardsToShow} 
        location = {props.location.pathname} 
        onCardLike = {props.onCardLike}
        />
        {/* <Preloader /> */}
        </main>
        <Footer />
    </section>)
}

export default  withRouter(SavedMovies);