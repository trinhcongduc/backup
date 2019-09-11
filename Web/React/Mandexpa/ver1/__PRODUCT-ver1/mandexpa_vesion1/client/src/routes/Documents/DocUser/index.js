/**
 * SAAS Dashboard
 */
import React, { Component } from 'react'

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';
import DocUser from "Components/Documents/DocUser";

export default class docUser extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="saas-dashboard">
                <PageTitleBar title={<IntlMessages id="sidebar.document" />} match={match} />
                <DocUser/>
            </div>
        )
    }
}
