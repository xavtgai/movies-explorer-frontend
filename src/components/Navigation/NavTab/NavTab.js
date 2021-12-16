import React from 'react';
import './NavTab.css';

import { Link } from 'react-router-dom';
import profile_icon from '../../../images/profile_icon.svg';

function Navigation (props) {

    return (
        <section className='navigation' id='navig'>
            <button className='close__button' id='button' onClick={() => {let element = 
                    document.getElementById("navig");
                    element.classList.add("navigation__hidden");}}>
                        </button>
            <div className='navigation__links'>
                <Link to='/' className = "navigation__item" > Главная </Link>
                <Link to='/movies' className = "navigation__item" > Фильмы </Link>
                <Link to='/saved-movies' className = "navigation__item" > Сохранённые фильмы </Link>
            
                <Link
                  to='/profile'
                  className = "navigation__item navigation__account" 
                >
                Аккаунт <img src={profile_icon} className='header__profile-icon' alt='Иконка профиля'></img>
                </Link>
            </div>   
        </section>
    )
}

export default Navigation;