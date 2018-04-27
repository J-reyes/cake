import React from 'react';
import Center from 'react-center';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import decode from 'jwt-decode';
import jwt from 'jsonwebtoken';


class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            correctPassword: false,
            registerClicked: false,
            loginClicked: false
        }
    }



    logIn = async () => {
        // send login info to User API
        try {
            // login call
            let response = await axios.post(`https://agile-shelf-11349.herokuapp.com/users/login`, {
                username: this.state.username,
                password: this.state.password
            });

            // result of login
            const correctPassword = response.data.success;
            const loginClicked = true;
            
            if (correctPassword) {
                // save token to computer
                localStorage.setItem('bearer', response.data.token);
            }
            
            this.setState({
                correctPassword,
                loginClicked
            });

        } catch (err) {
            console.log("AXIOS ERROR:" ,err.message);
        }
    }

    register() {
        this.setState({ registerClicked: true });
    }



    render() {
        if (this.state.correctPassword) {
            return (
                <Redirect to="/dashboard" />
            )
        }

        if (this.state.registerClicked) {
            return (
                <Redirect to="/register" />
            )
        }





        return (
            <div className="container col-sm-12" style={{ marginTop: '2em' }} >
                <div className="h1 row text-center">Cake Fraud Detection</div>
                <div className="col-sm-6 col-sm-offset-3" style={{ marginTop: '5em' }}>
                    <form className="col-sm-12">
                        {/* Username Input Field */}
                        <div className="form-group" >
                            <label htmlFor="username-input">Username</label>
                            <input onChange={(e) => { this.setState({ username: e.target.value }) }} value={this.state.username} type="username" className="form-control" id="username-input" placeholder="username" />
                        </div>
                        {/* Email Input Field End */}
                        {/* Password Input Field */}
                        <div className="form-group" >
                            <label htmlFor="password-input">Password</label>
                            <input onChange={(e) => { this.setState({ password: e.target.value }) }} value={this.state.password} type="password" className="form-control" id="password-input" placeholder="Password" />
                        </div>
                        {/* Password Inout Field End */}

                        <div>
                            {
                                (!this.state.correctPassword && this.state.loginClicked) ? <div style={{ color: 'red' }} >incorrect username or password</div> : ""
                            }
                        </div>
                        {/* Log In Button */}
                        <div>
                            <button onClick={e => this.logIn()} type="button" className="btn btn-success pull-right">Log In</button>
                        </div>
                        {/* Log In Button End */}
                        <div>
                            <span onClick={e => this.register()}>Register</span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


}

export default LogIn