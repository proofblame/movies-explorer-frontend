import React from 'react';
import AboutProject from './AboutProject/AboutProject.jsx';
import Promo from './Promo/Promo.jsx';
import Techs from './Techs/Techs.jsx';
import AboutMe from './AboutMe/AboutMe.jsx';
import Portfolio from './Portfolio/Portfolio.jsx';
import './Main.css';

function Main() {
  return (
    <div className='main'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </div>
  );
}

export default Main;
