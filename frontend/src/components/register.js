import React from 'react';
import Center from 'react-center';
import axios from 'axios';
import { Redirect } from 'react-router-dom';



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
            registrationCode: '',
            registerClicked: false,
            failedRegistration: false
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

        if (length < 6) {
            return (
                "Minimum of 6 characters"
            )
        }
    }


    registerUser() {

        var body = {
            name: this.state.first + " " + this.state.last,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            registrationCode: this.state.registrationCode
        }


        // register user with User API
        axios.post('https://agile-shelf-11349.herokuapp.com/users/register',
            body,
            {
                'headers': {
                    'key': this.state.registrationCode
                }
            }
        )
            .then(res => {
                if (res.data.success) {
                    console.log("NEW USER", res.data.user);
                    this.setState({
                        first: '',
                        last: '',
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        registrationCode: '',
                        registerClicked: true
                    });

                } else {
                    console.log("REGISTRATION UNSUCCESSFUL");
                    this.setState({
                        failedRegistration: true
                    })
                }

            })

    }

    render() {

        if (this.state.registerClicked) {
            return (
                <Redirect to="/" />
            )
        }

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
                            <label htmlFor="password-input">Confirm Password</label>
                            <input onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }} value={this.state.confirmPassword} type="password" className="form-control" id="confirmPasswordInput" placeholder="Confirm Password" required />
                            <div className="help-block with-errors"> {this.passwordMatch(this)} </div>
                        </div>
                        {/* End Confirm Password Inout Field  */}

                        <div className="form-group">
                            <label>Registration Code</label>
                            <input onChange={e => { this.setState({ registrationCode: e.target.value }) }} value={this.state.registrationCode} type="text" className="form-control" placeholder="Registration Code" required />
                        </div>

                        {/* Register Button */}
                        <Center>
                            <div className="">
                                <button onClick={e => this.registerUser()} type="button" className="btn btn-success btn-lg">Register</button>
                            </div>

                        </Center>
                        <Center>
                            <div className="">
                                {
                                    (this.state.failedRegistration ? <div className="text-center" style={{ padding: "15px", color: 'red' }} >invalid registration code</div> : "")
                                }
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