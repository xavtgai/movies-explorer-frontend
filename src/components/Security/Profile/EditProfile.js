import {useContext, useState, useEffect} from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import './EditProfile.css';

function EditProfilePopup (props) {
  
const currentUser = useContext(CurrentUserContext);


// const {isValid} =
//     useValidateForm({name: currentUser.name, email: currentUser.email});
const [name, setName] = useState('');
const [email, setEmail] = useState('');

const [errors, setErrors] = useState({});
const [isValid, setIsValid] = useState(false);
  
const validateField = (e) => {
  const target = e.target;
  const title = target.name;
  setErrors({...errors, [title]: target.validationMessage });
  setIsValid(target.closest("form").checkValidity());
}

const handleChangeName = (e) => {
  validateField(e);
  setName(e.target.value);
}

const handleChangeEmail = (e) => {
  validateField(e);
  setEmail(e.target.value);
}

useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setErrors({});
    setIsValid(false);
  }, [currentUser, props.isOpen]); 

 
function activateButton() {
  let buttonSave = document.getElementById('saveProfile');
  buttonSave.removeAttribute('disabled');
  buttonSave.classList.add('popup__save');
  buttonSave.classList.remove('popup__save_inactive');
}

function disableButton() {
  let buttonSave = document.getElementById('saveProfile');
  buttonSave.setAttribute('disabled', '');
  buttonSave.classList.remove('popup__save');
  buttonSave.classList.add('popup__save_inactive');
}

useEffect(()=> {
  if ((name === currentUser.name && email === currentUser.email) || !isValid)
  disableButton()
  else { activateButton()}
  }, [name, email, currentUser.name, currentUser.email, isValid, props.isOpen])


function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      email: email,
    });
    
  } 
  
return (
<div className={`popup popup_type_profile ${props.isOpen ? 'popup_visible': ''}`}>
<div className="popup__content">
<button className="popup__close-button" type="button" onClick={props.onClose}/>
          <form action="action" className="popup__form" name='profile' onSubmit={handleSubmit} onClose={props.onClose}>
              <h2 className="popup__title">Редактировать профиль</h2>
                <input className="popup__field" type="text" value={name || ''} onChange={handleChangeName} placeholder="Имя" name="username" maxLength={40} minLength={2} required id="name" />
                <span className={`popup__error ${errors.username && 'error__field'}`}>{errors.username}</span>
                <input className="popup__field" type="email" value={email || ''} onChange={handleChangeEmail} placeholder="email" name="email" maxLength={200} minLength={4} required id="email"  />
                <span className= {`popup__error ${errors.email && 'popup__field_error'}`}> {errors.email}</span>
              <button className="popup__save" type="submit" aria-label="Cохранить изменения"  id='saveProfile' className='popup__save_inactive' disabled>Сохранить</button>
                  </form>
        </div>
 </div>         

);


}

export default EditProfilePopup;