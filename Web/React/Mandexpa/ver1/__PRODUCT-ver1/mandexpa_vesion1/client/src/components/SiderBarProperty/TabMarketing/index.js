import React, { Component } from 'react';
import reactCSS from 'reactcss'
import MarketPortals from "Components/SiderBarProperty/TabMarketing/MarketPortals";
import InforLocation from "Components/SiderBarProperty/TabDetails/InforLocation";
import MapContainer from "Components/SiderBarProperty/TabDetails/MapContainer";
import PublishMagazines from "Components/SiderBarProperty/TabMarketing/PublishMagazines";
import SocialNetworking from "Components/SiderBarProperty/TabMarketing/SocialNetworking";
import PublicAgency from "Components/SiderBarProperty/TabMarketing/PublicAgency";
import IntlMessages from "Util/IntlMessages";
class Marketing extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        const styles = reactCSS({
            'default': {
                card_margin : {
                    marginTop : "20px",
                },
            },
        });
        return(
            <div>
                <div className="row">
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <IntlMessages id="property.marketing.ad"/>
                            </div>
                            <div className="card-body">
                                <MarketPortals propertyDetail={this.props.propertyDetail}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <IntlMessages id="property.marketing.magazine"/>
                            </div>
                            <div className="card-body">
                                <PublishMagazines propertyDetail={this.props.propertyDetail} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={styles.card_margin}>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <IntlMessages id="property.marketing.social_network"/>
                            </div>
                            <div className="card-body">
                                <SocialNetworking propertyDetail={this.props.propertyDetail} check_agency={this.state.check_agency}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <IntlMessages id="property.marketing.public_agency"/>
                            </div>
                            <div className="card-body">
                                <PublicAgency propertyDetail={this.props.propertyDetail}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Marketing;