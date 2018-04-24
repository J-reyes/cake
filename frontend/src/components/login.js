import React from 'react';
import Center from 'react-center';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import decode from 'jwt-decode';



class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            incorrectPassword: null
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
                this.setState({...this.state, incorrectPassword: false})
            })
            .catch(error => {
                this.setState({ ...this.state, incorrectPassword: true })
                console.log("incorrect password:; " + error);
            })
    }



    render() {
        if (this.state.incorrectPassword === false) {
            return (
                <Redirect to="/dashboard" />
            )
        }

        return (
            <div className="container col-sm-12" style={{marginTop: '2em'}} >
                <div className="h1 row text-center">Cake Fraud Detection</div>
                <div className="col-sm-6 col-sm-offset-3" style={{marginTop: '5em'}}>
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
                                this.state.incorrectPassword ? <div style={{color: 'red'}} >incorrect username or password</div> : false
                            }
                        </div>
                        {/* Log In Button */}
                        <div>
                            <button onClick={e => this.logIn()} type="button" className="btn btn-success pull-right">Log In</button>
                        </div>
                        {/* Log In Button End */}

                    </form>
                </div>
            </div>
        )
    }


}

export default LogIn