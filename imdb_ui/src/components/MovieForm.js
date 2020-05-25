import React, { Component } from 'react'

export class MovieForm extends Component {
    state = {
        editedMovie: this.props.movie
    }

    cancelClicked = () => {
        this.props.dispatchCancelClicked();
    }

    saveClicked = () => {
        // console.log('Saved');
        // console.log(this.state.editedMovie)
        // POST new Movie
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}` // later we will get token dynamically
            },
            body: JSON.stringify(this.state.editedMovie)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res); // array of movie object from Django
            this.props.dispatchCreateMovie(res);
        })
        .catch(err => console.log(err))
    }

    updateClicked = () => {
        // console.log('updated');
        // console.log(this.state.editedMovie)
        // Update existing Movie with PUT
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}` // later we will get token dynamically
            },
            body: JSON.stringify(this.state.editedMovie)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res); // array of movie object from Django
            this.props.dispatchUpdateMovie(res);
        })
        .catch(err => console.log(err))
    }

    inputChanged = event => {
        // console.log('Changed');
        let movie = this.state.editedMovie;
        movie[event.target.name] = event.target.value;
        this.setState({
            editedMovie: movie
        })
    }

    render() {
        const movie = this.state.editedMovie;

        const isDisabled = this.state.editedMovie.title.length === 0 || this.state.editedMovie.description.length === 0;

        return (
            <React.Fragment>
                <label>Title</label><br/><br/>
                <input type="text" name="title" value={movie.title} onChange={this.inputChanged} /><br/><br/>
                <label>Description</label><br/><br/>
                <textarea name="description" value={movie.description} onChange={this.inputChanged} /><br/><br/>
                { !this.props.movie.id ? 
                    <button onClick={this.saveClicked} disabled={isDisabled}>Save</button>
                    :
                    <button onClick={this.updateClicked} disabled={isDisabled}>Update</button>
                }
                
                <button onClick={this.cancelClicked}>Cancel</button>
            </React.Fragment>
        )
    }
}

export default MovieForm
