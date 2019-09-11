import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {withFormik} from "formik";
import {connect} from "react-redux";
import {getListAgency, getListContactByConditions} from "Actions";
import {getAccountCurrent} from 'Helpers/helpers'
import IntlMessages from "Util/IntlMessages";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import CommissionItem from "./CommissionItem";
import {GET_AGENCYS,GET_ACCOUNTS_BY_CONDITIONS} from "Actions/types";
import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import {types_confirm_collaberate} from "Constants/ComponentConfigs/PropertyConfig";


const currentAccount = getAccountCurrent();
var position = 0;
var buf_len = 0;

class Commission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seller_agencies:[],
            buyer_agencies:[],
            list_agencies:[],
            is_solo:false,
            list_staff_contact:[],
            loadCom:false,
            seller_profit:{},
            buyer_profit:{},
            collaborators_id:null,
            seller:[]
        }
    }


    componentWillMount= async ()=>{
        buf_len = 0;
        const {agencies,propertyDetail} = this.props;
        let {reorder} = propertyDetail;
        if(reorder){
            let {buyer_profit} = reorder;
            buyer_profit = JSON.parse(buyer_profit) || null;
            if(buyer_profit && buyer_profit.id){
                let staff = await this.props.getListAgency({reason_social:buyer_profit.id},GET_ACCOUNTS_BY_CONDITIONS);
                this.setState({
                    list_staff_contact: staff,
                    buyer_profit:buyer_profit
                })
            }
        }
        let seller = await this.props.getListAgency({reason_social:reorder.seller_id},GET_ACCOUNTS_BY_CONDITIONS);
        this.setState({
            seller: seller,
        })
        if(agencies && agencies.length < 1) {
            this.props.getListAgency({type: "agency"}, GET_AGENCYS).then(res=>{
                res = res.map(item=>{
                    item.label = item.reason_social;
                    return item;
                });
                this.setState({
                    list_agencies: res,
                    is_solo:(reorder && reorder.id && reorder.is_solo === 1) || false
                })
            })
        }else{
            let agencies_clone = [...agencies];
            if(agencies_clone.length){
                agencies_clone = agencies_clone.map(item=>{
                    item.label = item.reason_social;
                    return item;
                });
            }
            this.setState({
                list_agencies: agencies_clone,
                is_solo:(reorder && reorder.id && reorder.is_solo === 1) || false
            });
        }
    };

    render() {
        const {seller_par,buyer_par,collaborators_id,confirm_collaberate} = this.props.values;
        const {is_solo,
            list_agencies,
            seller,
            list_staff_contact,
        } = this.state;
        return (
            <div className="card">
                <div className="card-header">
                    <IntlMessages id="property.reorder.commission.title"/>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6 ">
                            <div className="card">
                                <div className="card-header label-commission">
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <IntlMessages id="property.reorder.commission.commission_seller.title"/>
                                        </div>

                                    </div>
                                </div>
                                <div className="card-body ">
                                    {/*<div className="row">*/}
                                    {/*<div className="col-sm-4">*/}
                                    {/*<IntlMessages id="property.reorder.commission.advisor"/>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-sm-4">*/}
                                    {/*<IntlMessages id="property.reorder.commission.amount"/>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-sm-3">*/}
                                    {/*<IntlMessages id="property.reorder.commission.percent"/> */}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    <CommissionItem
                                        key={position}
                                        position={position}
                                        value={seller_par}
                                        number_pay={this.props.commission_property_price}
                                        name="seller_par"
                                        listOption={seller}
                                        isDisabled={false}
                                    />

                                </div>
                            </div>
                        </div>

                        {
                            !is_solo && (
                                <div className="col-sm-6 ">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-sm-5">
                                                    <IntlMessages id="property.reorder.commission.commission_buyer.title"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>
                                                            <IntlMessages id="property.reorder.commission.advisor.staff"/>
                                                        </label>
                                                        <div>
                                                            <SelectAutoComplete
                                                                name='collaborators_id'
                                                                value={collaborators_id}
                                                                listOption={list_agencies}
                                                                isClearable={true}
                                                                confirm_collaberate={confirm_collaberate}
                                                                isDisabled={true}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<div className="row">*/}
                                            {/*<div className="col-sm-4">*/}
                                            {/*<IntlMessages id="property.reorder.commission.advisor"/>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-sm-4">*/}
                                            {/*<IntlMessages id="property.reorder.commission.amount"/>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-sm-3">*/}
                                            {/*/!* <IntlMessages id="property.reorder.commission.percent"/> *!/*/}
                                            {/*</div>*/}
                                            {/*</div>*/}
                                            <CommissionItem
                                                key={position}
                                                position={position}
                                                value={buyer_par}
                                                name="buyer_par"
                                                number_pay={this.props.commission_property_price}
                                                listOption={list_staff_contact }
                                                confirm_collaberate={confirm_collaberate}
                                                isDisabled={false}
                                            />

                                            {/*{*/}
                                            {/*buyer_profit && buyer_profit.id &&*/}
                                            {/*(*/}
                                            {/*<div className="row">*/}
                                            {/*<div className="col-sm-4">*/}
                                            {/*<IntlMessages id="property.reorder.commission.advisor.staff"/>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-sm-6">*/}
                                            {/*<SelectAutoComplete*/}
                                            {/*name='collaborators_id'*/}
                                            {/*value={collaborators_id}*/}
                                            {/*onChange={this.handleBuyerStaffChange}*/}
                                            {/*listOption={list_staff_contact }*/}
                                            {/*isClearable={true}*/}
                                            {/*confirm_collaberate={confirm_collaberate}*/}
                                            {/*isDisabled={confirm_collaberate===types_confirm_collaberate.confirm_finished?true:false}*/}
                                            {/*/>*/}
                                            {/*</div>*/}
                                            {/*</div>*/}
                                            {/*)*/}
                                            {/*}*/}

                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        propertyFields: state.propertyFields,
        agencies :state.accounts.agencys,
        account : state.accounts.list,
        list_staff_contact :state.accounts.accounts_byConditions
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        getListAgency:(conditions,typeReducer)=>{
            return dispatch(getListAgency(conditions,typeReducer))
        },
        getListContactByConditions:(conditions,typeReducer)=>{
            return dispatch(getListContactByConditions(conditions,typeReducer))
        },
    }
};

const FormikForm = withFormik({

    mapPropsToValues(datas) {
        let {propertyDetail} =datas;
        let return_res = {
            seller_par:{},
            buyer_par:{},
            collaborators_id:null,
        };
        if(propertyDetail && propertyDetail.property && propertyDetail.property.id){
            let property_values = propertyDetail.property;
            return_res.seller_par.percent = property_values.commission_seller;
            return_res.buyer_par.percent = property_values.commission_buyer;
        }
        if(propertyDetail && propertyDetail.reorder && propertyDetail.reorder.id){
            let {reorder} = propertyDetail;
            let seller_par = reorder.seller_profit ?JSON.parse(reorder.seller_profit) : {};
            let buyer_par  = reorder.buyer_profit ? JSON.parse(reorder.buyer_profit)  : {};
            return_res.seller_par = {
                agency_id:seller_par.id || '',
                amount:seller_par.amount || '',
                percent:seller_par.percent || '',
            };
            return_res.buyer_par = {
                agency_id:buyer_par.id || '',
                amount:buyer_par.amount || '',
                percent:buyer_par.percent || '',

            };

            return_res.collaborators_id = reorder.collaborators_id;
            return_res.confirm_collaberate = reorder.confirm_collaberate

        }
        return return_res;
    },
    enableReinitialize: true

})(Commission);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormikForm));