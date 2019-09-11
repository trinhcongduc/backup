/**
 * SAAS Dashboard
 */
import React, { Component } from 'react'

// intl messages
import IntlMessages from '../../../util/IntlMessages';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';
import PropertyDetail from "Components/SiderBarProperty/EditProperty";
import {isEmpty} from "Helpers";

export default class propertyEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check : false,
            title_property:""
        };
    }
    get_child_props = (check,title_property) => {
        this.setState({
            check : check,
            title_property:title_property
        },()=>{
            // console.log("DATA-===>",this.state.property_data);
        })
    };
    render() {
        const { match } = this.props;
        return (
            <div className="saas-dashboard">
                {this.state.check?<PageTitleBar title={this.state.title_property} match={match} />:<PageTitleBar title={<IntlMessages id="sidebar.propertyedit" />} match={match} />}
                <PropertyDetail parent_get_check={this.get_child_props}/>
            </div>
        )
    }
}
