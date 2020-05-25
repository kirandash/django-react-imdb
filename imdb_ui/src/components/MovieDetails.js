import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export class MovieDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            highlighted: -1
        }
    }

    highlightRate = index => evt => {
        this.setState({
            highlighted: index
        });
    }

    rateClicked = stars => evt => {
        // Fetch Data from API - url, options
        // rate_movie
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}` // later we will get token dynamically
            },
            body: JSON.stringify({
                stars: stars
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res); // array of updated movie object from Django
            this.getDetails();
        })
        .catch(err => console.log(err))
    }

    getDetails = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.props.token}` // later we will get token dynamically
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res); // array of updated movie object from Django
            this.props.dispatchUpdateMovie(res)
        })
        .catch(err => console.log(err))
    }

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
                        <div className="rate-container">
                            <h2>Rate the movie !!!</h2>
                            {
                                [...Array(5)].map((e, i) => {
                                    return <FontAwesomeIcon icon={faStar} key={i} 
                                                className={this.state.highlighted > i - 1 ? 'purple' : ''}
                                                onMouseEnter={this.highlightRate(i)}
                                                onMouseLeave={this.highlightRate(-1)}
                                                onClick={this.rateClicked(i + 1)}
                                             />
                                })
                            }
                        </div>
                    </div> 
                    : 
                    null 
                }
            </React.Fragment>
        )
    }
}

export default MovieDetails
