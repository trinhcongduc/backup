/**
 * App Header
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import screenfull from 'screenfull';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import IntlMessages from"Util/IntlMessages";
import {getPusherNotify} from "Helpers";

//connect
import { withRouter } from 'react-router-dom';
import {withStyles} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames";
import $ from 'jquery';

import BlockUser from  'Components/AccountLayout/BlockUser';

// actions
import { collapsedSidebarAction } from 'Actions';
import {getAccountCurrent} from "Helpers"

// components
import SearchForm from './SearchForm';
import MobileSearchForm from './MobileSearchForm';

const styles = theme => ({
	icon_notify:{
		color:'black',
		fontSize:'1.65em'
	},
	welcome_user:{
		[theme.breakpoints.down('xs')]:{
			display:'none',
		}
	},
	txtBlack:{
		color:'black',
	},
	cursor_pointer:{
		cursor:'pointer'
	}
});

class Header extends Component {

	state = {
		customizer: false,
		isMobileSearchFormVisible: false
	};

	// function to change the state of collapsed sidebar
	onToggleNavCollapsed = (event) => {
		const val = !this.props.navCollapsed;
		this.props.collapsedSidebarAction(val);
	};

	componentDidMount(){
		// getPusherNotify("test")
	}


	goToDashboard = () =>{
		this.props.history.push("/app/dashboard/main");
	};

	// open dashboard overlay
	openDashboardOverlay() {
		$('.dashboard-overlay').toggleClass('d-none');
		$('.dashboard-overlay').toggleClass('show');
		if ($('.dashboard-overlay').hasClass('show')) {
			$('body').css('overflow', 'hidden');
		} else {
			$('body').css('overflow', '');
		}
	}

	// close dashboard overlay
	closeDashboardOverlay() {
		$('.dashboard-overlay').removeClass('show');
		$('.dashboard-overlay').addClass('d-none');
		$('body').css('overflow', '');
	}

	// toggle screen full
	toggleScreenFull() {
		screenfull.toggle();
	}

	// mobile search form
	openMobileSearchForm() {
		this.setState({ isMobileSearchFormVisible: true });
	}

	render() {
		const { isMobileSearchFormVisible } = this.state;
		let currentAccount = getAccountCurrent();
		$('body').click(function () {
			$('.dashboard-overlay').removeClass('show');
			$('.dashboard-overlay').addClass('d-none');
			$('body').css('overflow', '');
		});

		const { horizontalMenu, agencyMenu,classes} = this.props;
		return (
			<AppBar position="static" className="rct-header">
				<Toolbar className="d-flex justify-content-between w-100 pl-0">
					<div className="d-flex align-items-center">
						{(horizontalMenu || agencyMenu) &&
							<div className="site-logo">
								<Link to="/" className="logo-mini">
									<img src={require('Assets/img/appLogo.png')} className="mr-15" alt="site logo" width="35" height="35" />
								</Link>
								<Link to="/" className="logo-normal">
									<img src={require('Assets/img/appLogoText.png')} className="img-fluid" alt="site-logo" width="67" height="17" />
								</Link>
							</div>
						}
						{!agencyMenu &&
							<ul className="list-inline mb-0 navbar-left">
								{!horizontalMenu ?
									<li className="list-inline-item" onClick={(e) => this.onToggleNavCollapsed(e)}>
										<Tooltip title="Sidebar Toggle" placement="bottom">
											<IconButton color="inherit" mini="true" aria-label="Menu" className="humburger p-0">
												<MenuIcon />
											</IconButton>
										</Tooltip>
									</li> :
									<li className="list-inline-item">
										<Tooltip title="Sidebar Toggle" placement="bottom">
											<IconButton color="inherit" aria-label="Menu" className="humburger p-0" component={Link} to="/">
												<i className="ti-layout-sidebar-left"> </i>
											</IconButton>
										</Tooltip>
									</li>
								}
								 <li className="list-inline-item search-icon d-inline-block logoHeader">
									{/*<SearchForm />*/}
									{/*<IconButton mini="true" className="search-icon-btn" onClick={() => this.openMobileSearchForm()}>*/}
										{/*<i className="zmdi zmdi-search"></i>*/}
									{/*</IconButton>*/}
									{/*<MobileSearchForm*/}
										{/*isOpen={isMobileSearchFormVisible}*/}
										{/*onClose={() => this.setState({ isMobileSearchFormVisible: false })}*/}
									{/*/>*/}
									 <img src={require('Assets/img/logo_header.png')} className={classNames("mr-15",classes.cursor_pointer)} alt="site logo" width="150"  onClick={this.goToDashboard}/>
								 </li>
							</ul>
						}

					</div>
					<div className="d-flex align-items-center justify-content-end">
						<div className="p-2 bd-highlight">
							<span className={classes.icon_notify}>
								<FontAwesomeIcon icon={['fas','bell']}/>
							</span>
						</div>
						<div className={classNames("p-2 ",classes.txtBlack,classes.welcome_user)}>
							<IntlMessages id="welcome" /> {currentAccount.fullname}
						</div>
						<div className="p-2 bd-highlight">
							<BlockUser/>
						</div>
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return settings;
};

export default withRouter(connect(mapStateToProps, {
	collapsedSidebarAction
})(withStyles(styles)(Header)));
