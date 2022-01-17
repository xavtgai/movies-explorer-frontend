import React from 'react';
import './Notfound.css';
import { Link } from 'react-router-dom';

function NotFoundPage (props) {
     
    return (
        <div className='notfound'>
        <h1 className="notfound__number">404</h1>
        <p className='notfound__subtitle'>Страница не найдена</p>
        <Link 
        to = './'
        className='notfound__link'> Назад</Link>
         
        </div>
    )
}

export default NotFoundPage;