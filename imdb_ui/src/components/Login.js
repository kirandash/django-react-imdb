import React, { Component } from 'react'

export class Login extends Component {

    // Create state for login details
    state = {
        credentials: {
            username: '',
            password: ''
        }
    }

    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({
            credentials: cred
        });
    }

    login = event => {
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
            window.location.href="/movies";
        })
        .catch(err => console.log(err))
    }

    render() {

        return (
            <div className="login-container">
                <h2>Login</h2>
                <label>Username</label><br/><br/>
                <input type="text" name="username" value={this.state.username} onChange={this.inputChanged} /><br/><br/>
                <label>Password</label><br/><br/>
                <input type="password" name="password" value={this.state.password} onChange={this.inputChanged} /><br/><br/>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

export default Login
