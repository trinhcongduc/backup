import React, { Component } from 'react';
import InformationGenaral from './InformationGenaral';
import OverviewAction from './OverviewAction';



class TabOverview extends Component{
    render(){
        return(
            <div>
                <InformationGenaral propertyDetail={this.props.propertyDetail}/>
                <br/>
                <OverviewAction propertyDetail={this.props.propertyDetail}/>
            </div>
        )
    }
}
export default TabOverview;