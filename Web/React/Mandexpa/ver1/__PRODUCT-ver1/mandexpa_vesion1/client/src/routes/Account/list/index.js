import React, { Component } from 'react'

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';
import ListUserLayout from 'Components/AccountLayout/list/index';

export default class ListAccountDashboard extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="property-maintab-dashboard">
                <PageTitleBar title={<IntlMessages id="dashboard.account.list" />} match={match} />
                <ListUserLayout/>
            </div>
        )
    }
}
