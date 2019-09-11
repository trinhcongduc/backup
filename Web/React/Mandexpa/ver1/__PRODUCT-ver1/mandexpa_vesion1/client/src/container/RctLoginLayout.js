/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { loginAccount } from "../actions/AuthActions";
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import { Redirect, withRouter,  } from 'react-router-dom';
// components
import { SessionSlider } from 'Components/Widgets';

// app config
import AppConfig from 'Constants/AppConfig';
import {getCookie} from "Helpers/session";
import {isEmpty} from "Helpers/helpers";

// redux action
// import {
//     loginAccount
// } from 'Actions';

class Signin extends Component {

    state = {
        email: '',
        password: ''
    }

    /**
     *
     * setState
     */
    updateLoginDetail(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    /**
     * On User Login
     */
    onLogin(e) {
        e.preventDefault();
        // this.props.history.push('/app/dashboard/ecommerce');
        this.props.login(this.state.email, this.state.password)
            .then(account => {
            this.props.history.push('/app/dashboard/main');
        });
    }


    render() {
        const { user } = this.props;
        const { loading } = this.props;
        var c_user = getCookie('c_user');
        if(getCookie('session_id') ) {
            return (<Redirect to='/app/dashboard/main'/>);
        }
        return (
            <QueueAnim type="bottom" duration={2000}>
                <div className="rct-session-wrapper">
                    {loading &&
                    <LinearProgress />
                    }
                    <AppBar position="static" className="session-header">
                        <Toolbar>
                            <div className="container">
                                <div className="d-flex justify-content-between">
                                    {/* <div className="session-logo">
                                        <Link to="/">
                                            <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className="session-inner-wrapper">
                        <div className="container">
                            <div className="row row-eq-height">
                                <div className="col-md-6 offset-md-3 mt-50">
                                    <div className="session-body text-center">
                                        <div className="session-head mb-30">
                                            <div className="session-logo">
                                                <Link to="/">
                                                    <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                                                </Link>
                                            </div>
                                            {/* <h1 className="font-weight-bold col-md-8">Welcome Mandexpa</h1> */}
                                        </div>
                                        <form onSubmit={(e) => this.onLogin(e)}>
                                            <div className="form-group">
                                                {/* <label className="font-weight-bold" htmlFor="email">Email</label> */}
                                                <input type="text" placeholder="Email" className="form-control" name='email' value={this.state.email} onChange={(event) => this.updateLoginDetail(event)} required />
                                            </div>
                                            <div className="form-group">
                                                {/* <label className="font-weight-bold" htmlFor="password">Password</label> */}
                                                <input type="password" placeholder="Password" className="form-control" name='password' value={this.state.password} onChange={(event) => this.updateLoginDetail(event)} required />
                                            </div>
                                            <div className="col-md-6 offset-md-3">
                                                <button type="submit" className="btn btn-outline-primary">Login</button>
                                             </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </QueueAnim>
        );
    }
}

// map state to props
function mapStateToProps(state) {
    return { user:  state.authUser.user }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (email, password) => dispatch(loginAccount(email, password))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
