
import React, { Component } from 'react'

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';
import CreateUserLayout from '../../../components/AccountLayout/create/index';

export default class CreateAccountDashboard extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="property-maintab-dashboard">
                <PageTitleBar title={<IntlMessages id="dashboard.account.create" />} match={match} />
                <CreateUserLayout/>
            </div>
        )
    }
}
