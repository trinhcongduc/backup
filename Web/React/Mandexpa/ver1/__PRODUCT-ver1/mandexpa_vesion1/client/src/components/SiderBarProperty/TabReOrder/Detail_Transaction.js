/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withFormik} from "formik";
import IntlMessages from "Util/IntlMessages";
import {updateFieldsPropertyReorderTab} from "Actions";
import DatePicker from "react-datepicker/es";
import AppConfig from "Constants/AppConfig";
import {datebyFormat,numberWithCommas} from "Helpers";
import {configDateFormat} from "Constants/DateConfig"


class Detail_Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date_sale: new Date(),
            date_entrance: new Date(),
            price:0,
            confirmed:false,
            loadCom:true
        }
    }

    _isChanged = (status) => {
        this.setState({
            checkChange: status
        })
    };

    componentWillMount(){
        let {propertyDetail} = this.props;
        if(propertyDetail && propertyDetail.reorder && propertyDetail.reorder.id){
            let {reorder} = propertyDetail;
            this.setState({
                date_sale: new Date(reorder.date_sale),
                date_entrance: new Date(reorder.date_entrance),
                price:reorder.price
            })
        }else{
            let {property} = propertyDetail;
            this.setState({
                price: property.number_pay
            })
        }
    }

    componentWillReceiveProps(nextProps){
        let {propertyDetail} =  nextProps;
        if(propertyDetail && propertyDetail.reorder && propertyDetail.reorder.id){
            let {reorder} = propertyDetail;
            this.setState({
                confirmed:reorder.confirmed === 1
            })
        }
    }
    shouldComponentUpdate(nextProps,nextState){

        if(this.props.values.price !== nextProps.values.price || this.state.confirmed !== nextState.confirmed ||
            this.state.date_entrance !== nextState.date_entrance || this.state.date_sale !== nextState.date_sale
        ){
            return true;
        }

        return false;
    }


    _updateParentValue = (isChange) =>{
        let data_buf = Object.assign({},this.props.values);
        data_buf.confirmed = this.state.confirmed?1:0;
        delete data_buf.price_property;
        delete data_buf.type_trans;
        if(isChange === undefined){
            isChange =  false
        }
        try{
            data_buf.price = this.state.price;
            data_buf.isChange = isChange;
            data_buf.date_sale = datebyFormat(this.state.date_sale,configDateFormat.dateSaveDB);
            data_buf.date_entrance = datebyFormat(this.state.date_entrance,configDateFormat.dateSaveDB);
        }catch (e) {
            console.log("Error formatdate tab reorder",e);
        }
        this.props.updateParentValue(data_buf,isChange)
    };

    handleChange = (event) => {
        event.target.value = event.target.value.split(' ').join('');
        this.props.handleChange(event);
        this.setState({
            loadCom :!this.state.loadCom,
            price:event.target.value
        },()=>{
            this._updateParentValue(true)
        })
    };

    handleChangeDateSale = (date) => {
        this.props.values.date_sale = this.state.date_sale;
        this.setState({
            date_sale: date
        }, () => {
            this._updateParentValue(true);
        })
    };

    handleChangeDateEntrance = (date) => {
        this.props.values.date_entrance = this.state.date_entrance;
        this.setState({
            date_entrance: date
        }, () => {
            this._updateParentValue(true);
        })
    };

    handleConfirmDateSale = () =>{
        this.setState({
            confirmed:!this.state.confirmed
        },()=>{
            this._updateParentValue(true)
        })
    };

    render() {
        const {confirmed,date_sale,date_entrance,price } = this.state;
        const {price_property,type_trans} = this.props.values;
        this._updateParentValue();
        return (
            <div className="card">
                <div className="card-header">
                    <IntlMessages id="property.reorder.detail_transaction"/>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6 ">
                            <div className="card">
                                <div className="card-header">
                                    <IntlMessages id="property.reorder.detail_transaction.price"/>
                                </div>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label  className="col-sm-4 col-form-label">
                                            <IntlMessages id="property.reorder.detail_transaction.price_property"/>
                                        </label>
                                        <div className="col-sm-5">
                                            <input
                                                type="text"
                                                readOnly
                                                name="price_property"
                                                value={numberWithCommas(price_property)}
                                                onChange={this.props.handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">
                                            <IntlMessages id="property.reorder.detail_transaction.selling_price"/>
                                        </label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="price"
                                                    value={numberWithCommas(price)}
                                                    onChange={this.handleChange}
                                                    />
                                                <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <IntlMessages id="euro.symbol"/>
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 ">
                            <div className="card">
                                <div className="card-header">
                                    <IntlMessages id="property.reorder.detail_transaction.transaction"/>
                                </div>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label  className="col-sm-4 col-form-label">
                                            <IntlMessages id="property.reorder.detail_transaction.type_transaction"/>

                                        </label>
                                        <div className="col-sm-5">
                                            <strong><IntlMessages id={"property.popup.purpose."+type_trans}/></strong>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label  className="col-sm-4 col-form-label">
                                            <IntlMessages id="property.reorder.detail_transaction.date_lift_condition"/>
                                        </label>
                                        <div className="col-sm-4">

                                            <DatePicker
                                                selected={ date_sale }
                                                className="form-control"
                                                name="date_sale"
                                                placeholderText="Click to select a date"
                                                dateFormat={AppConfig.date_format}
                                                onChange={this.handleChangeDateSale}
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <button className="btn btn-primary" onClick={this.handleConfirmDateSale}>
                                                {
                                                    confirmed ?(
                                                        <IntlMessages id="property.reorder.detail_transaction.date_lift_condition.confirm"/>
                                                    ):(
                                                        <IntlMessages id="property.reorder.detail_transaction.date_lift_condition.unconfirm"/>
                                                    )
                                                }
                                            </button>
                                        </div>
                                        {
                                            confirmed &&
                                            (
                                                <div className="col-sm-1 ">
                                                    <i className="zmdi zmdi-check-circle zmdi-hc-2x mdc-text-green"> </i>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="form-group row">
                                        <label  className="col-sm-4 col-form-label">
                                            <IntlMessages id="property.reorder.detail_transaction.date_expect_notarial"/>
                                        </label>
                                        <div className="col-sm-5">
                                            <DatePicker
                                                selected={date_entrance}
                                                className="form-control"
                                                name="date_entrance"
                                                placeholderText="Click to select a date"
                                                dateFormat={AppConfig.date_format}
                                                onChange={this.handleChangeDateEntrance}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStatetoProps = (state) => {
    return ({
        configdata: state.configdata,
        propertyFields: state.propertyFields

    })
};

const mapDispatchToProp = (dispatch, props) => {
    return {
        updateFieldsPropertyReorderTab: (fields) => {
            dispatch(updateFieldsPropertyReorderTab(fields))
        }
    }
};

const FormikForm = withFormik({
    mapPropsToValues(datas) { // Init form field
        let {propertyDetail} =datas;
        let return_res = {
            price:0,
            price_property:0,
            type_trans:"",
            date_sale: new Date(),
            date_entrance : new Date(),
        };
        if(propertyDetail && propertyDetail.property && propertyDetail.property.id){
            var property_values = propertyDetail.property;

            return_res.price_property = property_values.number_pay || '';
            return_res.type_trans = property_values.type || '';
            return_res.price = property_values.number_pay;
        }
        if(propertyDetail && propertyDetail.reorder && propertyDetail.reorder.id){
            let {reorder} = propertyDetail;
            return_res.date_sale = new Date(reorder.date_sale);
            return_res.date_entrance = new Date(reorder.date_entrance);
            return_res.price = reorder.price || 0;
        }

        return return_res;
    },
    enableReinitialize: true,
})(Detail_Transaction);

export default connect(mapStatetoProps, mapDispatchToProp)(FormikForm);
