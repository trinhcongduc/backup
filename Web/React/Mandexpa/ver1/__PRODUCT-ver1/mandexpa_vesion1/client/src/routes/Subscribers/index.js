
import React, { Component } from 'react'

// intl messages
import IntlMessages from '../../util/IntlMessages';

// page title bar
import PageTitleBar from '../../components/PageTitleBar/PageTitleBar';
import Subscribers from '../../components/AccountLayout/Subscribers';

export default class SubscribersDashboard extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="property-maintab-dashboard">
                <PageTitleBar title={<IntlMessages id="sidebar.account.subscribers" />} match={match} />
                <Subscribers/>
            </div>
        )
    }
}
