import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Center from 'react-center';

// Element Imports 

import LogIn from './login';
import Register from './register';
import TableRender from './react-table/table-render'

// Element Import End

class Container extends React.Component {

    render() {
        return (
            <div className="container" >
                <Switch>
                    <Route exact path="/" component={LogIn}  />
                    <Route path="/register" component={Register}  />
                    <Route path="/dashboard" component={TableRender} />
                </Switch>
            </div>
        )
    }
}

export default Container