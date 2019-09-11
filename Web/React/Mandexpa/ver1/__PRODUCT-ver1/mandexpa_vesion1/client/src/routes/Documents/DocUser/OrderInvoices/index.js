/**
 * SAAS Dashboard
 */
import React, { Component } from 'react'

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import OrderInvoices from "Components/Documents/DocUser/OrderInvoices";

export default class orderInvoices extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="saas-dashboard">
                <PageTitleBar title={<IntlMessages id="sidebar.document" />} match={match} />
                <OrderInvoices/>
            </div>
        )
    }
}
