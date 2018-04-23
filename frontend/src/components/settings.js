import React from 'react';
import Center from 'react-center';


class Settings extends React.Component {
    constructor(props) {
        super(props);

    }

   
    render() {
        return (
            <Center>
                <div id="register" >
                    <button className="btn btn-danger btn-lg">Log Out</button>
                </div>
            </Center>
        )
    }
}

export default Settings