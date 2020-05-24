import React, { Component } from 'react'

export class MovieForm extends Component {
    state = {

    }

    cancelClicked = () => {
        this.props.dispatchCancelClicked();
    }

    saveClicked = () => {
        console.log('Saved');
    }

    inputChanged = () => {
        console.log('Changed');
    }

    render() {
        const {movie} = this.props;
        return (
            <React.Fragment>
                <label>Title</label><br/><br/>
                <input type="text" value={movie.title} onChange={this.inputChanged} /><br/><br/>
                <label>Description</label><br/><br/>
                <textarea value={movie.description} onChange={this.inputChanged} /><br/><br/>
                <button onClick={this.saveClicked}>Save</button>
                <button onClick={this.cancelClicked}>Cancel</button>
            </React.Fragment>
        )
    }
}

export default MovieForm
