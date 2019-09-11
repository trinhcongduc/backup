import React, { Component } from 'react'

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';
import EditAccountLayout from '../../../components/AccountLayout/edit/index';

export default class EditAccountDashboard extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="property-maintab-dashboard">
                <PageTitleBar title={<IntlMessages id="dashboard.account.edit" />} match={match} />
                <EditAccountLayout/>
            </div>
        )
    }
}
