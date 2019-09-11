/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import InforProperty  from './InforPropertyLayout';
import InforPrice from "./InforPriceLayout";
import CommissionProperty from "./CommissionPropertyLayout";
import HostPropertyLayout from "./OwnerPropertyLayout";
import {ACCOUNT_TYPE} from "Constants/GeneralConfig";
import {withFormik} from "formik";
import Address from "./Address";
import DialogCancel from '../DialogLayout/DialogCancelProperty';



class MainPropertyLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property_price:0,
            openCancelDialog: false,
        }
    }

    changeTab = (tab_number)=>{
        this.props.changeTab(tab_number);
    };

    getPropertyPrice =(value)=>{
        this.setState({
            property_price:value
        })
    };

    // action cancel property
    action_cancel = (status)=>{
        this.setState({
            openCancelDialog:status
        })
    };

    render(){
        var {propertyDetail} = this.props;
        const {property_price,openCancelDialog} = this.state;
        const {accountCurrent} = this.props;
        return(
            <div className="col-xs-10 col-sm-10 col-md-10">
                <DialogCancel openDialog={openCancelDialog} propertyDetail={propertyDetail} action_cancel={this.action_cancel}  />
                <div className="row">
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6 pdLeft0 radius0">
                        <div>
                            <InforProperty propertyDetail={propertyDetail}
                                           changeTab={this.changeTab}
                                           action_cancel={this.action_cancel}
                            /> <br/>
                            <InforPrice propertyDetail={propertyDetail}
                                        propery_price={this.getPropertyPrice}
                            /> <br/>
                            <CommissionProperty propertyDetail={propertyDetail}
                                                property_price={property_price}
                            /> <br/>
                        </div>

                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6 radius0">
                        <div>
                            {accountCurrent.type !== ACCOUNT_TYPE.PROMOTER &&( <div><HostPropertyLayout propertyDetail={propertyDetail}/><br/></div>)}
                            <Address propertyDetail={propertyDetail}/>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

// map state to props
const mapStateToProps = ( state ) => {
    return {
        propertyFields:state.propertyFields,
        accountCurrent:state.authLogin
    };
};

const mapDispatchToProps = (dispatch, props)=>{
    return{

    }
};

const FormikForm = withFormik({
    mapPropsToValues() {
        return {

        }
    },

})(MainPropertyLayout);

export default connect(mapStateToProps,mapDispatchToProps)(FormikForm);
