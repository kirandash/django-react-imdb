import React, { Component } from 'react'
import { withCookies } from 'react-cookie';

export class Login extends Component {

    // Create state for login details
    state = {
        credentials: {
            username: '',
            password: '',
        },
        isLoginView: true
    }

    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({
            credentials: cred
        });
    }

    login = event => {
        if(this.state.isLoginView) {
            console.log(this.state.credentials);
            // Log in with auth API
            fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization': 'Token 9de5ae4e0f924d43aef5eaad22403d3657009fe6' // later we will get token dynamically
                },
                body: JSON.stringify(this.state.credentials)
            })
            .then(res => res.json())
            .then(res => {
                console.log(res.token); // token - store the token later in cookie to use with other API calls
                this.props.cookies.set('imdb-token', res.token); // Set cookie
                window.location.href="/movies";
            })
            .catch(err => console.log(err))
        } else {
            // Register with /api/users/
            fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization': 'Token 9de5ae4e0f924d43aef5eaad22403d3657009fe6' // later we will get token dynamically
                },
                body: JSON.stringify(this.state.credentials)
            })
            .then(res => res.json())
            .then(res => {
                // After registration - switch to login view
                this.setState({
                    isLoginView: true
                });
            })
            .catch(err => console.log(err))
        }
    }

    toggleView = () => {
        this.setState({
            isLoginView: !this.state.isLoginView
        });
    }

    render() {

        return (
            <div className="login-container">
                <h2>{this.state.isLoginView ? 'Login' : 'Register'}</h2>
                <label>Username</label><br/><br/>
                <input type="text" name="username" value={this.state.username} onChange={this.inputChanged} /><br/><br/>
                <label>Password</label><br/><br/>
                <input type="password" name="password" value={this.state.password} onChange={this.inputChanged} /><br/><br/>
                <button onClick={this.login}>
                    {this.state.isLoginView ? 'Login' : 'Register' }
                </button>
                <p onClick={this.toggleView}>
                    {this.state.isLoginView ? 'Create Account' : 'Back to login'}
                </p>
            </div>
        )
    }
}

export default withCookies(Login)
