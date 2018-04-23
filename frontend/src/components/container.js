import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Center from 'react-center';

// Element Imports 

import LogIn from './login';
import Register from './register';
import HomeNavBar from './home_nav-bar';
import TableRender from './react-table/table-render'
import Settings from './settings';
import UserNavBar from './user_nav-bar';

// Element Import End

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           loggedIn: Boolean
        }
    }

    

    render() {
        return (
            <div className="container"   >
                {/* <Switch> */}
                    <Route exact path="/" component={HomeNavBar} />
                    {/* <Route path="/" component={UserNavBar} /> */}
                {/* </Switch> */}
                <Switch>
                    <Route exact path="/" component={LogIn} />
                    <Route path="/register" component={Register} />
                    <Route path="/dashboard" component={TableRender} />
                    <Route path="/settings" component={Settings} />
                </Switch>
            </div>
        )
    }
}

export default Container