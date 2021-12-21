import React from 'react';
import './AboutProject.css';

function AboutMe () {

    return (

        <section className="project">
        <h2 className="project__title">О проекте</h2>
         <div className="project__texts">
            <div className='project__texts_left'>
            <p className="project__subtitle">Дипломный проект включал 5 этапов</p>
            <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div>
            <p className="project__subtitle">На выполнение диплома ушло 5 недель</p>
            <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            </div>
    <div className="project__graph">
        <div className='project__back'>
            <p className="project__time project__initial">1 неделя</p>
            <p className="project__part">Back-end</p>
        </div>
        <div className='project__front'>
            <p className="project__time project__last">4 недели</p>
            <p className="project__part">Front-end</p>
       </div>
    </div>

        </section>
    ) 
}

export default AboutMe;