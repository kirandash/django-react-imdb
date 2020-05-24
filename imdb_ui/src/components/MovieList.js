import React from 'react';

const MovieList = (props) => {
    const {movies} = props;
    
    const movieClicked = movie => evt => {
        props.dispatchMovieClick(movie);
    }

    return (
        <div>
            {movies.map((movie, index) => <h3 key={index} onClick={movieClicked(movie)}>{movie.title}</h3>)}
        </div>
    )
}

export default MovieList;