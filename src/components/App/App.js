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
import EditProfilePopup from '../Security/Profile/EditProfile';

//import {getContent} from '../utils/Auth';

function App(props) {

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

const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
function handleEditProfileClick () {
  setIsEditProfilePopupOpen(true);
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
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }  
  
  function handleUpdateUser (userData) {    

    api.profileEdit(userData.name, userData.email)
           .then((data) => {       
             setCurrentUser(data.data);
             closeAllPopups ()
   })
   .catch((error) => console.log(error))
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

const [savedCards, setSavedCards] = React.useState([]);
  
React.useEffect(()=> {

  function getSavedCards(cards, currentUser){
     setSavedCards(cards.filter(item => currentUser.likedFilms.includes(item.id)));
    } 
    getSavedCards(cards, currentUser);
  },
  [cards, currentUser]
);  


   function handleCardLike(card) {
      // проверяем, есть ли уже лайк на этой карточке
     const isLiked = currentUser.likedFilms.some(i => i === card.id);
    api.changeLike(card.id, isLiked)
      .then((renewedUser) => {
        //  список лайков текущего пользователя обновился, поэтому обновляем текущего пользователя и соотве
          setCurrentUser(renewedUser);
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
const [filmsToShow, setFilmsToShow] = React.useState([]);
const [films, setFilms] = React.useState([]);

function searchMovie(films) {
  setFilmsToShow(films);
  console.log('films to show', films);
}

const [searchIsDone, setSearchIsDone] = React.useState(false);
const [query, setQuery] = React.useState('');

function searchFilm () {
  let searchQuery = document.querySelector('.search__field').value.toLowerCase();
  console.log("query", searchQuery);
  const foundCards = cards.filter((i) => i.nameRU.toLowerCase().includes(searchQuery));
  setFilms(foundCards);
  setSearchIsDone(true);
  setQuery(searchQuery);
  console.log("found films", films);
  // setCards(cards.filter((i) => cards.NameRu.toLowerCase().includes(query.toLowerCase())));
}
 console.log("qu", query);


function handleLogout() {
        api.logout()
        .then((data) => {
          if (data){
            setAuthorizeStatus(false);
            props.history.push('/');
           }
      }).catch(err => console.log(err)); 
   }

   
    return (   
    
      <CurrentUserContext.Provider value={currentUser}>
        
    <div className="page">
    <Switch>
      <ProtectedRoute path="/profile" component = {Profile}
       onLogout = {handleLogout} 
       loggedIn = {authorizeStatus}
       onEditProfile = {handleEditProfileClick}
       >
      </ProtectedRoute>
     <ProtectedRoute path="/movies" component = {Movies} 
              loggedIn={authorizeStatus}
              cards = {cards}
              serp = {films}
              onCardLike = {handleCardLike}
              searchQuery = {searchFilm}
              search = {searchMovie}
              searchIsDone = {searchIsDone}
              query = {query}
              >
              </ProtectedRoute>
      <ProtectedRoute path="/saved-movies" component = {SavedMovies} 
                cards = {savedCards}
                loggedIn={authorizeStatus}
                onCardLike = {handleCardLike}
                searchQuery = {searchFilm}
                search = {searchMovie}
                >
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
    <EditProfilePopup 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateUser={handleUpdateUser }/> 
    
</div>
</CurrentUserContext.Provider>
    );
}

export default withRouter(App);