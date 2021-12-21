import React from 'react';
import { withRouter} from 'react-router-dom';

import './Footer.css';

function Footer () {
return (
    <footer className='footer'>
    <div className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</div>
    <div className='footer__main'>
    <p className='footer__copyright'> © 2021</p>
    <nav>
        <ul className='footer__links'>
            <li className='footer__link-item'> <a href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer' className='footer__link' >Яндекс.Практикум</a></li>
            <li className='footer__link-item'><a href='https://github.com/yandex' target='_blank' rel='noreferrer' className='footer__link'>Github</a></li>
            <li className='footer__link-item'><a href='https://www.facebook.com/yandex.practicum' target='_blank' rel='noreferrer' className='footer__link'>Facebook</a></li>
        </ul>
    </nav>
    </div>
    </footer>
)
}

export default withRouter(Footer);