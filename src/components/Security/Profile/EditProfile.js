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

const handleChangeName = (e) => {
  setName(e.target.value);
}

const handleChangeEmail = (e) => {
  setEmail(e.target.value);
}

function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
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
                <span className="popup__error popup__error_name"></span>
                <input className="popup__field" type="text" value={email || ''} onChange={handleChangeEmail} placeholder="email" name="email" maxLength={200} minLength={4} required id="email"  />
                <span className="popup__error popup__error_job"></span>
              <button className="popup__save" type="submit" aria-label="Cохранить изменения">Сохранить</button>
                  </form>
        </div>
 </div>         

);


}

export default EditProfilePopup;