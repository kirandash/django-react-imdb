import React from 'react';

const MovieList = (props) => {
    const {movies} = props;
    return (
        <React.Fragment>
            <h2>Movie List</h2>
            {movies.map((movie, index) => <h3 key={index}>{movie}</h3>)}
        </React.Fragment>
    )
}

export default MovieList;