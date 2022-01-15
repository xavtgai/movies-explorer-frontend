import React from 'react';
import logo from '../../../images/logo.svg';
import { Link, withRouter } from 'react-router-dom';
import '../Security.css';
import './Register.css';
import '../../Errors/Errors.css';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {  
        password: '',
      email: '',
      errors: '',
      isValid: false,
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
            minLength={2}
            onChange={this.handleChange} 
            className="auth__form_input"/>
            <span className={`error ${this.state.errors.user_name && 'error__field'}`}>{this.state.errors.user_name}</span>
        
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
            <button type="submit" className={!this.state.isValid ? 'auth__form_button_inactive' : 'register__form_button'} disabled = {!this.state.isValid}>Зарегистрироваться</button>
            <p className='auth__question'>Уже зарегистрированы?<span ><Link to='/signin' className='auth__alternative-action'>Войти</Link></span></p>
            </div>

        </form>

        </div>
        </section>
    )
  }
}
  export default withRouter(Register);