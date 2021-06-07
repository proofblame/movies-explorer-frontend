import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <div className='about'>
      <h2 className='about__title' id='about'>
        О проекте
      </h2>
      <ul className='about__list'>
        <li className='about__item'>
          <h3 className='about__text-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about__text-subtitle'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className='about__item'>
          <h3 className='about__text-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about__text-subtitle'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className='about__duration'>
        <li className='about__duration-backend'>
          <h4 className='about__duration-title about__duration-title_active'>
            1 неделя
          </h4>
          <p className='about__duration-subtitle'>Back-end</p>
        </li>
        <li className='about__duration-frontend'>
          <h4 className='about__duration-title'>4 недели</h4>
          <p className='about__duration-subtitle'>Front-end</p>
        </li>
      </ul>
    </div>
  );
}

export default AboutProject;
