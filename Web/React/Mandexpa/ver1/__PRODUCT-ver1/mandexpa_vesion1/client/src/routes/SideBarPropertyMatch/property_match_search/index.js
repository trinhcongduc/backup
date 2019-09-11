/**
 * create SideBar Property Match router
 */
import React, { Component } from 'react'

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';
import ListPropertyMatchSearch from "Components/SideBarPropertyMatch/property_match_seach";

export default class propertyEdit extends Component {
    render() {
        const { match } = this.props;
        return (
            <div>
                <PageTitleBar title={<IntlMessages id="sidebar.property-matches.list" />} match={match} />
                <ListPropertyMatchSearch/>
            </div>
        )
    }
}