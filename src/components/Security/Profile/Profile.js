import React from 'react';
import '../Security.css';
import './Profile.css';
import '../../Errors/Errors.css';

import Header from '../../Header/Header';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function Profile(props){
  const currentUser = React.useContext(CurrentUserContext);


    return(

        <section className="auth">
      <Header  onLogout={props.onLogout} loggedIn = {props.loggedIn} />
      
      <div className="profile__form">
              <p className="profile__title">
              
          Привет, {currentUser.name}!
        </p>
        <p className='profile__field profile__name'><span className='profile__field_title'>Имя</span><span className='profile__field_value'>{currentUser.name}</span></p>
        <p className='profile__field'><span className='profile__field_title'>E-mail</span><span className='profile__field_value'>{currentUser.email}</span></p>

            <div className="profile__actions">
              <button className="profile__edit" onClick = {props.onEditProfile}>Редактировать</button>
              <button className="profile__logout" onClick = {props.onLogout} >Выйти из аккаунта</button>
            </div>
        </div>
        </section>
    )
  }

  export default Profile;