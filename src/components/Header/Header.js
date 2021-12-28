import React from 'react';
import { Link, NavLink, withRouter} from 'react-router-dom';
import profile_icon from '../../images/profile_icon.svg';
// import {path} from '../../utils/constants';
import Navigation from '../Navigation/NavTab/NavTab';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Header.css';
import logo from '../../images/logo.svg';
import {useState} from "react";

function Header(props){

  const currentUser = React.useContext(CurrentUserContext);
    const [isChange, setIsChange] = useState(false);

    function handleToggle () {
      setIsChange(!isChange);
    }

    let loggedIn = props.loggedIn;
    let action;
    let hello;
    let buttonLink;
    let movies = "./movies";
    let saved_movies = './saved-movies';
    let profile_link = './profile';
      
    let title = currentUser.name;
     if (loggedIn) {action = 'Выйти';
       hello = title;
       buttonLink = '/';
      } else {
        action = 'Войти';
        hello = 'Регистрация';
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
              className = {props.location.pathname === "/" ?  "header__navlink header__registration" :   "header__navlink_invisible"} 
        >
              {hello}
            </NavLink>
            <Link
              to={buttonLink}
              className = {props.location.pathname === "/" ?  "header__button" :   "header__navlink_invisible"} 
            onClick = {props.onLogout}
            >
              {action}
            </Link>
            </div>
            {props.location.pathname !== "/" ? 
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
                  className = {props.location.pathname === "/" ?  "header__navlink_invisible" : "header__navlink header__account"} 
                >
                Аккаунт <img src={profile_icon} className='header__profile-icon' alt='Иконка профиля'></img>
                </NavLink>
                </div>
                </div>
            </div>
    </header>)
}

export default withRouter(Header);
