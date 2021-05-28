import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../context/CurrentUserContext';

import MainApi from '../../utils/MainApi';

function App() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLogin, setIsLogin] = React.useState(pathname);
  const [loginError, setLoginError] = React.useState(false);
  const [registeredError, setRegisteredError] = React.useState(false);
  const [isEditError, setIsEditError] = React.useState(false);
  const [isEditDone, setIsEditDone] = React.useState(false);



  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.getInfo(jwt)
        .then((userInfo) => {
          if (userInfo) {
            setCurrentUser(userInfo.data);
            setIsLogin(true);
            history.push(pathname);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLogin(false);
    }
  }

  React.useEffect(() => {
    checkToken();
  }, []);


  function handleLogin(email, password) {
    MainApi.login(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('jwt', data.jwt);
          setIsLogin(true);
          history.push('/movies');
          checkToken();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(name, email, password) {
    MainApi.register(name, email, password)
      .then((data) => {
        if (data) {
          handleLogin(email, password);
          history.push('/signin');
        }
      })
      .catch(() => {
        setRegisteredError(true);
      });
  }

  function handleLogout() {
    history.push('/');
    setIsLogin(false);
    localStorage.clear();
    setCurrentUser({});
  }

  function editProfile(name, email) {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.setInfo(name, email, jwt)
        .then((info) => {
          setCurrentUser(info);
          setIsEditDone(true);
          setIsEditError(false);
          setTimeout(() => {
            setIsEditDone(false);
          }, 4000);
        })
        .catch(() => {
          setIsEditError(true);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <Header bgColor='dark' textColor='white' isLogin={isLogin} />
            <Main />
            <Footer />
          </Route>
          <Route exact path='/signin'>
            <Login handleLogin={handleLogin} loginError={loginError} />
          </Route>
          <Route exact path='/signup'>
            <Register
              handleRegister={handleRegister}
              registeredError={registeredError}
            />
          </Route>
          <ProtectedRoute
            exact
            path='/movies'
            component={Movies}
            isLogin={isLogin}

          />
          <ProtectedRoute
            exact
            path='/saved-movies'
            component={Movies}
            isLogin={isLogin}
            currentUser={currentUser}
          />
          <ProtectedRoute
            path='/profile'
            exact
            component={Profile}
            handleLogout={handleLogout}
            editProfile={editProfile}
            isLogin={isLogin}
            currentUser={currentUser}
            isEditError={isEditError}
            isEditDone={isEditDone}
          />

          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
