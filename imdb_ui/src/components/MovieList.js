import React from 'react';

const MovieList = (props) => {
    const {movies} = props;
    return (
        <div>
            {movies.map((movie, index) => <h3 key={index}>{movie.title}</h3>)}
        </div>
    )
}

export default MovieList;