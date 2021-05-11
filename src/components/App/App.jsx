import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <div className='app'>
      <Switch>
        <Route exact path='/'>
          <Header bgColor='dark' textColor='white' />
          <Main />
          <Footer />
        </Route>
        <Route exact path='/movies'>
          <Header bgColor='dark' textColor='white' />
          <Movies />
          <Footer />
        </Route>
        <Route exact path='/saved-movies'>
          <Header />
          <Movies />
          <Footer />
        </Route>
        <Route exact path='/profile'>
          <Header />
          <Profile />
        </Route>
        <Route exact path='/signin'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Register />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
