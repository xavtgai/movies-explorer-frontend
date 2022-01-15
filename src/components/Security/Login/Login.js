import React from 'react';
import logo from '../../../images/logo.svg';
import '../Security.css';
import './Login.css';
import { withRouter } from 'react-router-dom';
import '../../Errors/Errors.css';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: '',
      isValid: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
 
  _validateField = (e) => {
  const target = e.target;
  const title = target.name;
  this.setState({errors: {[title]: target.validationMessage} });
  this.setState({isValid: target.closest("form").checkValidity() })
}

  handleChange(e) {
    const {name, value} = e.target;
    this._validateField(e);
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
            type="email" 
            value={this.state.email} 
            onChange={this.handleChange}
           className="auth__form_input"/>
           <span className={`error ${this.state.errors.email && 'error__field'}`}>{this.state.errors.email}</span>
         <p className='auth__form_name'>Пароль</p>
          <input 
            id="password" 
            required name="password" 
            placeholder="Пароль" 
            autoComplete = "current-password"
            type="password" 
            minLength={8}
            value={this.state.password}
            onChange={this.handleChange} 
            className="auth__form_input"/>
            <span className={`error ${this.state.errors.password && 'error__field'}`}>{this.state.errors.password}</span>
            
            <div className="auth__button-container">
              <button type="submit" className={!this.state.isValid ? 'auth__form_button_inactive' : 'login__form_button'} disabled = {!this.state.isValid}>Войти</button>
              <p className='auth__question'>Ещё не зарегистрированы?<span ><a href='/signup' className='auth__alternative-action'>Регистрация</a></span></p>
            </div>

        </form>

        </div>
        </section>
    )
  }
}

export default withRouter(Login);