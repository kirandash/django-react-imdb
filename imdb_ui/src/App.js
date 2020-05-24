import React from 'react';
import './App.css';
import MovieList from './components/MovieList';

class App extends React.Component {
  constructor(props){
    super(props)
    this.movies = ['titanic', 'avatar'];
  }

  componentDidMount(){
    // Fetch Data from API - url, options
    // GET Movies
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token 9de5ae4e0f924d43aef5eaad22403d3657009fe6' // later we will get token dynamically
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <h1>IMDB</h1>
        <MovieList movies={this.movies} />
      </div>
    )
  }
}

export default App;
