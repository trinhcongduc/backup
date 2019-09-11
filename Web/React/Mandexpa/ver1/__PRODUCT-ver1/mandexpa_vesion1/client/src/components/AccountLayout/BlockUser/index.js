/**
 * User Block Component
 */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import {getAccountCurrent} from 'Helpers/helpers';
import {URL_SERVER} from 'Constants/GeneralConfig';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

// components
import SupportPage from 'Components/Support/Support';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown,faPowerOff,faAddressCard} from '@fortawesome/free-solid-svg-icons'

// redux action
import { logoutAccount } from 'Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import AutoCropImage from "Components/ComponentHelper/ComponentBase(building...)/AutoCropImage";
import ModalConfirmComponent from "Components/ComponentHelper/HOCs/ModalConfirmComponent";
const defaul_image_account = require('Assets/avatars/default-user.jpg');



const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
	},
	image_account:{
		maxWidth:"50px",
		paddingTop:"10px",
		height:"auto"
	},
	sub_image_account:{
		maxWidth:"40px",
		height:"auto"
	},
	Dropdownmenu:{
		minWidth:"15em"
	}
});

class UserBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userDropdownMenu: false,
			isSupportModal: false,
			confirmLogout:false
		};
	}


	/**
	 * Logout User
	 */
	logoutUser = () => {
		this.setState({
			confirmLogout:true
		})
	};

	toggleConfirmLogout = () =>{
		return () => {
			this.setState({
				confirmLogout:!this.state.confirmLogout
			})
		}
	};

	confirmLogout = () => {
		return () =>{
			this.props.logoutAccount();
		}
	};

	/**
	 * Toggle User Dropdown Menu
	 */
	toggleUserDropdownMenu() {
		this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
	}

	/**
	 * Open Support Modal
	 */
	openSupportModal() {
		this.setState({ isSupportModal: true });
	}

	/**
	 * On Close Support Page
	 */
	onCloseSupportPage() {
		this.setState({ isSupportModal: false });
	}

	/**
	 * On Submit Support Page
	 */
	onSubmitSupport() {
		this.setState({ isSupportModal: false });
		NotificationManager.success('Message has been sent successfully!');
	}

	render() {
        // const {user} = this.props;
		const { classes} = this.props;
		const { confirmLogout} = this.state;
        const user = getAccountCurrent();
        let logo = user !== null && user.logo === null || user.logo === ''?defaul_image_account:( URL_SERVER + user.logo);
        let fullname = user.firstname + " " + user.lastname;

		return (
			<div className="top-sidebar">

				{/*Modal for action confirm logout */}
				<ModalConfirmComponent
					title={<IntlMessages id="modal.logout.title"/>}
					openDialog={confirmLogout}
					handleCancel={this.toggleConfirmLogout}
					handleConfirm ={this.confirmLogout}
					onClose={this.toggleConfirmLogout}

				>
					<IntlMessages id="modal.logout.content"/>
				</ModalConfirmComponent>

				<div className="sidebar-user-block">
					<Dropdown
						isOpen={this.state.userDropdownMenu}
						toggle={() => this.toggleUserDropdownMenu()}
						// className="rct-dropdown"
					>
						<DropdownToggle
							tag="div"
							caret
							className="d-flex align-items-center"
						>
							<div className="user-profile">
								<AutoCropImage src={logo} imageSize={{height:'50px',width:'50px'}} />
							</div>
							<div className="user-info ml-5">
								<FontAwesomeIcon icon={faAngleDown} style={{color:"#56378f"}} />
							</div>
						</DropdownToggle>
						<DropdownMenu className={classNames(classes.Dropdownmenu)}>
							<ul className="list-unstyled mb-0">
								<li className="p-2 border-bottom user-profile-top bg-primary rounded-top"
									onClick={() => this.toggleUserDropdownMenu()}
								>
									<Link to={{
										pathname: '/app/dashboard/account/my-profile',
										state: { activeTab: 0 }
									}} >
										<div className="d-flex">
											<AutoCropImage src={logo} imageSize={{height:'40px',width:'40px'}} />
											<span className="user-name ml-4 flex-grow-2 text-white">{fullname}</span>
										</div>
									</Link>

								</li>
								<li onClick={() => this.toggleUserDropdownMenu()}>
									<Link to={{
										pathname: '/app/dashboard/account/my-profile',
										state: { activeTab: 0 }
									}} >
										<div className="d-flex p-2">
											<FontAwesomeIcon icon={faAddressCard} style={{color:"#56378f"}} />
											<div className="ml-4 flex-grow-2">
												<IntlMessages id="widgets.profile" />
											</div>
										</div>
									</Link>
								</li>
								<li className="border-top cursor_pointer">
									<div className="d-flex p-2" onClick={ () => this.logoutUser()}>
										<div>
											<FontAwesomeIcon icon={faPowerOff} style={{color:"red"}} />
										</div>
										<div className="ml-4 flex-grow-2"><IntlMessages id="widgets.logOut" /></div>
									</div>
								</li>
							</ul>
						</DropdownMenu>
					</Dropdown>
				</div>
				<SupportPage
					isOpen={this.state.isSupportModal}
					onCloseSupportPage={() => this.onCloseSupportPage()}
					onSubmit={() => this.onSubmitSupport()}
				/>
			</div>
		);
	}
}

// map state to props
function mapStateToProps(state) {
    return {
        user: state.authUser.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logoutAccount: () => dispatch(logoutAccount())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(UserBlock));
