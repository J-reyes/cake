import React from 'react';
import Center from 'react-center';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';



class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    class

    passwordLength() {
        let password = this.state.password;

        let length = password.length;

        if (length < 8) {
            return (
                "Minimum of 8 characters"
            )
        }
    }

    logIn() {


        // send login info to User API
        axios.post(`http://localhost:3000/users/login`, {
            username: this.state.username,
            password: this.state.password
        })
            .then(response => {
                localStorage.setItem('bearer', response.data.token);
                console.log(localStorage.bearer);
            })
        //
        console.log(this.state);
    }

    render() {
        return (
            <Center>
                <div id="login" >
                    <form >

                        {/* Email Input Field */}
                        <div className="form-group" >
                            <label htmlFor="username-input">Username</label>
                            <input onChange={(e) => { this.setState({ username: e.target.value }) }} value={this.state.username} type="username" className="form-control" id="username-input" placeholder="username" />
                        </div>
                        {/* Email Input Field End */}

                        {/* Password Input Field */}
                        <div className="form-group" >
                            <label htmlFor="password-input">Password</label>
                            <input onChange={(e) => { this.setState({ password: e.target.value }) }} value={this.state.password} type="password" className="form-control" id="password-input" placeholder="Password" />
                            <div className="help-block"> {this.passwordLength(this)} </div>
                        </div>
                        {/* Password Inout Field End */}

                        {/* Log In Button */}
                        <Center>
                            <div className="col-md-12" >
                                <div className="col-md-6">
                                    <button onClick={(e) => this.logIn()} type="button" className="btn btn-primary btn-lg">Log In</button>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/register" >
                                        <button onClick={(e) => this.logIn()} type="button" className="btn btn-success btn-lg">Register</button>
                                    </Link>
                                </div>
                            </div>
                        </Center>
                        {/* Log In Button End */}
                    </form>
                </div>
            </Center>
        )
    }


}

export default LogIn