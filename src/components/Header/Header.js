import React from 'react';
import { Link, NavLink, withRouter} from 'react-router-dom';
import profile_icon from '../../images/profile_icon.svg';
import Navigation from '../Navigation/NavTab/NavTab';
import './Header.css';
import logo from '../../images/logo.svg';
import {useState} from "react";

function Header(props){

    const [isChange, setIsChange] = useState(false);

    function handleToggle () {
      setIsChange(!isChange);
    }

    let loggedIn = props.loggedIn;
    let action;
    let buttonLink;
    let movies = "./movies";
    let saved_movies = './saved-movies';
    let profile_link = './profile';
      
    if (loggedIn) {action = 'Выйти';
        buttonLink = '/';
      } else {
        action = 'Войти';
        buttonLink = "./signin";
       }
     
  return (
<header className="header">
  
    <div 
    className = {props.location.pathname === "/" ?  "header__upper_main" : "header__upper"} 
    >
    <a href='/' className='header__to-main'><img src={logo} alt="Логотип сайта" className="header__logo" /></a>
           
  <div className='header__links'>
    <div className='header__main-links'>
        <NavLink
              to={buttonLink}
              className = {!loggedIn ?  "header__navlink header__registration" :   "header__navlink_invisible"} 
        >
              Регистрация
            </NavLink>
            <Link
              to={buttonLink}
              className = {!loggedIn  ?  "header__button" :   "header__navlink_invisible"} 
            onClick = {props.onLogout}
            >
              {action}
            </Link>
            </div>
            {loggedIn ? 
            <><input className='header__menu_checkbox' id='menu' type="checkbox" checked={isChange} onChange={()=>{}} onClick= {handleToggle}>
            </input>
            <label htmlFor="menu" className='header__menu'></label>

             <div className='header__menu-window' id='menuwindow'>
               <Navigation />
               </div> 
               </>
               : ""
              }
            <div 
         
            className = {!loggedIn ?  "header__navlinks_invisible" :   "header__navlinks"}
            >
              
                <div className='header__movie-links'>
                    <NavLink
                        to={movies}
                        className = {!loggedIn ?  "header__navlink_invisible" : "header__navlink header__films" } 
                      >
                        Фильмы
                      </NavLink>
                      <NavLink
                        to={saved_movies}
                        className = {!loggedIn ?  "header__navlink_invisible" : "header__navlink"} 
                      >
                        Сохранённые фильмы
                      </NavLink>
                </div>

                <NavLink
                  to={profile_link}
                  className = {!loggedIn ?  "header__navlink_invisible" : "header__navlink header__account"} 
                >
                Аккаунт <img src={profile_icon} className='header__profile-icon' alt='Иконка профиля'></img>
                </NavLink>
                </div>
                </div>
            </div>
    </header>)
}

export default withRouter(Header);
