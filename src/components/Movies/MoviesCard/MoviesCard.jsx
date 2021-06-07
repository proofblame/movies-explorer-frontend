import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

import CurrentUserContext from '../../../context/CurrentUserContext';

function MoviesCard({
  movie,
  cardName,
  cardDuration,
  imageLink,
  trailerLink,
  addMovie,
  removeMovie,
  savedMovies,
}) {
  const { pathname } = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  const [isAddedCard, setIsAddedCard] = React.useState(false);
  const moviesIcon = isAddedCard
    ? 'card__favorite-btn-active'
    : 'card__favorite-btn';
  const cardIcon = pathname === '/movies' ? moviesIcon : 'card__close-btn';

  function hadleLikeMovie() {
    if (!isAddedCard) {
      addMovie(movie);
      setIsAddedCard(true);
    } else {
      const movieItem = savedMovies.filter(
        (savedMovie) => savedMovie.movieId === movie.id
      );
      removeMovie(movieItem[0]._id);
      setIsAddedCard(false);
    }
  }

  function hadleDeleteButton() {
    removeMovie(movie._id);
  }

  React.useEffect(() => {
    checkAddedCard();
  }, [savedMovies, pathname, currentUser]);

  function checkAddedCard() {
    if (savedMovies.length > 0) {
      if (savedMovies.length > 0) {
        if (!isAddedCard) {
          setIsAddedCard(
            savedMovies.some(
              (savedMovie) =>
                savedMovie.movieId === movie.id &&
                savedMovie.owner === currentUser._id
            )
          );
        }
      }
    }
  }

  const functionIcon =
    pathname === '/movies' ? hadleLikeMovie : hadleDeleteButton;

  return (
    <li className='card'>
      <div className='card__wrap'>
        <div className='card__description'>
          <p className='card__name'>{cardName}</p>
          <p className='card__duration'>{cardDuration}</p>
        </div>
        <button
          className={cardIcon}
          type='button'
          onClick={() => {
            functionIcon();
          }}
        />
      </div>
      <a
        className='card__trailer-link'
        href={trailerLink || movie.trailer}
        target='_blank'
        rel='noreferrer'
      >
        <img className='card__image' src={imageLink} alt={cardName} />
      </a>
    </li>
  );
}

export default MoviesCard;
