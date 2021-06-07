import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <h3 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className='footer__wrapper'>
        <p className='footer__copy'>&copy; 2020</p>
        <ul className='footer__list'>
          <li className='footer__item'>
            <a className='footer__link' href='https://praktikum.yandex.ru/'>
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__item'>
            <a className='footer__link' href='https://praktikum.yandex.ru/'>
              Github
            </a>
          </li>
          <li className='footer__item'>
            <a className='footer__link' href='https://praktikum.yandex.ru/'>
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
