import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const MovieList = (props) => {
    const {movies} = props;
    
    const movieClicked = movie => evt => {
        props.dispatchMovieClick(movie);
    }

    const editMovie = movie => {
        props.dispatchEditClick(movie);
    }

    const removeMovie = movie => {
        // DELETE movie
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${props.token}` // later we will get token dynamically
            }
        })
        .then(res => props.movieDeleted(movie)) // No response in DELETE API
        .catch(err => console.log(err));
    }

    const newMovie = () => {
        props.dispatchNewMovie();
    }

    return (
        <div className="movie-list">
            {movies.map((movie, index) => {
                    return (
                        <div key={index} className="movie-list-item">
                            <h3 onClick={movieClicked(movie)}>{movie.title}</h3>
                            <FontAwesomeIcon icon={faEdit} onClick={() => editMovie(movie)} />
                            <FontAwesomeIcon icon={faTrash} onClick={() => removeMovie(movie)} />
                        </div>
                    )
                }
            )}
            <button onClick={newMovie}>Add New</button>
        </div>
    )
}

export default MovieList;