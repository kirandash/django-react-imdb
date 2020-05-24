import React from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';

class App extends React.Component {
  constructor(props){
    super(props)
    // this.movies = ['titanic', 'avatar'];
    this.state = {
      movies: [],
      selectedMovie: null
    }
  }

  componentDidMount(){
    // Fetch Data from API - url, options
    // GET Movies
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: 'GET',
      headers: {
        'Authorization': 'Token 9de5ae4e0f924d43aef5eaad22403d3657009fe6' // later we will get token dynamically
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
  }

  onMovieClick = movie => {
    console.log(movie);
    this.setState({
      selectedMovie: movie
    })
  }

  onMovieDeleted = selMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selMovie.id);
    this.setState({ movies: movies, selectedMovie: null });
  }

  render() {
    return (
      <div className="App">
        <h1>IMDB</h1>
        <div className="grid-layout">
          <MovieList movies={this.state.movies} dispatchMovieClick={this.onMovieClick} movieDeleted={this.onMovieDeleted} />
          <MovieDetails movie={this.state.selectedMovie} dispatchUpdateMovie={this.onMovieClick} />
        </div>
      </div>
    )
  }
}

export default App;
