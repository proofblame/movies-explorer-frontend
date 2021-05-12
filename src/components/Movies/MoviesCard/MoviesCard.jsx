import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import testCard from '../../../images/testCard.png';

function MoviesCard() {
  const { pathname } = useLocation();

  const cardIcon =
    pathname === '/movies' ? 'card__favorite-btn' : 'card__close-btn';

  return (
    <li className='card'>
      <div className='card__wrap'>
        <div className='card__description'>
          <p className='card__name'>33 слова о дизайне</p>
          <p className='card__duration'>1ч 17м</p>
        </div>
        <button
          className={cardIcon}
          type='button'
        ></button>
      </div>
      <img className='card__image' src={testCard} alt='Тестовая карточка' />
    </li>
  );
}

export default MoviesCard;
