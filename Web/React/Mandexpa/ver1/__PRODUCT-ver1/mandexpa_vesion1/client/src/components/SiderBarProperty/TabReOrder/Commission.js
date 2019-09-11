import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {withFormik} from "formik";
import {connect} from "react-redux";
import {getListAccountByConditions, getListContactByConditions} from "Actions";
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
            collaborators_id:null
        }
    }

    _isChanged = (status) => {
        this.setState({
            checkChange: status
        })
    };

    _updateParentValue = (isChange) =>{
        if(isChange === undefined){
            isChange =  false
        }
        this.setState({
            loadCom:!this.state.loadCom
        },()=>{
            let data_buf = Object.assign({},this.props.values);
            data_buf =  Object.assign(data_buf,this.state);
            data_buf = Object.assign(data_buf,this.props.values);
            data_buf.seller_id = currentAccount.id;
            data_buf.buyer_id = data_buf.buyer_profit.id;
            data_buf.isChange = isChange;

            if(data_buf.is_solo){
                data_buf.buyer_id = '';
                data_buf.buyer_profit='';
            }
            delete data_buf.loadCom;
            delete data_buf.seller_agencies;
            delete data_buf.buyer_agencies;
            delete data_buf.list_agencies;
            delete data_buf.seller_par;
            delete data_buf.buyer_par;
            delete data_buf.list_staff_contact;

            data_buf.is_solo = data_buf.is_solo?1:0;
            this.props.updateParentValue(data_buf)
        })
    };

    _loadCom=()=>{
        this.setState({
            loadCom: !this.state.loadCom
        })
    };

    componentWillMount= async ()=>{
        buf_len = 0;
        const {agencies,propertyDetail} = this.props;
        let {reorder} = propertyDetail;
        if(reorder){
            let {buyer_profit} = reorder;
            buyer_profit = JSON.parse(buyer_profit) || null;
            if(buyer_profit && buyer_profit.id){
                let staff = await this.props.getListAccountByConditions({reason_social:buyer_profit.id},null,GET_ACCOUNTS_BY_CONDITIONS);
                this.setState({
                    list_staff_contact: staff,
                    buyer_profit:buyer_profit
                })
            }
        }
        if(agencies && agencies.length < 1) {
            this.props.getListAccountByConditions({type: "agency"},null, GET_AGENCYS).then(res=>{
                res = res.map(item=>{
                    item.label = item.reason_social;
                    return item;
                });
                this.setState({
                    list_agencies: res,
                    is_solo:(reorder && reorder.id && reorder.is_solo === 1) || false
                },()=>{
                    this._updateParentValue();
                });
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
            },()=>{
                this._updateParentValue();
            });
        }
    };

    handleChangeCheckBox = () =>{
        this.setState({
            is_solo:!this.state.is_solo
        },()=>{
            this._updateParentValue(true)
        })

    };


    handleSellerChange = (event)=>{
        this._isChanged(true);
        const {amount,percent} =  event;
        if(event.isChange === undefined){
            event.isChange = false
        }
        this.setState({
            seller_profit:{
                id:currentAccount.id,
                amount:amount,
                percent:percent,
            }
        },()=>{
            this._updateParentValue(event.isChange);
        })

    };


    handleBuyerChange = async (value)=>{
        this._isChanged(true);
        this.props.values.collaborators_id =  value;
        let list_staff_contact = [];
        if(value){
            const staffs = await this.props.getListAccountByConditions({reason_social:value},null,GET_ACCOUNTS_BY_CONDITIONS);
            if(staffs && staffs.length){
                list_staff_contact = list_staff_contact.concat(staffs)
            }
            this.setState({
                list_staff_contact:list_staff_contact,
                collaborators_id:value
            },()=>{
                this._updateParentValue(true);
            })
        }else{
            this.setState({
                list_staff_contact:list_staff_contact,
            },()=>{
                this._updateParentValue(true);
            })
        }
    };

    handleBuyerStaffChange = (event) =>{

            this._isChanged(true);
            const {select_item,amount,percent} =  event;
            if(event.isChange === undefined){
                event.isChange = false
            }
            this.setState({
                buyer_profit:{
                    id:select_item.value,
                    amount:amount,
                    percent:percent,
                }
            },()=>{
                this._updateParentValue(event.isChange);
            })
    };



    render() {
        const {seller_par,buyer_par,collaborators_id,confirm_collaberate} = this.props.values;
        const {is_solo,
            list_agencies,
            buyer_profit,
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
                                        <div className="col-sm-7">
                                            <div>
                                                <FormControlLabel
                                                    label={<IntlMessages
                                                        id="property.reorder.commission.solo.title"/>}
                                                    control={
                                                        <Checkbox checked={is_solo}
                                                                  onChange={this.handleChangeCheckBox}
                                                                  name="is_solo"/>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body ">
                                    <CommissionItem
                                        key={position}
                                        position={position}
                                        select_disable={true}
                                        select_text={<IntlMessages id="property.reorder.commission.advisor"/>}
                                        select_value={currentAccount.firstname+currentAccount.lastname}
                                        value={seller_par}
                                        number_pay={this.props.commission_property_price}
                                        name="seller_par"
                                        onChange={this.handleSellerChange}
                                        updateParentValue={this._updateParentValue}
                                        listOption={list_agencies}
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
                                                            <IntlMessages id="property.reorder.commission.advisor"/>
                                                        </label>
                                                        <div>
                                                            <SelectAutoComplete
                                                                name='collaborators_id'
                                                                value={collaborators_id}
                                                                onChange={this.handleBuyerChange}
                                                                listOption={list_agencies}
                                                                isClearable={true}
                                                                confirm_collaberate={confirm_collaberate}
                                                                isDisabled={confirm_collaberate===types_confirm_collaberate.confirm_by_buyer?true:false}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <CommissionItem
                                                key={position}
                                                position={position}
                                                value={buyer_par}
                                                name="buyer_par"
                                                select_text={<IntlMessages id="property.reorder.commission.advisor.staff"/>}
                                                number_pay={this.props.commission_property_price}
                                                onChange={this.handleBuyerStaffChange}
                                                updateParentValue={this._updateParentValue}
                                                listOption={list_staff_contact }
                                                confirm_collaberate={confirm_collaberate}
                                                isDisabled={confirm_collaberate === types_confirm_collaberate.confirm_by_buyer?true:false}
                                            />
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
        list_staff_contact :state.accounts.accounts_byConditions
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        getListAccountByConditions:(conditions,pagination_cond,typeReducer)=>{
            return dispatch(getListAccountByConditions(conditions,pagination_cond,typeReducer))
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