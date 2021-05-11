import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='filter'>
      <label className='filter__checkbox'>
        <input className='filter__input' type='checkbox' />
        <span className='filter__round' />
      </label>
      <p className='filter__title'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
