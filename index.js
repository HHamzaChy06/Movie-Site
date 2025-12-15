const navSearch = document.querySelector(".nav__search");
const navSearchIcon = document.querySelector(".nav__search__icon");
const headerSearch = document.querySelector(".header__search");
const headerSearchIcon = document.querySelector(".header__search__icon");
const moviesResult = document.querySelector(".movie__search__result");

navSearch.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    moviesResult.innerHTML = `"${navSearch.value}"`;
    renderMovies(navSearch.value);
  }
});

headerSearch.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    moviesResult.innerHTML = `"${headerSearch.value}"`;
    renderMovies(headerSearch.value);
  }
});

headerSearchIcon.addEventListener("click", (event) => {
  moviesResult.innerHTML = `"${headerSearch.value}"`;
  renderMovies(headerSearch.value);
});

async function fetchMovies(value) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=24edb083&s=${value}`
  );

  const data = await response.json();

  const movies = data.Search;

  return movies;
}

async function renderMovies(value) {
  try {
    const moviesList = document.querySelector(".movies__list");
    const moviesSearch = document.querySelector(".header__search").value;

    moviesList.innerHTML = `<i class="fa-solid fa-spinner movies__loading__spinner"></i>`;

    const movies = await fetchMovies(value);

    const topSix = movies.slice(0, 6);

    const movieHTML = topSix
      .map((movie) => {
        return `<div class="movie">
    <figure class="movie__image__wrapper">
      <img
        src="${movie.Poster}"
        alt=""
        class="movie__image"
      />
      <h3 class="movie__info__title">${movie.Title}</h3>
      <div class="movie__info">
        <div class="movie__info__description">
          <i class="fa-regular fa-clock movie__info__icon"></i>
          <p class="movie__info__text">136m</p>
        </div>
        <div class="movie__info__description">
          <i class="fa-regular fa-star movie__info__icon"></i>
          <p class="movie__info__text">4.5</p>
        </div>
        <div class="movie__info__description">
          <i
            class="fa-solid fa-earth-americas movie__info__icon"
          ></i>
          <p class="movie__info__text">English</p>
        </div>
      </div>
    </figure>
    <h4 class="movie__title">${movie.Title}</h4>
  </div>`;
      })
      .join("");

    moviesList.innerHTML = movieHTML;
  } catch (e) {
    alert("Please search for another movie!");

    window.location.reload();
  }
}
