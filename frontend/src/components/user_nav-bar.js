import React from 'react';
import Center from 'react-center';

class UserNavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Center>
                <div style={{ paddingTop: 20 }} >
                    <nav className="nav-primary"  >
                        <div className="container-fluid"  >
                            <ul className="nav navbar-nav">
                                <li > <a style={{ color: "black", fontSize: 30 }} href="/dashboard" > Data </a> </li>
                                <li > <a style={{ color: "black", fontSize: 30 }} href="/settings" > Settings </a> </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </Center>
        )
    }
}

export default UserNavBar