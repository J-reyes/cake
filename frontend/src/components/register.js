import React from 'react';
import Center from 'react-center';
import axios from 'axios';
import { Link } from 'react-router-dom';



class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            first: '',
            last: '',

            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    passwordMatch() {
        if (this.state.password != this.state.confirmPassword) {
            return (
                "Passwords Do Not Match"
            )
        }
    }

    passwordLength() {
        let password = this.state.password;

        let length = password.length;

        if (length < 8) {
            return (
                "Minimum of 8 characters"
            )
        }
    }


    registerUser() {

        var body = {
            name: this.state.first + " " + this.state.last,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }

        // register user with User API
        axios.post('http://localhost:3000/users/', body)
            .then(response => {
                this.setState({
                    first: '',
                    last: '',
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
            })
        // Debugging
    }

    render() {
        return (
            <Center>
                <div id="register" >
                    <form data-toggle="Validator" role="form"  >

                        {/* Name Input Field */}
                        <div className="form-group" >
                            <Center>
                                <label htmlFor="name-input">Enter Name</label>
                            </Center>
                            <div className="col-md-12" >
                                <div className="col-md-6">
                                    <input onChange={(e) => { this.setState({ first: e.target.value }) }} value={this.state.first} type="text" className="form-control" id="firstName-input" placeholder="First Name" />
                                </div>
                                <div className="col-md-6">
                                    <input onChange={(e) => { this.setState({ last: e.target.value }) }} value={this.state.last} type="text" className="form-control" id="secondName-input" placeholder="Last Name" />
                                </div>
                            </div>
                        </div>
                        { /* End Name Input Field  */}

                        {/* Email Input Field */}
                        <div className="form-group" style={{ paddingTop: 40 }} >
                            <label htmlFor="username-input">User Name</label>
                            <input onChange={(e) => { this.setState({ username: e.target.value }) }} value={this.state.username} type="email" className="form-control" id="username-input" placeholder="User Name" />
                        </div>
                        {/* Email Input Field */}
                        <div className="form-group"  >
                            <label htmlFor="email-input">Email Address</label>
                            <input onChange={(e) => { this.setState({ email: e.target.value }) }} value={this.state.email} type="email" className="form-control" id="email-input" placeholder="Email" />
                        </div>
                        {/* End Email Input Field  */}

                        {/* Password Input Field */}
                        <div className="form-group" >
                            <label htmlFor="password-input">Password</label>
                            <input id="passwordInput" onChange={(e) => { this.setState({ password: e.target.value }) }} value={this.state.password} type="password" className="form-control" placeholder="Password" required />
                            <div className="help-block"> {this.passwordLength(this)} </div>
                        </div>
                        {/* End Password Inout Field  */}

                        {/* Confirm Password Input Field */}
                        <div className="form-group" >
                            <label htmlFor="password-input"> Confirm Password</label>
                            <input onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }} value={this.state.confirmPassword} type="password" className="form-control" id="confirmPasswordInput" placeholder="Confirm Password" required />
                            <div className="help-block with-errors"> {this.passwordMatch(this)} </div>
                        </div>
                        {/* End Confirm Password Inout Field  */}

                        {/* Register Button */}
                        <Center>
                            <div>
                                <Link to="/dashboard" >
                                    <button onClick={this.registerUser.bind(this)} type="button" className="btn btn-warning btn-lg">Register</button>
                                </Link>
                            </div>
                        </Center>
                        {/* End Register Button  */}

                    </form>
                </div>
            </Center>
        )
    }


}

export default Register;