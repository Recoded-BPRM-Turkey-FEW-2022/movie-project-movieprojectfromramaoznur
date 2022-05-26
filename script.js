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
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3>${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
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
