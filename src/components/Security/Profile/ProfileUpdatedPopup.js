import './Popup.css';

function ProfileUpdatedPopup (props) {

return (
<div id='successMessage' className={`popup popup_type_profile ${props.isOpen ? 'popup_visible': ''}`}>
<div className="popup__content">
<button className="popup__close-button" type="button" onClick={props.onClose}/>
          <form action="action" className="popup__form" name='profile' onClose={props.onClose}>
              <h2 className="popup__title">Профиль успешно изменен</h2>
                  </form>
        </div>
 </div>         

);


}

export default ProfileUpdatedPopup;