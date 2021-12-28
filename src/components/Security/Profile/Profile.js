import React from 'react';
import '../Security.css';
import './Profile.css';

import Header from '../../Header/Header';
import {MAIN_PAGE} from '../../../utils/constants';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function Profile(){
  const currentUser = React.useContext(CurrentUserContext);


    return(

        <section className="auth">
      <Header />
      
      <div className="profile__form">
              <p className="profile__title">
              
          Привет, {currentUser.name}!
        </p>
        <p className='profile__field profile__name'><span className='profile__field_title'>Имя</span><span className='profile__field_value'>{currentUser.name}</span></p>
        <p className='profile__field'><span className='profile__field_title'>E-mail</span><span className='profile__field_value'>{currentUser.email}</span></p>

            <div className="profile__actions">
              <button className="profile__edit">Редактировать</button>
              <a href={`${MAIN_PAGE}signout`} className='profile__logout'>Выйти из аккаунта</a>
            </div>
        </div>
        </section>
    )
  }

  export default Profile;