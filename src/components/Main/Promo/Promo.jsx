import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <div className='promo'>
      <div className='promo__wrapper'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <ul className='promo__list'>
          <li className='promo__item'>
            <a className='promo__link' href='#about'>
              О проекте
            </a>
          </li>
          <li className='promo__item'>
            <a className='promo__link' href='#techs'>
              Технологии
            </a>
          </li>
          <li className='promo__item'>
            <a className='promo__link' href='#author'>
              Студент
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Promo;
