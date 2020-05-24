import React, { Component } from 'react'

export class MovieDetails extends Component {
    render() {
        return (
            <React.Fragment>
                { this.props.movie ? 
                    <div>
                        <h3>{this.props.movie.title}</h3>
                        <p>{this.props.movie.description}</p>
                    </div> 
                    : 
                    null 
                }
            </React.Fragment>
        )
    }
}

export default MovieDetails
