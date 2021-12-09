import React from 'react';
import logo from '../../../images/logo.svg';
import '../Security.css';
import './Register.css';

function register (){
    return(
        <section className="auth">
      
      <div className="auth__form">
      <img src={logo} className='auth__logo' ></img>  
        <p className="auth__form_title">
          Добро пожаловать!
        </p>
        <form  >
        <p className='auth__form_name'>Имя</p>
          <input 
            id="user_name" 
            required name="user_name" 
            placeholder="Имя" 
            autoComplete="Васисуалий"
            type="text" 
            className="auth__form_input"/>
        
        <p className='auth__form_name'>E-mail</p>
          <input 
            id="email" 
            required name="email" 
            placeholder="Email" 
            autoComplete="email"
            type="text" 
       //     value={this.state.email} 
           className="auth__form_input"/>
         <p className='auth__form_name'>Пароль</p>
          <input 
            id="password" 
            required name="password" 
            placeholder="Пароль" 
            autoComplete = "current-password"
            type="password" 
     //       value={this.state.password} 
            className="auth__form_input"/>
            
            <div className="auth__button-container">
              <button type="submit" className="register__form_button">Зарегистрироваться</button>
              <p className='auth__question'>Уже зарегистрированы?<span ><a href='/signin' className='auth__alternative-action'>Войти</a></span></p>
            </div>

        </form>

        </div>
        </section>
    )
  }

  export default register;