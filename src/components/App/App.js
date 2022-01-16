import '../../index.css';
import React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import Login from '../Security/Login/Login';
import Register from '../Security/Register/Register.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Profile from '../Security/Profile/Profile';
import NotFoundPage from '../Navigation/Notfound';
import { BASE_URL, SHORT_FILM_DURATION } from '../../utils/constants';
import { authorize, register } from '../../utils/Auth';
import Main from '../Main/Main';
import api from '../../utils/MainApi';
import movie_api from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../../utils/ProtectedRoute";
import EditProfilePopup from '../Security/Profile/EditProfile';
import ProfileUpdatedPopup from '../Security/Profile/ProfileUpdatedPopup';
import RegistrationFailedPopup from '../Security/RegistrationFailedPopup';

function App(props) {

const [currentUser , setCurrentUser] = React.useState(() => {
  try {
    const item = localStorage.getItem('currentUser');
    return item ? JSON.parse(item) : {};
  } catch (error) {
    console.log(error, "err");
    return {};
  }
});

const [authorizeStatus, setAuthorizeStatus] = React.useState(false);
const [recieveServerAnswer, setRecieveServerAnswer] = React.useState(false);

const checkToken = React.useCallback(() => {
  return fetch(`${BASE_URL}/users/me`, {
     method: 'GET',
    headers: {
      'Content-Type': 'application/json',      
    },
    credentials: 'include',
  })
  .then((res) => {
     if (res.status === 200) {
      setAuthorizeStatus(true);
      setRecieveServerAnswer(true);
    }
    else if (res.status === 401)
    {
      setAuthorizeStatus(false);
      setRecieveServerAnswer(true);
    }
  })
  .catch((err) => {
    console.log(err, "error");
    setAuthorizeStatus(false);
    setRecieveServerAnswer(true);
  
  });
}, [setAuthorizeStatus]);

React.useEffect(() => {
  checkToken();
 
}, [checkToken]);


React.useEffect(() => {
  if (authorizeStatus) {
    api
      .myData()
      .then((data) => {setCurrentUser(data.data);
        localStorage.setItem('currentUser', JSON.stringify(data.data));
      })
      .catch((err) => console.log('Не могу получить данные о пользователе с сервера', err));
    movie_api.getInitialCards()
    .then((data) => {
              setCards(data);
    })
    .catch((err) => console.log('Не могу получить фильмы с сервера', err));
   }
}, [authorizeStatus, setCurrentUser]);

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
  [setEmail, props.history]
);

const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
function handleEditProfileClick () {
  setIsEditProfilePopupOpen(true);
}

const [isProfileUpdated, setIsProfileUpdated] = React.useState(false);
function handleUpdateProfile () {
  setIsProfileUpdated(true)
  setTimeout(() => {
   setIsProfileUpdated(false);
 }, 2000);
   }

const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(true);

function handleRegistration (registrationData) {
  register(registrationData.password, registrationData.email, registrationData.name )
  .then((data) => {
    setIsRegistrationSuccessful(true);
    
    setCurrentUser(data.data);
    handleLogin({password: registrationData.password, email: registrationData.email});
     })
    .catch(err => {
      setIsRegistrationSuccessful(false);
      console.log(err);
           });
  }

function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsProfileUpdated(false);
    setIsRegistrationSuccessful(true);
  }  
  
  function handleUpdateUser (userData) {    

    api.profileEdit(userData.name, userData.email)
           .then((data) => {       
             setCurrentUser(data.data);
             closeAllPopups ();
              handleUpdateProfile();
             
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

React.useEffect(() => {
  if (Object.keys(currentUser).length !== 0) {
    setSavedCards(cards.filter(item => currentUser.likedFilms.includes(item.id)));
  }
}, [currentUser, cards]);

  function handleCardLike(card) {
      // проверяем, есть ли уже лайк на этой карточке
     const isLiked = currentUser.likedFilms.some(i => i === card.id);
    api.changeLike(card.id, isLiked)
      .then((renewedUser) => {
        //  список лайков текущего пользователя обновился, поэтому обновляем текущего пользователя и соотве
          setCurrentUser(renewedUser);
        })
      }
    
const [films, setFilms] = React.useState([]);
const [savedSearchedFilms, setSavedSearchedFilms] = React.useState([]);

const [searchIsDone, setSearchIsDone] = React.useState(false);
const [searchSavedIsDone, setSearchSavedIsDone] = React.useState(false);

const [query, setQuery] = React.useState('');
const [savedQuery, setSavedQuery] = React.useState('');
const [isLoading, setIsLoading] = React.useState(false);
const [filterShort, setFilterShort] = React.useState(false);

function rememberFilms(foundCards, filterShort, searchQuery){
  localStorage.setItem('searchResults', JSON.stringify(foundCards));
  localStorage.setItem('filterState', filterShort);
  localStorage.setItem('searchQuery', searchQuery);

}

function searchFilm (isSaved, filterShort) {
  let searchQuery = document.querySelector('.search__field').value.toLowerCase();
  let searchDomain = cards;
  setIsLoading(true);
  if (filterShort) {searchDomain = cards.filter((card) => { return card.duration < SHORT_FILM_DURATION})};
  if (isSaved) {searchDomain = savedCards};
  
  if (isSaved && filterShort) {
    searchDomain = savedCards.filter((card) => { return card.duration < SHORT_FILM_DURATION});
    
};
  
  const foundCards = searchDomain.filter(function (card) {
    let ruName = '';
    let enName = '';
    if (card.nameRU) {ruName = card.nameRU.toLowerCase()} 
    if (card.nameEN) {enName = card.nameEN.toLowerCase()}
    return (ruName.includes(searchQuery) || enName.includes(searchQuery))
     });
  
  if (isSaved) {
     setSavedSearchedFilms(foundCards);
    setSearchSavedIsDone(true);
    setSavedQuery(searchQuery);
    }
  else {
    setFilms(foundCards); 
    setSearchIsDone(true); 
    setQuery(searchQuery);
    rememberFilms(foundCards, filterShort, searchQuery);
  };
  setIsLoading(false);
 

  }
 
 function handleLogout() {
        api.logout()
        .then((data) => {
          if (data){
            setAuthorizeStatus(false);
            localStorage.clear();
            props.history.push('/');
           }
      }).catch(err => console.log(err)); 
   }
  

   
  if (recieveServerAnswer)
    {return (   
    
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
              searchIsDone = {searchIsDone}
              query = {query}
              isLoading = {isLoading}
              filterShorts = {filterShort}
              >
              </ProtectedRoute>
      <ProtectedRoute path="/saved-movies" component = {SavedMovies} 
                loggedIn={authorizeStatus}
                cards = {savedCards}
                serp = {savedSearchedFilms}
                onCardLike = {handleCardLike}
                searchQuery = {searchFilm}
                searchIsDone = {searchSavedIsDone}
                query = {savedQuery}
                isLoading = {isLoading}
                >
       </ProtectedRoute>
      {!authorizeStatus && <Route path="/signin"> 
          <Login onLogin = {handleLogin} /> 
       </Route>}
       {!authorizeStatus &&  <Route path="/signup"> 
            <Register  onRegister = {handleRegistration} />
      </Route>
      }
     <Route exact path="/"  >
         <Main onLogout = {handleLogout} loggedIn = {authorizeStatus} /> 
      </Route>

 
  <Route component={NotFoundPage} />
    </Switch> 
    <EditProfilePopup 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups} 
      onUpdateUser={handleUpdateUser }/> 

      <ProfileUpdatedPopup
      isOpen = {isProfileUpdated}
      onClose={closeAllPopups} 
      />
          <RegistrationFailedPopup
      isOpen = {!isRegistrationSuccessful}
      onClose={closeAllPopups} 
      />
    
</div>
</CurrentUserContext.Provider>
    );
    }
    else {
      return null
    }
}

export default withRouter(App);