import React from 'react';
import logo from '../../../images/logo.svg';
import '../Security.css';
import './Login.css';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
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
  handleSubmit(e){
    e.preventDefault();
  if (!this.state.email || !this.state.password){
    return;
  }
  this.props.onLogin({
    password: this.state.password,
    email: this.state.email,
  });
  this.setState({email: '', password: ''});
} 

  render(){
    return(
        <section className="auth">
      
      <div className="auth__form">
      <div className='auth__header'>
      <a href='/' className='auth__to-main'><img src={logo} alt='Логотип' /> </a>  
        <p className="auth__form_title">
          Рады видеть!
        </p>
        </div>
        <form   onSubmit={this.handleSubmit} >
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
              <button type="submit" className="login__form_button">Войти</button>
              <p className='auth__question'>Ещё не зарегистрированы?<span ><a href='/signup' className='auth__alternative-action'>Регистрация</a></span></p>
            </div>

        </form>

        </div>
        </section>
    )
  }
}

export default withRouter(Login);