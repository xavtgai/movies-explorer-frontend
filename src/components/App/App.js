import '../../index.css';
import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import Login from '../Security/Login/Login';
import Register from '../Security/Register/Register.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Profile from '../Security/Profile/Profile';
import NotFoundPage from '../Navigation/Notfound';


//import {authorize, register, handleTokenCheck} from '../utils/Auth';
//import Header from '../Header/Header';

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
          api.getCards()
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
    <Switch>
     <Route path="/movies" >
       <Movies cards = {cards} /> 
        </Route>
        <Route path="/signin" component = {Login} >
         </Route>
        <Route path="/signup" component = {Register} >
         </Route>
         <Route path="/profile" component = {Profile} >
         </Route>
         <Route path="/saved-movies" >
         <SavedMovies cards = {cards} /> 
         </Route>
         
     <Route exact path="/"  >
       <Main /> 
        </Route>

          {/* 
                  <Route path="/signup" component = {Register}> 
        </Route>
        
        <Route path="/saved-movies" component = {SavedMovies}> 
        </Route>
        <Route path="/profile" component = {Profile}> 
        </Route> */}
  
  <Route component={NotFoundPage} />
    </Switch> 
    
    
</div>
//</CurrentUserContext.Provider>
    );
}

export default withRouter(App);