import '../../index.css';
import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

//import {authorize, register, handleTokenCheck} from '../utils/Auth';
import Header from '../Header/Header';
import Main from '../Main/Main';
import api from '../../utils/api';
//import { CurrentUserContext } from '../contexts/CurrentUserContext';
//import ProtectedRoute from "./ProtectedRoute";
//import {getContent} from '../utils/Auth';

function App(props) {
//карточки
   const [cards, setCards] = React.useState([]);
    
    React.useEffect(() => {
        function getCards () { 
          api.getInitialCards()
          .then((data) => {
                    setCards(data);
                    
          })
          .catch((error) => console.log(error))
        }
        getCards();
      },
      []
      );  
    return (   
    
//      <CurrentUserContext.Provider value={currentUser}>
        
    <div className="page">
        <div className="page__content">
     <Header />
    {/*  <Switch>
          <Route path="/signin" component = {Login}> 
        </Route> 
        <Route path="/signup" component = {Register}> 
        </Route>
        <Route path="/movies" component = {Movies} cards = {cards}> 
        </Route>
        <Route path="/saved-movies" component = {SavedMovies}> 
        </Route>
        <Route path="/profile" component = {Profile}> 
        </Route>
        <Route exact path="/" component = {Main}  > 
        </Route>
     
    </Switch> */}
     
   </div>
</div>
//</CurrentUserContext.Provider>
    );
}

export default withRouter(App);