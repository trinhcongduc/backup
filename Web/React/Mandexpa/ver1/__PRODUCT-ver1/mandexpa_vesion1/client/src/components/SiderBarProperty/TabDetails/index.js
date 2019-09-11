import React, { Component } from 'react';
import InforDetailsPropertyLayout  from "./InforDetailsPropertyLayout";
import PropertyCharacterDescription from "./PropertyCharacterDescription";
import FacilityLayout from "./FacilityLayout";
class Localistation extends Component{
    render(){
        let {propertyDetail} = this.props;
        return(
            <div>
                <InforDetailsPropertyLayout  propertyDetail={propertyDetail} /><br/>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <FacilityLayout  propertyDetail={propertyDetail}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <PropertyCharacterDescription  propertyDetail={propertyDetail}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Localistation;