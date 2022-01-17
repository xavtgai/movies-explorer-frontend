import '../Security/Profile/Popup.css';

function RegistrationFailedPopup (props) {

return (
<div id='failMessage' className={`popup popup_type_profile ${props.isOpen ? 'popup_visible': ''}`}>
<div className="popup__content">
<button className="popup__close-button" type="button" onClick={props.onClose}/>
          <form action="action" className="popup__form" name='profile' onClose={props.onClose}>
              <h2 className="popup__title">Регистрация не удалась. Возможно, в базе уже есть такой пользователь 
              или данные заполнены неверно</h2>
                  </form>
        </div>
 </div>         

);


}

export default RegistrationFailedPopup;