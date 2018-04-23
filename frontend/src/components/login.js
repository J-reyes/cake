import React from 'react';
import Center from 'react-center';
import axios from 'axios';
import { Redirect } from 'react-router-dom';



class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }


    logIn() {
        // debugging
        console.log(this.state.email);
        console.log(this.state.password);

        // send login info to User API
        

        //
    }

    render() {
        return (
            <Center>
                <div id="login" >
                    <form >

                        {/* Email Input Field */}
                        <div className="form-group" >
                            <label htmlFor="email-input">Email Address</label>
                            <input onChange={(e) => { this.setState({ email: e.target.value }) }} value={this.state.email} type="email" className="form-control" id="email-input" placeholder="Email" />
                        </div>
                        {/* Email Input Field End */}

                        {/* Password Input Field */}
                        <div className="form-group" >
                            <label htmlFor="password-input">Password</label>
                            <input onChange={(e) => { this.setState({ password: e.target.value }) }} value={this.state.password} type="password" className="form-control" id="password-input" placeholder="Password" />
                        </div>
                        {/* Password Inout Field End */}

                        {/* Log In Button */}
                        <Center>
                            <div>
                                <button onClick={this.logIn.bind(this)} type="button" className="btn btn-primary btn-lg">Log In</button>
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