import React from 'react';
import './App.css';
import MovieList from './components/MovieList';

class App extends React.Component {
  constructor(props){
    super(props)
    this.movies = ['titanic', 'avatar'];
  }

  componentDidMount(){
    // Fetch Data from API
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
