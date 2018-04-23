import React from 'react';
import Center from 'react-center';
import axios from 'axios';
import { Redirect } from 'react-router-dom';



class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
                        </div>
                        {/* Password Inout Field End */}

                        {/* Log In Button */}
                        <Center>
                            <div>
                                <button onClick={(e) => this.logIn()} type="button" className="btn btn-primary">Log In</button>
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