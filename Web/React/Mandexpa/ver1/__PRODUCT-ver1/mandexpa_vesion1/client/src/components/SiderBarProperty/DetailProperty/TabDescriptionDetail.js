import React, {Component} from 'react';

import IntlMessages from "Util/IntlMessages";


class TabDescription extends Component {

    render() {

        var {propertyDetail} = this.props;

        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        Titre du bien
                    </div>
                    <div className="card-body">
                        <div>
                            <p className="obligateField"><span className="obligate">*</span><IntlMessages
                                id="property.description.add_slogan"/></p>
                            <div>
                                <div className="row">
                                    <div className="col-sm-10 col-md-10 col-lg-10 col-12">
                                    <div className="data-filled height40px">
                                        {propertyDetail.property.title_des!==null?propertyDetail.property.title_des:""}
                                    </div></div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-10 col-12">
                                <label>Descriptif du bien</label>
                                <div className="data-filled height40px">
                                {propertyDetail.property.des_pro!==null?propertyDetail.property.des_pro:""}</div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-10 col-12">
                                <label>A savoir</label>
                                <div className="data-filled height40px">
                                {propertyDetail.property.more_des!==null?propertyDetail.property.more_des:""}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}



export default TabDescription;