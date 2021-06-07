import React from 'react';
import arrow from '../../../images/arrow.svg';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='/#'>
            <p className='portfolio__subtitle'>Статичный сайт</p>
            <img className='portfolio__arrow' src={arrow} alt='Стрелка' />
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='/#'>
            <p className='portfolio__subtitle'>Адаптивный сайт</p>
            <img className='portfolio__arrow' src={arrow} alt='Стрелка' />
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='/#'>
            <p className='portfolio__subtitle'>Одностраничное приложение</p>
            <img className='portfolio__arrow' src={arrow} alt='Стрелка' />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
