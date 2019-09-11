/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route,Link } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import {getLogin} from 'Actions/AuthActions'
import {getAccountCurrent} from  'Helpers/helpers'


// rct theme provider
import RctThemeProvider from './RctThemeProvider';


// Login Layout
import RctLoginLayout  from './RctLoginLayout';



//Main App
import RctDefaultLayout from './DefaultLayout';


import {getCookie} from "Helpers/session";
import authLogin from "../reducers/AuthLoginReducer";



/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */

const InitialPath = ({ component: Component, ...rest }) =>
	<Route
		{...rest}
        render={props =>
            getCookie('session_id')
                ? <Component {...props} />
                : <Redirect to={`/login`} />
        }
	/>;


class App extends Component {

    componentDidMount() {
    	let {userLogin} = this.props;
    	let hasCookie = getCookie('session_id');
    	if(hasCookie !== '' ) {
			if(userLogin.id === -1){
				this.props.getLogin().then(data=>{
				}).catch(err=>{
					console.log("========>> error dataLogin: ",err);
				});
			}
    	}
    }

	render() {
		const { location, match, user} = this.props;
        if(location.pathname === '/') return (<Redirect to={'app/dashboard'} />);
		return (
			<RctThemeProvider>
				<NotificationContainer />
				<InitialPath
					path={`${match.url}app`}
					authUser={user}
					component={RctDefaultLayout}
				/>
				<Route path="/login" component={RctLoginLayout} />
			</RctThemeProvider>
		);
	}
}

// map state to props
const mapStateToProps = (state)=> {
    return {userLogin:state.authLogin};
};
const mapDispatchToProps = (dispatch,props) => {
	return {
        getLogin:()=>{
            return dispatch(getLogin())
		},
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
