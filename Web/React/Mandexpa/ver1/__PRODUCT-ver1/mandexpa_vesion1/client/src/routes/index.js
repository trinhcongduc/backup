/**
 * App Routes
 */
import React, { Component } from 'react';
import {Route, withRouter, Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

// app default layout
import RctAppLayout from 'Components/RctAppLayout';

// routes
import Dashboard from './dashboard';
import {getAuthAccount} from 'Actions/AuthActions';
import {getCookie} from '../helpers/session';
import { isEmpty } from '../helpers/helpers';


class MainApp extends Component {
	componentDidMount() {
		this.props.getAuthAccount();
	}
	
	render() {
		const { match, user } = this.props;
		var c_user = getCookie('c_user');

		return (
			(!isEmpty(user) && getCookie('session_id')) ? (
				(user._id.toString() === c_user.toString()) ? (
					<RctAppLayout>
						<Route path={`${match.url}/dashboard`} component={Dashboard} />
					</RctAppLayout>
					) : (
						<Redirect to="/login" />
					)
			) : (
				<div className="text-center">
					<p>
						<img src="http://www.green4future.in/theme/green/images/loading.gif" alt="Loading..."/>
					</p>
				</div>
			)
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.authUser.user
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAuthAccount: () =>  dispatch(getAuthAccount())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainApp));
