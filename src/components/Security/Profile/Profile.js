import React from 'react';
import '../Security.css';
import './Profile.css';

import Header from '../../Header/Header';
import {MAIN_PAGE} from '../../../utils/constants';


function profile(){
    return(

        <section className="auth">
      <Header />
      <div className="profile__form">
              <p className="profile__title">
          Привет, Username!
        </p>
        <p className='profile__field profile__name'><span className='profile__field_title'>Имя</span><span className='profile__field_value'>Username</span></p>
        <p className='profile__field'><span className='profile__field_title'>E-mail</span><span className='profile__field_value'>vasya@hotmail.com</span></p>

            <div className="profile__actions">
              <button className="profile__edit">Редактировать</button>
              <a href={`${MAIN_PAGE}signout`} className='profile__logout'>Выйти из аккаунта</a>
            </div>
        </div>
        </section>
    )
  }

  export default profile;