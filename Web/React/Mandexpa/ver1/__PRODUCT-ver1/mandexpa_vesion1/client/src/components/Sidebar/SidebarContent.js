/**
 * Sidebar Content
 */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {getAccountCurrent,checkUserPermission} from 'Helpers/helpers';
import {ACCOUNT_TYPE} from 'Constants/GeneralConfig';

import IntlMessages from 'Util/IntlMessages';

import NavMenuItem from './NavMenuItem';

// redux actions
import { onToggleMenu } from 'Actions';

class SidebarContent extends Component {
    constructor(props) {
        super(props);
        this.state={
            currenAccount:null
        }
    }

    componentWillMount(){
        this.setState({
            currenAccount:getAccountCurrent()
        })
    }

    toggleMenu(menu, stateCategory) {
        let data = {
            menu,
            stateCategory
        }
        this.props.onToggleMenu(data);
    }

    render() {
        const { sidebarMenus } = this.props.sidebar;
        const {currenAccount} = this.state;
        return (
            <div className="rct-sidebar-nav">
                <nav className="navigation">
                    <List
                        className="rct-mainMenu p-0 m-0 list-unstyled"
                        subheader={
                            <ListSubheader className="side-title" component="li">
                                <IntlMessages id="sidebar.general" />
                            </ListSubheader>}
                    >
                        {sidebarMenus.category1.map((menu, key) => (
                            checkUserPermission(currenAccount,menu.permission)||typeof menu.permission ==="undefined"?
                                (<NavMenuItem
                                    menu={menu}
                                    key={key}
                                    onToggleMenu={() => this.toggleMenu(menu, 'category1')}
                                />):null
                        ))}
                    </List>
                </nav>
            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ sidebar }) => {
    return { sidebar };
};

export default withRouter(connect(mapStateToProps, {
    onToggleMenu
})(SidebarContent));
