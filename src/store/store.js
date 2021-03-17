import { observable, makeObservable } from "mobx";  
import { configure } from "mobx";
//Mobx, movies in class movie store
configure({
  useProxies: "never",
});

class movieStore {
  movies = []; // no movie at the moment
  watchChange = 0; 
  constructor() {
    makeObservable(this, {
      movies: observable,
      watchChange: observable,
    });
  }

  addMovie = (movie) => {
    const _movie = {
      ...movie, //... reading attribute of passing object
      id: Date.now(),
    };
    this.movies = [...this.movies, _movie];
  };

  deleteMovie = (id) => {
    const updatedMovies = this.movies.filter((movie) => movie.id !== id);
    this.movies = [...updatedMovies];
  };

  watchedMovie = (id) => {
    const _movies = this.movies.filter((movie) => movie.id !== id);
    const updatedMovie = this.movies.find((movie) => movie.id == id);
    this.movies = [..._movies, { ...updatedMovie, watched: true }];
    this.watchChange = this.watchChange += 1;
    return this.movies.filter((movie) => movie.watched !== true);
  };

  unWatchedMovie = (id) => {
    const _movies = this.movies.filter((movie) => movie.id !== id);
    const updatedMovie = this.movies.find((movie) => movie.id == id);
    this.movies = [..._movies, { ...updatedMovie, watched: false }];
    this.watchChange = this.watchChange += 1;
    return this.movies.filter((movie) => movie.watched === true);
  };
}

const myMovieStore = new movieStore();

export default myMovieStore;
