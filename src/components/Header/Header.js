import React from 'react';
import { Link, withRouter} from 'react-router-dom';

//import './Header.css';
import logo from '../../images/logo.svg';

function Header(props){
    let loggedIn = false;
    let action;
    let buttonLink = "./signin";

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
  
<img src={logo} alt="Логотип сайта" className="logo" />
    <div className="header__upper">
        
        {loggedIn && props.login ? (
          <p className="header__login">{props.login}</p>
        ) : null}
        <Link
          to={buttonLink}
          onClick={loggedIn ? props.onLogout : null}
          className={`header__button${loggedIn ? ' header__button_dimmed' : ''}`}
        >
          {action}
        </Link>
    </div>

</header>)
}

export default withRouter(Header);
