"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

/* ---Filter Section--- */

const fetchPopular = async () => {
  const url = constructUrl(`movie/popular`);
  const res = await fetch(url);
  return res.json();
};

const popularMovies = async () => {
  CONTAINER.innerHTML = "";
  const popular = await fetchPopular();
  renderMovies(popular.results);
};

const fetchTopRated = async () => {
  const url = constructUrl(`movie/top_rated`);
  const res = await fetch(url);
  return res.json();
};

const topRatedMovies = async () => {
  CONTAINER.innerHTML = "";
  const topRated = await fetchTopRated();
  renderMovies(topRated.results);
};

const fetchNowPlaying = async () => {
  const url = constructUrl("movie/now_playing");
  const res = await fetch(url);
  return res.json();
};

const nowPlayingMovies = async () => {
  CONTAINER.innerHTML = "";
  const nowPlaying = await fetchNowPlaying();
  console.log(nowPlaying);
  renderMovies(nowPlaying.results);
};

const fetchUpComing = async () => {
  const url = constructUrl(`movie/upcoming`);
  const res = await fetch(url);
  return res.json();
};

const upcomingMovies = async () => {
  CONTAINER.innerHTML = "";
  const upcoming = await fetchUpComing();
  renderMovies(upcoming.results);
};

/* ---Filter Section End--- */

/* ---Genre Section--- */

const genreConstructUrl = (genresID) => {
  return `${TMDB_BASE_URL}/discover/movie?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}&sort_by=popularity.desc&with_genres=${genresID}`;
};

const genreIds = {
  action: 28,
  animation: 16,
  comedy: 35,
  drama: 18,
  romance: 10749,
};

const fetchGenres = async (genreID) => {
  const url = genreConstructUrl(genreID);
  const res = await fetch(url);
  return res.json();
};

const getGenre = async (getId) => {
  CONTAINER.innerHTML = "";
  const genId = genreIds[getId];
  const genreMov = await fetchGenres(genId);
  console.log(genreMov);
  renderMovies(genreMov.results);
};

/* ---Genre Section End--- */

/* ---Actors Page--- */

const listActors = async () => {
  const actors = await fetchActors();
  renderActors(actors.results);
};

const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);
  return res.json();
};

const renderActors = (actors) => {
  console.log(actors);
  CONTAINER.innerHTML = "";
  actors.map((actor) => {
    const actorDiv = document.createElement("div");
    actorDiv.classList = "col-sm-6";
    actorDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + actor.profile_path}" alt="${
      actor.name
    } poster">
        <h3>${actor.name}</h3>`;
    actorDiv.addEventListener("click", () => {
      renderActorDetails(actor.id);
    });
    CONTAINER.appendChild(actorDiv);
  });
};

/* ---Actors Page End--- */

/* ---Functions Needed for Movie Page */

const fetchReleaseDate = async () => {
  const url = constructUrl(`movie/${movie_id}/release_dates`);
  const res = await fetch(url);
  return res.json();
};

const fetchTrailer = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/videos`);
  const res = await fetch(url);
  return res.json();
};

const fetchRelatedMovies = async (movie_id) => {
  const url = constructUrl(`movie/${movie_id}/similar`);
  const res = await fetch(url);
  return res.json();
};

const fetchCredits = async (movie_id) => {
  const url = constructUrl(`movie/${movie_id}/credits`);
  const res = await fetch(url);
  return res.json();
};

/* ---Functions Needed for Movie Page End*/

/* ---Search Section--- */

const searchConstructUrl = (value) => {
  return `${TMDB_BASE_URL}/search/multi?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}&query=${value}`;
};

const fetchSearch = async (value) => {
  const url = searchConstructUrl(value);
  const response = await fetch(url);
  return response.json();
};

const searchRender = async (value) => {
  const resultData = await fetchSearch(value);
  renderMovies(resultData.results);
};

let searchBox = document.getElementById("searchBox");
let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", async function (e) {
  e.preventDefault();
  let searchValue = searchBox.value;
  searchRender(searchValue);
});

/* ---Search Section End--- */

/* ---Movie Page--- */

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  CONTAINER.innerHTML = "";
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList = "movieDiv";
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h1>${movie.title}</h1>`;

    let genreIDs = movie.genre_ids.map((genre) => {
      if (genre === 28) {
        return "Action";
      } else if (genre === 12) {
        return "Adventure";
      } else if (genre === 16) {
        return "Animation";
      } else if (genre === 35) {
        return "Comedy";
      } else if (genre === 80) {
        return "Crime";
      } else if (genre === 99) {
        return "Documentary";
      } else if (genre === 18) {
        return "Drama";
      } else if (genre === 10751) {
        return "Family";
      } else if (genre === 14) {
        return "Fantasy";
      } else if (genre === 36) {
        return "History";
      } else if (genre === 27) {
        return "Horror";
      } else if (genre === 10402) {
        return "Music";
      } else if (genre === 9648) {
        return "Mystery";
      } else if (genre === 10749) {
        return "Romance";
      } else if (genre === 878) {
        return "Science Fiction";
      } else if (genre === 10770) {
        return "TV Movie";
      } else if (genre === 53) {
        return "Thriller";
      } else if (genre === 10752) {
        return "War";
      } else if (genre === 37) {
        return "Western";
      }
    });

    const hoverDiv = document.createElement("div");
    hoverDiv.classList.add("hoverDiv");
    const movieGenres = document.createElement("p");
    movieGenres.textContent = `Genres: ${genreIDs}`;
    const movieVoting = document.createElement("p");
    movieVoting.textContent = `Rating: ${movie.vote_average}/10`;
    movieDiv.appendChild(hoverDiv);
    hoverDiv.appendChild(movieGenres);
    hoverDiv.appendChild(movieVoting);

    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

/* ---Movie Page End--- */

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

document.addEventListener("DOMContentLoaded", autorun);
