import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export class MovieDetails extends Component {
    render() {
        const { movie } = this.props;
        return (
            <React.Fragment>
                { this.props.movie ? 
                    <div>
                        <h3>{movie.title}</h3>
                        <p>{movie.description}</p>
                        <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 0 ? 'orange' : ''} />
                        <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 1 ? 'orange' : ''} />
                        <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 2 ? 'orange' : ''} />
                        <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 3 ? 'orange' : ''} />
                        <FontAwesomeIcon icon={faStar} className={movie.avg_rating > 4 ? 'orange' : ''} />
                        <p>Votes: {movie.no_of_ratings}</p>
                    </div> 
                    : 
                    null 
                }
            </React.Fragment>
        )
    }
}

export default MovieDetails
