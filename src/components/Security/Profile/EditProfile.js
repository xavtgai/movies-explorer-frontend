import {useContext, useState, useEffect} from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import './EditProfile.css';

function EditProfilePopup (props) {
  
const currentUser = useContext(CurrentUserContext);

const [name, setName] = useState('');
const [email, setEmail] = useState('');

useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
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

const handleChangeName = (e) => {
  setName(e.target.value);
  if (e.target.value.length > 1 && e.target.value.length < 41) {
    activateButton()
  }
}

const handleChangeEmail = (e) => {
  setEmail(e.target.value);
  if (e.target.value.length > 4 && e.target.value.length < 201) {
    activateButton()}
}


function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик

    if (name === currentUser.name && email === currentUser.email)
    { disableButton();
      console.log('the data has not changed');
      //И какую-нибудь ошибку пользователю показать. 
    } else {
    props.onUpdateUser({
      name: name,
      email: email,
    });
    disableButton();
      }
  } 
  
return (
<div className={`popup popup_type_profile ${props.isOpen ? 'popup_visible': ''}`}>
<div className="popup__content">
<button className="popup__close-button" type="button" onClick={props.onClose}/>
          <form action="action" className="popup__form" name='profile' onSubmit={handleSubmit} onClose={props.onClose}>
              <h2 className="popup__title">Редактировать профиль</h2>
                <input className="popup__field" type="text" value={name || ''} onChange={handleChangeName} placeholder="Имя" name="username" maxLength={40} minLength={2} required id="name" />
                <span className="popup__error popup__error_name"></span>
                <input className="popup__field" type="text" value={email || ''} onChange={handleChangeEmail} placeholder="email" name="email" maxLength={200} minLength={4} required id="email"  />
                <span className="popup__error popup__error_job"></span>
              <button className="popup__save" type="submit" aria-label="Cохранить изменения"  id='saveProfile' className='popup__save_inactive' disabled>Сохранить</button>
                  </form>
        </div>
 </div>         

);


}

export default EditProfilePopup;