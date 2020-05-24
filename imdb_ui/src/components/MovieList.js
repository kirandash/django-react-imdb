import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const MovieList = (props) => {
    const {movies} = props;
    
    const movieClicked = movie => evt => {
        props.dispatchMovieClick(movie);
    }

    const removeMovie = movie => {
        // DELETE movie
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Token 9de5ae4e0f924d43aef5eaad22403d3657009fe6' // later we will get token dynamically
            }
        })
        .then(res => props.movieDeleted(movie)) // No response in DELETE API
        .catch(err => console.log(err));
    }

    return (
        <div>
            {movies.map((movie, index) => {
                    return (
                        <div key={index} className="movie-list-item">
                            <h3 onClick={movieClicked(movie)}>{movie.title}</h3>
                            <FontAwesomeIcon icon={faEdit} />
                            <FontAwesomeIcon icon={faTrash} onClick={() => removeMovie(movie)} />
                        </div>
                    )
                }
            )}
        </div>
    )
}

export default MovieList;