import { useEffect, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { withRouter} from 'react-router-dom';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from './Preloader/Preloader';
import './Movies.css';
import './Movies.css';


function Movies (props) {

    const filterShorts = useState(false);
    const toFilter = filterShorts[0];
    const shortFilms = props.cards.filter((card) => { return card.duration < 60});
    let cardsToShow = props.cards;
    if (filterShorts) {
        cardsToShow = shortFilms;
        console.log(cardsToShow);
    } 


    return (
        <section className='movies'>
            <Header onLogout={props.onLogout} loggedIn = {props.loggedIn} />
            <main className='content'> 
                    
        <SearchForm filterShorts= {filterShorts}/>

        <MoviesCardList cards={cardsToShow} location = {props.location.pathname} />
        {/* <Preloader /> */}
        </main>
        <Footer />
    </section>
    )
}

export default withRouter(Movies);
