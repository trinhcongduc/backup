import React, { Component } from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import IntlMessages from "Util/IntlMessages";
import ActionFrontOffice from "./ActionFrontOffice";

class AdminDashBoard extends Component {

    createAccount = () =>{
        this.props.history.push("account/create");
    };

    render() {
        return (
            <div>
                <div className="row form-group">
                    <div className="col-5 col-sm-3">
                        <button className="btn btn-primary" onClick={this.createAccount}>
                            <IntlMessages id="dashboard.account.create"/>
                        </button>
                    </div>
                </div>
                <ActionFrontOffice/>
            </div>

        );
    }
}

export default connect(null,null)(withRouter(AdminDashBoard));