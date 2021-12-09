import React from 'react';
import './AboutMe.css';
import student from '../../../images/student.jpg';

function AboutMe () {

    return (
<section className="student">
    
<div className="student__title">Студент</div>
<div className="student__main">
    <div className='student__info'>
        <h2 className="student__name">Илья</h2>
        <p className="student__subtitle">Фронтенд-разработчик малого опыта и немалого возраста</p>
        <p className="student__about">Гуманитарий, аналитик, дата сайнтист, лингвист, исследователь малых языков,
    медицинский переводчик, монголист, бывший сотрудник Яндекса, путешественник по Центральной Азии. 
    Решил на старости лет освоить еще и фронтенд, чтобы было чему поучить внуков.
            </p>

        <ul className="student__links">
            <li className="student__link-item"><a href='https://www.facebook.com/ilya.gruntov' className='student__link'>Facebook</a></li>
            <li className="student__link-item"><a href='https://github.com/xavtgai/' className='student__link'>Github</a></li>
        </ul>
    </div>
    <img src={student} alt='Илья Грунтов' className="student__image"/> 
</div>


</section>
  
    ) 
}

export default AboutMe;