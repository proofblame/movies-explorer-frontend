import React from 'react';
import './MoviesCard.css';
import testCard from '../../../images/testCard.png';

function MoviesCard() {
  return (
    <li className='card'>
      <div className='card__wrap'>
        <div className='card__description'>
          <p className='card__name'>33 слова о дизайне</p>
          <p className='card__duration'>1ч 17м</p>
        </div>
        <button className='card__favorite'></button>
      </div>
      <img className='card__image' src={testCard} alt='Тестовая карточка' />
    </li>
  );
}

export default MoviesCard;
