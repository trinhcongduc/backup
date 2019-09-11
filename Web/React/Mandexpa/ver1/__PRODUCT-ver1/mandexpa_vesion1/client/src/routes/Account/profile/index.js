import React, { Component } from 'react'

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';
import EditUserProfile from 'Components/AccountLayout/profile';

export default class AccountProfileDashboard extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="property-maintab-dashboard">
                <PageTitleBar title={<IntlMessages id="dashboard.account.profile" />} match={match} />
                <EditUserProfile/>
            </div>
        )
    }
}
