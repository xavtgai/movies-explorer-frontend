import React from 'react';
import './Notfound.css';
import {MAIN_PAGE} from '../../utils/constants';

function NotFoundPage (props) {
    return (
        <div className='notfound'>
        <h1 className="notfound__number">404</h1>
        <p className='notfound__subtitle'>Страница не найдена</p>
        <a href={`${MAIN_PAGE}`} className='notfound__link'>Назад</a>
        </div>
    )
}

export default NotFoundPage;