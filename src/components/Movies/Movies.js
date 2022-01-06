import { useEffect, useState } from 'react';
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
    console.log("serp", props.serp);
    let cardsToShow = props.cards;
    console.log("cards", props.cards);
    props.searchIsDone ? cardsToShow = props.serp : cardsToShow = props.cards;
    console.log("props query", props.query);
    if (props.serp.length !== 0) {
        cardsToShow = props.serp    
    }

    if (toFilter) {
        cardsToShow = shortFilms;
        console.log(filterShorts);
        console.log(cardsToShow);
    } 


    return (
        <section className='movies'>
            <Header onLogout={props.onLogout} loggedIn = {props.loggedIn} />
            <main className='content'> 
                    
        <SearchForm filterShorts= {filterShorts} 
        searchQuery = {props.searchQuery}
         cards = {props.cards}
         search = {props.search}
         
         
         />

        <MoviesCardList cards={cardsToShow} 
            location = {props.location.pathname} 
            onCardLike = {props.onCardLike}
            serp = {props.serp}
            searchIsDone = {props.searchIsDone}
            query = {props.query}
             />
            {/* <Preloader /> */}
        </main>
        <Footer />
    </section>
    )
}

export default withRouter(Movies);
