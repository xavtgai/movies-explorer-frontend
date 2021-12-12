import React from 'react';
import { Link, NavLink, withRouter} from 'react-router-dom';
import profile_icon from '../../images/profile_icon.svg';
import {path} from '../../utils/constants';
import Navigation from '../Navigation/NavTab/NavTab';

import './Header.css';
import logo from '../../images/logo.svg';
import {useState} from "react";

function Header(props){

  
    const [isChange, setIsChange] = useState(false);

    function handleToggle () {
      setIsChange(!isChange);
    }

    let loggedIn = false;
    let action;
    let buttonLink = "./signin";
    let movies = "./movies";
    let saved_movies = './saved-movies';
    let profile_link = './profile';
    let signup = '/signup';
    let signin = '/signin';
    let nav = "petya";
    

    switch (props.location.pathname) {
        case '/signin':
            action = 'Регистрация';
          buttonLink = '/signup';
          break;
    
        case '/signup':
            action = 'Войти';
          break;
    
        default:
            action = 'Выйти';
          loggedIn = true;
          break;
      }

    return (
<header className="header">
  
    <div 
    className = {props.location.pathname === "/" ?  "header__upper_main" : "header__upper"} 
    >
    <img src={logo} alt="Логотип сайта" className="header__logo" />
           
        {/* {loggedIn && props.login ? (
          <p className="header__login">{props.login}</p>
        ) : null} */}
  <div className='header__links'>
        <NavLink
              to={signup}
              className = {props.location.pathname === "/" ?  "header__navlink header__registration" :   "header__navlink_invisible"} 
        >
              Регистрация
            </NavLink>
            <NavLink
              to={signin}
              className = {props.location.pathname === "/" ?  "header__button" :   "header__navlink_invisible"} 
            >
              Войти
            </NavLink>
            
            <input className='header__menu_checkbox' id='menu' type="checkbox" checked={isChange} onChange={()=>{}} onClick= {handleToggle}
            >
            </input>
            <label for="menu" className='header__menu'></label>

             <div className='header__menu-window' id='menuwindow'>
               <Navigation />
               </div>
            <div 
         
            className = {props.location.pathname === "/" ?  "header__navlinks_invisible" :   "header__navlinks"}
            >
              
                <div className='header__movie-links'>
                    <NavLink
                        to={movies}
                        className = {props.location.pathname === "/" ?  "header__navlink_invisible" : "header__navlink header__films" } 
                      >
                        Фильмы
                      </NavLink>
                      <NavLink
                        to={saved_movies}
                        className = {props.location.pathname === "/" ?  "header__navlink_invisible" : "header__navlink"} 
                      >
                        Сохранённые фильмы
                      </NavLink>
                </div>

                <NavLink
                  to={profile_link}
                  className = {props.location.pathname === "/" ?  "header__navlink_invisible" : "header__navlink"} 
                >
                Аккаунт <img src={profile_icon} className='header__profile-icon'></img>
                </NavLink>
                </div>
                </div>
            </div>
    </header>)
}

export default withRouter(Header);