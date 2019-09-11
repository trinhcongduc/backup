/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';



class Test extends Component {
    render() {

        return (
            <div>
                <h1>nothing</h1>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
    const { user } = authUser;
    return { user };
};

export default connect(mapStateToProps)(Test);
