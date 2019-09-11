/**
 * create SideBar Property Match router
 */
import React, { Component } from 'react'

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';
import ListPropertyMatch from "Components/SideBarPropertyMatch/list";

export default class propertyEdit extends Component {
    render() {
        const { match } = this.props;
        return (
            <div>
                <PageTitleBar title={<IntlMessages id="sidebar.property-matches.list" />} match={match} />
                <ListPropertyMatch/>
            </div>
        )
    }
}