/**
 * Ecommerce Dashboard
 */

import React, { Component } from 'react'


import IntlMessages from 'Util/IntlMessages';
import WrapComponent from "Components/ComponentHelper/HOCs/WrapComponent"

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import DashBoard from 'Components/DashBoard';


export default class EcommerceDashboard extends Component {
   render() {
      const { match } = this.props;
      return (
          <WrapComponent
            componentTitle={<PageTitleBar title={<IntlMessages id="sidebar.ecommerce" />} match={match} />}
          >
              <DashBoard/>
          </WrapComponent>
      )
   }
}
