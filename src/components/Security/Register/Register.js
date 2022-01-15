import React from 'react';
import logo from '../../../images/logo.svg';
import { Link, withRouter } from 'react-router-dom';
import '../Security.css';
import './Register.css';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
        password: '',
      email: '',
     }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value 
    });
  }

   handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    this.props.onRegister({
      password: this.state.password,
      email: this.state.email,
      name: this.state.user_name,
    });
    
  } 
      
 render(){
     
    return(
        <section className="auth">
      
      <div className="auth__form">
        <div className='auth__header'>
        <a href='/' className='auth__to-main'><img src={logo} className='auth__logo' alt='Логотип' ></img></a>  
        <p className="auth__form_title">
          Добро пожаловать!
          
        </p>
        </div>
        <form  onSubmit={this.handleSubmit}>
          
        <p className='auth__form_name'>Имя</p>
          <input 
            id="user_name" 
            required name="user_name" 
            placeholder="Имя" 
            autoComplete="Васисуалий"
            type="text" 
            value={this.state.name}
            onChange={this.handleChange} 
            className="auth__form_input"/>
        
        <p className='auth__form_name'>E-mail</p>
          <input 
            id="email" 
            required name="email" 
            placeholder="Email" 
            autoComplete="email"
            type="text" 
            value={this.state.email}
            onChange={this.handleChange} 
           className="auth__form_input"/>
         <p className='auth__form_name'>Пароль</p>
          <input 
            id="password" 
            required name="password" 
            placeholder="Пароль" 
            autoComplete = "current-password"
            type="password" 
            value={this.state.password} 
            onChange={this.handleChange}
            className="auth__form_input"/>
            
            <div className="auth__button-container">
              <button type="submit" className="register__form_button">Зарегистрироваться</button>
              <p className='auth__question'>Уже зарегистрированы?<span ><Link to='/signin' className='auth__alternative-action'>Войти</Link></span></p>
            </div>

        </form>

        </div>
        </section>
    )
  }
}
  export default withRouter(Register);