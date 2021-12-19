import React from 'react';
//import Card from './Card';
//import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import AboutMe from './AboutMe/AboutMe';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main(props){

 // const currentUser = React.useContext(CurrentUserContext);
   // const cards = props.cards.length ? props.cards : [{"_id": 123, "name": "Loading...", "owner": "61685f395cb2c1a88626898c", "likes": []}];
    return (<>
 <Header />
        <main className="content ">
            <Promo />
           
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
    </main>
    <Footer />
    </>
 )
}

export default Main;