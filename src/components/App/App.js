import '../../index.css';
import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import Login from '../Security/Login/Login';
import Register from '../Security/Register/Register.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Profile from '../Security/Profile/Profile';
import NotFoundPage from '../Navigation/Notfound';

import {authorize, register, handleTokenCheck} from '../../utils/Auth';
import Main from '../Main/Main';
import api from '../../utils/MainApi';
import movie_api from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../../utils/ProtectedRoute";
//import {getContent} from '../utils/Auth';

function App(props) {

const [loggedIn, setLoggedIn] = React.useState(false);
const [currentUser , setCurrentUser] = React.useState({});
React.useEffect(() => {
  function getUser () {      
     api.myData()
            .then((data) => {   
              setCurrentUser(data.data);
    })
    .catch((error) => console.log(error))
  }
  getUser()
},
[]
);  

const [authorizeStatus, setAuthorizeStatus] = React.useState(false);
const [email, setEmail] = React.useState('email');

const handleLogin = React.useCallback(
  loginData => {
  authorize(loginData.email, loginData.password)
    .then((data) => {
      if (data){
        setEmail(loginData.email);
        setAuthorizeStatus(true);
        props.history.push('/movies');
        }
  }).catch(err => console.log(err)); 
},
  [setEmail]
);

React.useEffect(() => {
  handleTokenCheck()
    .then((data)=> setAuthorizeStatus(true))
      .catch(err => console.log(err));
}, [handleTokenCheck]);

const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
}

const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
function handleEditProfileClick () {
  setIsEditProfilePopupOpen(true);
}

const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
function handleAddPlaceClick () {
  setIsAddPlacePopupOpen(true);
}
const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] = React.useState(false);
function handleDeleteConfirmationClick () {
  setIsDeleteConfirmationPopupOpen(true);
}
const [selectedCard, setSelectedCard] = React.useState(null);

function handleCardClick(cardParams) {
    setSelectedCard(cardParams);
  }

const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(true);

function handleRegistration (registrationData) {
  register(registrationData.password, registrationData.email, registrationData.name )
  .then(() => {
    setIsRegistrationSuccessful(true);
    setAuthorizeStatus(true);
    props.history.push('/movies');
     })
    .catch(err => {
      setIsRegistrationSuccessful(false);
      console.log(err);
           });
  
}

function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);

  }  
  
  function handleUpdateUser (userData) {    

    api.profileEdit(userData.name, userData.about)
           .then((data) => {       
             setCurrentUser(data.data);
             closeAllPopups ()
   })
   .catch((error) => console.log(error))
 }
   
 function handleUpdateAvatar (data) {
  api.avatarReplace(data.avatar)
         .then((data) => {   
           console.log(data);    
           setCurrentUser(data.data);
           closeAllPopups ()
 })
 .catch((error) => console.log(error))
console.log(currentUser);
}  
//карточки
const [cards, setCards] = React.useState([]);

React.useEffect(() => {
    function getCards () { 
      movie_api.getInitialCards()
      .then((data) => {
                setCards(data);
                
      })
      .catch((error) => console.log(error))
    }
    getCards();
  },
  []
  );  

  function handleAddPlaceSubmit(newCard) {    

    api.addCard(newCard.name, newCard.link)
           .then((newCard) => { 
             console.log("cards", cards);      
            setCards([newCard, ...cards]); 
            closeAllPopups ()
   })
   .catch((error) => console.log(error))
      }

  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке

   const isLiked = card.likes.some(i => i === currentUser._id);

   api.changeLike(card._id, isLiked)
    .then((newCard) => {
         console.log("newcard", newCard);
         setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
       })
    }
   
function handleCardDelete (card) {  
api.deleteCard(card._id)
    .then(() => {
      setCards(cards.filter((i) => i !== card));
    })
    .catch((error) => {
      console.log(error);
    })
}

function handleLogout() {
        api.logout()
        .then((data) => {
          if (data){
            setAuthorizeStatus(false);
            props.history.push('/signin');
           }
      }).catch(err => console.log(err)); 
   }

    return (   
    
      <CurrentUserContext.Provider value={currentUser}>
        
    <div className="page">
    <Switch>
      <ProtectedRoute path="/profile" component = {Profile} onLogout = {handleLogout} loggedIn = {authorizeStatus}>
      </ProtectedRoute>
     <ProtectedRoute path="/movies" component = {Movies} loggedIn={authorizeStatus}  cards = {cards}>
              </ProtectedRoute>
      <ProtectedRoute path="/saved-movies" component = {SavedMovies} cards = {cards} loggedIn={authorizeStatus}>
            </ProtectedRoute>
      <Route path="/signin"> 
          <Login onLogin = {handleLogin}/>
     </Route>
      <Route path="/signup"> 
            <Register  onRegister = {handleRegistration} />
      </Route>
     <Route exact path="/"  >
         <Main onLogout = {handleLogout} loggedIn = {authorizeStatus} /> 
      </Route>

 
  <Route component={NotFoundPage} />
    </Switch> 
    
    
</div>
</CurrentUserContext.Provider>
    );
}

export default withRouter(App);