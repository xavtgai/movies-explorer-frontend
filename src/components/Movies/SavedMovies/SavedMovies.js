import React from 'react';
import { withRouter} from 'react-router-dom';
import Header from '../../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies (props) {

    return (
        <section className='movies'>
        
        <Header />
        <SearchForm />
        <MoviesCardList cards={props.cards} location = {props.location.pathname} />
        {/* <Preloader /> */}
        <Footer />
    </section>)
}

export default  withRouter(SavedMovies);