/**
 * MainTab of PropertySiderBar Dashboard
 */
import React, { Component } from 'react'

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import MainPropertyLayout from 'Components/SiderBarProperty';

export default class saasDashbaord extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="property-maintab-dashboard">
                <PageTitleBar title={<IntlMessages id="dashboard.property" />} match={match} />
                <MainPropertyLayout/>
            </div>
        )
    }
}
