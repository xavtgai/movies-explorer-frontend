import React from 'react';
import './Portfolio.css';

function Portfolio (){
    return (

        <section className="portfolio">
<h3 className='portfolio__title'>Портфолио</h3>
<nav>
    <ul className='portfolio__links'>
        <li className= 'portfolio__link-item'><a href='https://github.com/xavtgai/how-to-learn' target='_blank' rel='noreferrer' className='portfolio__link'>Статичный сайт</a><span className='portfolio__icon'>↗</span></li>
        <li className= 'portfolio__link-item'><a href='https://xavtgai.github.io/russian-travel/index.html' target='_blank' rel='noreferrer' className='portfolio__link'>Адаптивный сайт</a><span className='portfolio__icon'>↗</span></li>
        <li className= 'portfolio__link-item'><a href='https://github.com/xavtgai/movies-explorer-frontend' target='_blank' rel='noreferrer' className='portfolio__link'>Одностраничное приложение</a><span className='portfolio__icon'>↗</span></li>
</ul>
</nav>
        </section>
    )
}



export default Portfolio;
