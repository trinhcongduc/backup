/**
 * SAAS Dashboard
 */
import React, { Component } from 'react'

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import CreateContact from "Components/Contact/CreateContact";

export default class contactDashboard extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="saas-dashboard">
                <PageTitleBar title={<IntlMessages id="sidebar.contact" />} match={match} />
                <CreateContact/>
            </div>
        )
    }
}
