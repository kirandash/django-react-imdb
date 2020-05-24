import React, { Component } from 'react'

export class MovieDetails extends Component {
    render() {
        return (
            <React.Fragment>
                { this.props.movie ? <div>
                    <h3>{this.props.movie.title}</h3>
                </div> : null }
            </React.Fragment>
        )
    }
}

export default MovieDetails
