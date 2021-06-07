import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ setIsShortFilms, isShortFilms }) {
  return (
    <div className='filter'>
      <label className='filter__checkbox'>
        <input
          className='filter__input'
          type='checkbox'
          onClick={() => {
            setIsShortFilms(!isShortFilms);
          }}
        />
        <span className='filter__round' />
      </label>
      <p className='filter__title'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
