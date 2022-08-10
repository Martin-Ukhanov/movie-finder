import getMovieInfo from './movie';

const showMovie = () => {
  const main = document.querySelector('main');
  const loader = document.getElementById('loader');

  main.classList.remove('hidden');
  loader.classList.add('hidden');
};

const hideMovie = () => {
  const main = document.querySelector('main');
  const loader = document.getElementById('loader');

  main.classList.add('hidden');
  loader.classList.remove('hidden');
};

const displayMovie = (movie) => {
  const title = document.getElementById('title');
  const year = document.getElementById('year');
  const rated = document.getElementById('rated');
  const runtime = document.getElementById('runtime');
  const rating = document.getElementById('rating');
  const plot = document.getElementById('plot');
  const poster = document.getElementById('poster');

  hideMovie();

  title.textContent = movie.title;
  year.textContent = movie.year;
  rated.textContent = movie.rated;
  runtime.textContent = movie.runtime;
  rating.textContent = movie.rating;
  plot.textContent = movie.plot;

  if (movie.poster !== 'N/A') {
    poster.src = movie.poster;
    poster.addEventListener('load', showMovie);
  } else {
    poster.src = '';
    showMovie();
  }
};

const shakeForm = () => {
  const form = document.querySelector('form');
  const shake = [
    { transform: 'translateX(0)' },
    { transform: 'translateX(5px)' },
    { transform: 'translateX(-5px)' },
    { transform: 'translateX(5px)' },
    { transform: 'translateX(0)' },
  ];
  const shakeTiming = {
    duration: 200,
    iterations: 1,
  };

  form.animate(shake, shakeTiming);
};

const initDOM = () => {
  const form = document.querySelector('form');
  const titleInput = document.getElementById('title-input');

  form.reset();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const movie = getMovieInfo(titleInput.value);

    movie.then((result) => {
      if (result !== undefined) {
        displayMovie(result);
        form.reset();
      } else {
        shakeForm();
      }
    });
  });

  getMovieInfo('Interstellar').then((result) => {
    displayMovie(result);
  });
};

export default initDOM;
