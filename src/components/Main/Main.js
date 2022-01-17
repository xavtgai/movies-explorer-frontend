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
  
    return (<>
 <Header onLogout={props.onLogout} loggedIn = {props.loggedIn} />
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