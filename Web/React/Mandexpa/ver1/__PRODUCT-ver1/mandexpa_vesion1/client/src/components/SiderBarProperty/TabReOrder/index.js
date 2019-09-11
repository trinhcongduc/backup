import React, {Component} from 'react';
import { withRouter} from "react-router-dom";
import {withFormik} from "formik";
import {connect} from "react-redux";
import {vadidateCollaberateByAgencyA, updateFieldsPropertyReorderTab, confirmCollaberateByAgencyB} from "Actions";

import Detail_Transaction from "./Detail_Transaction";
import Commission from "./Commission";
import {datebyFormat} from "Helpers";
import {types_confirm_collaberate} from "Constants/ComponentConfigs/PropertyConfig";

class Tab_ReOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkChange:false,
            commission_property_price:0,
            tab_values:{}
        }
    }
    componentWillMount(){
        let {propertyDetail} = this.props;
        if(propertyDetail && propertyDetail.property && propertyDetail.property.id){
            this.setState({
                commission_property_price: propertyDetail.property.total_commission_inclusive
            })
        }
    }

    _isChanged = (status)=>{
        this.setState({
            checkChange:status
        })
    };

    validate_commission_percent=(data)=>{
        if(this.state.tab_values.seller_profit !== undefined){
            let seller_percent = parseInt(data.seller_profit.percent);
            let buyer_percent = parseInt(data.buyer_profit.percent);
            let old_seller_percent = parseInt(this.state.tab_values.seller_profit.percent);
            let old_buyer_percent = parseInt(this.state.tab_values.buyer_profit.percent);
            if(seller_percent !== old_seller_percent){
                // data.seller_profit.percent = 100 - seller_percent;
                data.buyer_profit.percent = 100 - seller_percent;
            }
            if(buyer_percent !== old_buyer_percent){
                data.seller_profit.percent = 100 - buyer_percent;
            }
        }
        return data;
    };

    _updateValue = (data) =>{
        let {price} = this.state.tab_values || this.props.propertyDetail.total_commission_inclusive;
        // if(!data.is_solo && data.seller_profit !== undefined){
        //     console.log("Validate commission percent");
        //     data =  this.validate_commission_percent(data);
        // }
        if(data.price !== undefined){
            price =  data.price;
        }
        if(data.isChange){
            this._isChanged(true);
        }
        this.setState({
            tab_values:Object.assign(this.state.tab_values,data),
            commission_property_price:price * 0.02
        }
        // ,()=>{
        //     console.log("___DATA___>",this.state.tab_values);
        // }
        );
    };

    _saveToRedux = () => {
        let {checkChange} = this.state;
        let {propertyFields,propertyDetail} = this.props;
        let {preTab} = propertyFields;
        if (checkChange && (preTab === 7 || preTab === "7")) {
            let data = Object.assign({},this.state.tab_values);
            delete data.checkChange;
            delete data.commission_property_price;
            data.isSold = 1;
            if(propertyDetail && propertyDetail.reorder && propertyDetail.reorder.id){
                data.id = propertyDetail.reorder.id
            }
            data.created_date = datebyFormat();
            this.props.updateFieldsPropertyReorderTab(data);
            this._isChanged(false);
        }
    };
    changeTab = (tab_number)=>{
        this.props.changeTab(tab_number);
    };
    handleVadidate = () => {
        this.props.vadidateCollaberateByAgencyA(this.props.propertyDetail.property.id).then(() => {
            location.reload();
        }).catch(err => {
            location.reload();
        })
    };
    render() {
        this._saveToRedux();
        let {commission_property_price} = this.state;
        let confirm_collaberate = this.props.propertyDetail.reorder?this.props.propertyDetail.reorder.confirm_collaberate:"";
        return (
            <div>
                <Detail_Transaction updateParentValue={this._updateValue}  propertyDetail={this.props.propertyDetail}/><br/>
                <Commission  updateParentValue={this._updateValue}  propertyDetail={this.props.propertyDetail} commission_property_price={commission_property_price} /><br/>
                {confirm_collaberate === types_confirm_collaberate.confirm_by_buyer?<button className="confirm-a"  onClick={this.handleVadidate} >Valider la transaction </button>:""}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        propertyDatas: state.propertyDatas,
        propertyFields: state.propertyFields
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateFieldsPropertyReorderTab: (fields) => {
            dispatch(updateFieldsPropertyReorderTab(fields))
        },
        vadidateCollaberateByAgencyA: (id) => {
            return dispatch(vadidateCollaberateByAgencyA(id))
        }
    }
};

const FormikForm = withFormik({

    mapPropsToValues(datas) { // Init form field
        return {

        }
    },
    enableReinitialize: true

})(Tab_ReOrder);

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FormikForm));