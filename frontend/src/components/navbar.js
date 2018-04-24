import React, { Component } from 'react';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="container navbar row">
                <div className="col-sm-6 h1"> Fake Cake </div>
                <button className="btn btn-info pull-right" style={{ marginTop: '1.5em' }} onClick={e => localStorage.clear()} >Log Out</button>
            </div>
        )
    }
}

export default NavBar;

// export const NavBar = () => {

// }