/**
 * Dashboard Overlay
 */
import React, { Component } from 'react';
import {connect} from "react-redux";
import UserBashBoard  from "./User/UserBashBoard";
import AdminDashBoard  from "./Admin/AdminDashBoard";

import {getAccountCurrent} from "Helpers";
import {ACCOUNT_TYPE} from "Constants/GeneralConfig";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAccount:getAccountCurrent()
        }
    }

    componentDidMount(){
        this.setState({
            currentAccount:getAccountCurrent()
        })
    }
    render() {
        let {currentAccount} = this.state;
        let {accounts} = this.props;
        return (
            <div>
                {
                    accounts !== {} && accounts.type === ACCOUNT_TYPE.ADMIN ?
                        (
                            <AdminDashBoard/>
                        ):
                        (
                            <UserBashBoard/>
                        )
                }

            </div>

        );
    }
}

const mapStateToProps = (state) =>{
    return {
        accounts : state.accounts.currentAccount
    }
};

export default connect(mapStateToProps,null)(Dashboard);
