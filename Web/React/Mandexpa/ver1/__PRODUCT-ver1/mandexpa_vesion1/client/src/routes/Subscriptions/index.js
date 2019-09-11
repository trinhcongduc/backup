
import React, { Component } from 'react'

// intl messages
import IntlMessages from '../../util/IntlMessages';

// page title bar
import PageTitleBar from '../../components/PageTitleBar/PageTitleBar';
import Subscriptions from '../../components/AccountLayout/Subscriptions';

export default class SubscriptionsDashboard extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="property-maintab-dashboard">
                <PageTitleBar title={<IntlMessages id="sidebar.account.subscriptions" />} match={match} />
                <Subscriptions/>
            </div>
        )
    }
}
