import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Movies.css';

import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

import MoviesApi from '../../utils/MoviesApi';
import MainApi from '../../utils/MainApi';
import {
  definitionSizeScreen,
  coefficientScreen,
} from '../../utils/definitionScreen';
import shortMoviesHandle from '../../helpers/shortMovies';

function Movies({ isLogin }) {
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [movies, setMoviesList] = useState([]);
  const [renderedFilms, setRenderedFilms] = useState([]);
  const [countClickMoreFilms, setCountClickMoreFilms] = useState(1);
  const [visibilityMoviesList, setVisibilityMoviesList] = useState('');
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState('');
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [visibilityBtnYet, setVisibilityBtnYet] = React.useState(
    'movies__button_hidden'
  );
  const [isShortFilms, setIsShortFilms] = React.useState(false);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.getSavedMovies(jwt)
        .then((savedMoviesData) => {
          if (savedMoviesData) {
            setSavedMovies(savedMoviesData);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      if (pathname === '/saved-movies') {
        setVisibilityMoviesList('movies_visibility');
      }
    }
  }, []);

  function filterMovies(films) {
    if (isShortFilms) {
      return shortMoviesHandle(films);
    }
    return films.filter((movie) => movie.duration >= 40);
  }

  const filteredMovies = React.useMemo(
    () => filterMovies(movies),
    [isShortFilms, movies, ]
  );
  const filteredRenderedMovies = React.useMemo(
    () => filterMovies(renderedFilms),
    [isShortFilms, renderedFilms]
    );
  const filteredSavedMovies = React.useMemo(
    () => filterMovies(savedMovies),
    [isShortFilms, savedMovies]
  );

  React.useEffect(() => {
    if (filteredMovies.length >= filteredRenderedMovies.length) {
      setVisibilityBtnYet('movies__button_hidden');
    }
  }, [filteredMovies, filteredRenderedMovies]);

  function countInitCards() {
    const width = definitionSizeScreen();
    if (width >= 1280) {
      return 12;
    }
    if (width >= 757) {
      return 8;
    }
    return 5;
  }

  function handleMoreRenderFilms() {
    const cards = countInitCards();
    setRenderedFilms(
      filteredMovies.slice(0, cards + countClickMoreFilms * coefficientScreen())
    );
    setCountClickMoreFilms(countClickMoreFilms + 1);
  }

  function filterMoviesFromLS(moviesList) {
    const films = moviesList.filter((movie) =>
      movie.nameRU.includes(searchValue)
    );

    setMoviesList(() => {
      localStorage.setItem('foundFilms', JSON.stringify(films));
      return films;
    });
  }

  function handleSearch(event) {
    event.preventDefault();
    if (searchValue === '') {
      setInputError('Нужно ввести ключевое слово');
      return;
    }
    setIsPreloaderOpen('preloader_active');
    setVisibilityMoviesList('');
    if (pathname === '/movies') {
      if (!localStorage.getItem('moviesList')) {
        MoviesApi.getMovies()
          .then((moviesList) => {
            localStorage.setItem('moviesList', JSON.stringify(moviesList));
            filterMoviesFromLS(JSON.parse(localStorage.moviesList));
            setIsPreloaderOpen('');
            setVisibilityMoviesList('movies_visibility');
            setVisibilityBtnYet('');
          })
          .catch((err) => console.log(err));
        return;
      }

      filterMoviesFromLS(
        localStorage.getItem('moviesList')
          ? JSON.parse(localStorage.moviesList)
          : []
      );
      setIsPreloaderOpen('');
      setVisibilityMoviesList('movies_visibility');
      setVisibilityBtnYet('');
    } else {
      setSavedMovies(
        savedMovies.filter((movie) => movie.nameRU.includes(searchValue))
      );
      setVisibilityMoviesList('movies_visibility');
      setIsPreloaderOpen('');
    }
  }

  function addMovie(movie) {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.addMovie(movie, jwt)
        .then((dataMovie) => {
          setSavedMovies([dataMovie.data, ...savedMovies]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function removeMovie(movieId) {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.removeMovie(movieId, jwt)
        .then(() => {
          const newMovies = savedMovies.filter(
            (movie) => movie._id !== movieId
          );
          setSavedMovies(newMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <Header bgColor='dark' textColor='white' isLogin={isLogin} />
      <SearchForm
        onSubmit={handleSearch}
        inputError={inputError}
        setInputError={setInputError}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isShortFilms={isShortFilms}
        setIsShortFilms={setIsShortFilms}
      />
      <Preloader isPreloaderOpen={isPreloaderOpen} />
      <MoviesCardList
        movies={filteredMovies}
        visibilityMoviesList={visibilityMoviesList}
        renderedFilms={filteredRenderedMovies}
        setRenderedFilms={setRenderedFilms}
        handleMoreRenderFilms={handleMoreRenderFilms}
        countInitCards={countInitCards}
        addMovie={addMovie}
        removeMovie={removeMovie}
        savedMovies={filteredSavedMovies}
        setVisibilityMoviesList={setVisibilityMoviesList}
        visibilityBtnYet={visibilityBtnYet}
        setVisibilityBtnYet={setVisibilityBtnYet}
        shortMoviesHandle={shortMoviesHandle}
        isShortFilms={isShortFilms}
      />
      <Footer />
    </>
  );
}

export default Movies;
