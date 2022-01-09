import { useState } from 'react';
import { withRouter} from 'react-router-dom';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './Movies.css';
import './Movies.css';


function Movies (props) {

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
            cards = {props.cards}
            isSaved = {false}
                 
         />

        <MoviesCardList cards={cardsToShow} 
            location = {props.location.pathname} 
            onCardLike = {props.onCardLike}
            serp = {props.serp}
            searchIsDone = {props.searchIsDone}
            query = {props.query}
            isLoading = {props.isLoading}
             />
            {/* <Preloader /> */}
        </main>
        <Footer />
    </section>
    )
}

export default withRouter(Movies);
