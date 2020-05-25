import React from 'react';
import { withCookies } from 'react-cookie';

import './App.css';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieForm from './components/MovieForm';

class App extends React.Component {
  constructor(props){
    super(props)
    // this.movies = ['titanic', 'avatar'];
    this.state = {
      movies: [],
      selectedMovie: null,
      editedMovie: null,
      token: this.props.cookies.get('imdb-token')
    }
  }

  componentDidMount(){
    // Fetch Data from API - url, options
    // GET Movies
    if(this.state.token){
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.state.token}` // later we will get token dynamically
        }
      })
      .then(res => res.json())
      .then(res => {
        console.log(res); // array of movie objects from Django
        this.setState({
          movies: res
        })
      })
      .catch(err => console.log(err))
    } else {
      window.location.href = '/'
    }
  }

  onMovieClick = movie => {
    console.log(movie);
    this.setState({
      selectedMovie: movie,
      editedMovie: null
    }) // Set selected movie and reset edited movie
  }

  onEditClick = movie => {
    this.setState({
      editedMovie: movie,
      selectedMovie: null
    }) // Set movie for edit and reset selected movie
  }

  onNewMovie = () => {
      this.setState({
        editedMovie: {title: '', description: ''} // setting edited movie to blank values so new form data can be inserted
      });
  }

  onMovieDeleted = selMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selMovie.id);
    this.setState({ movies: movies, selectedMovie: null });
  }

  onCancelForm = () => {
    this.setState({ editedMovie: null }) // Resetting editedMovie and hiding form
  }

  onCreateMovie = movie => {
    this.setState({ 
      movies: [
        ...this.state.movies, 
        movie
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <h1>IMDB</h1>
        <div className="grid-layout">
          <MovieList movies={this.state.movies} 
              dispatchMovieClick={this.onMovieClick} 
              movieDeleted={this.onMovieDeleted} 
              dispatchEditClick={this.onEditClick}
              dispatchNewMovie={this.onNewMovie}
              token={this.state.token}
          />
          <div>
            {!this.state.editedMovie ? 
              <MovieDetails movie={this.state.selectedMovie} dispatchUpdateMovie={this.onMovieClick}
              token={this.state.token} />
              :
              <MovieForm movie={this.state.editedMovie} 
                  dispatchCancelClicked={this.onCancelForm}
                  dispatchCreateMovie={this.onCreateMovie}
                  dispatchUpdateMovie={this.onMovieClick}
                  token={this.state.token}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withCookies(App);
