import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Center from 'react-center';

// Element Imports 

import LogIn from './login';
import Register from './register';
import Dashboard from './react-table/dashboard'
import BadToken from './bad-token-page';

// Element Import End

class Container extends React.Component {

    render() {
        return (
            <div className="container" >
                <Switch>
                    <Route exact path="/" component={LogIn}  />
                    <Route path="/register" component={Register}  />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/badtoken" component={BadToken} />
                </Switch>
            </div>
        )
    }
}

export default Container