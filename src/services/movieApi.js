const API_KEY = process.env.EXPO_PUBLIC_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western',
};
const formatMovie = (movie) => {
  let genre = 'N/A';
  if (movie.genres && movie.genres.length > 0) {
    genre = movie.genres[0].name;
  } else if (movie.genre_ids && movie.genre_ids.length > 0) {
    genre = GENRE_MAP[movie.genre_ids[0]] || 'N/A';
  }

  return {
    id: movie.id,
    title: movie.title,
    year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
    rating: movie.vote_average.toFixed(1),
    genre: genre,
    runtime: movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A',
    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    backdropImage: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };
};

export const fetchMovieById = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await response.json();
  return formatMovie(data);
};

export const fetchTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results.map(formatMovie);
};

export const fetchPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results.map(formatMovie);
};
export const fetchMovieCredits = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  const data = await response.json();
  return data.cast;
};
