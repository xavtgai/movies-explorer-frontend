import React from 'react';
import { withRouter} from 'react-router-dom';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from './Preloader/Preloader';
import './Movies.css';
import './Movies.css';


function Movies (props) {
    return (
        <section className='movies'>
            <Header />
            <main className='content'> 
                    
        <SearchForm />
        <MoviesCardList cards={props.cards} location = {props.location.pathname} />
        {/* <Preloader /> */}
        </main>
        <Footer />
    </section>
    )
}

export default withRouter(Movies);
