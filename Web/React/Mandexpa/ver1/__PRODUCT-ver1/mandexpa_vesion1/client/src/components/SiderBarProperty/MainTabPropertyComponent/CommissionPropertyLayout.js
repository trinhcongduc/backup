/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withFormik} from "formik";
import {updateFieldsPropertyMainTab} from "Actions";
import IntlMessages from "Util/IntlMessages";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import * as Yup from "yup";
import {numberWithCommas, renderSelectIndex} from "Helpers"
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";


class CommissionPropertyLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkChange: false,
            loadCom:true,
            disableSelect:false,
            min_total_commission_inclusive:0,
        }
    }


    componentWillMount(){
        let {propertyDetail} = this.props;
        if(propertyDetail && propertyDetail.property && propertyDetail.property.id){
            this.setState({
                disableSelect : propertyDetail.property.auto_commission === 1
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.property_price !== this.props.property_price){
            // this.props.values.total_commission_inclusive = nextProps.property_price * 2 /100 ;
            this.setState({
                min_total_commission_inclusive: nextProps.property_price * 0.02
            })
        }
    }


    handleChange = (event) => {
        event.target.value = event.target.value.split(' ').join('');
        this._isChanged(true);
        this.props.handleChange(event);
    };

    _isChanged = (status) => {
        this.setState({
            checkChange: status
        })
    };

    _loadCom = () =>{
        this.setState({
            loadCom:!this.state.loadCom
        })
    };


    handleChangeCommissionSeller = (value) =>{
        this._isChanged(true);
        this.props.values.commission_seller = value;
        this.props.values.commission_buyer = 100- value;
        this.setState({
            loadCom:!this.state.loadCom
        })

    };

    handleChangeCommissionBuyer = (value) =>{
        this._isChanged(true);
        this.props.values.commission_buyer = value;
        this.props.values.commission_seller = 100- value;
        this.setState({
            loadCom:!this.state.loadCom
        })

    };


    handleChangeAutoCommission = (event) => {
        this._isChanged(true);
        this.props.handleChange(event);
        this.setState({
            loadCom:!this.state.loadCom
        },()=>{
            let {auto_commission} = this.props.values;
            if(auto_commission){
                this.props.values.commission_seller = 70;
                this.props.values.commission_buyer = 30;
                this.setState({
                    loadCom:!this.state.loadCom,
                    disableSelect:true
                })
            }else{
                this.setState({
                    loadCom:!this.state.loadCom,
                    disableSelect:false
                })
            }
        })
    };

    _saveToRedux = () => {
        let {checkChange} = this.state;
        let {propertyFields} = this.props;
        let {preTab} = propertyFields;
        if (checkChange && (preTab === 1 || preTab === "1")) {
            let data = this.props.values;
            this.props.updateFieldsPropertyMainTab(data);
            this._isChanged(false);
        }
    };

    render() {
        this._saveToRedux();
        const {
            commission_seller,
            commission_buyer,
            auto_commission,
            total_commission_inclusive,

        } = this.props.values; // get prop of Formik return
        const {disableSelect,min_total_commission_inclusive} = this.state;
        return (
            <div className="card">
                <div className="card-header">
                <IntlMessages id="property.main.commission"/>
                </div>
                <div className="card-body">
                    <div className="row form-group">
                        <div className="col-sm-4 col-md-4 col-lg-4 obligateField">
                        <span className="obligate">*</span>
                            <IntlMessages id="property.main.total_commission_inclusive"/>
                        </div>
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <div>
                                <input type="text"
                                       min = {min_total_commission_inclusive}
                                       name="total_commission_inclusive"
                                       value={numberWithCommas(total_commission_inclusive)}
                                       className="form-control" onChange={this.handleChange}/>
                                {(parseFloat(total_commission_inclusive) < parseFloat(this.state.min_total_commission_inclusive) )&&
                                <FormHelperText error={true}><IntlMessages id="notification.property.value_price_inValid"/> </FormHelperText>}
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-7">
                            <label htmlFor="inputPassword" className=" col-form-label  question-tooltip">
                                <IntlMessages id="property.main.type_mandat"/>
                            </label>
                            <small><IntlMessages id="property.main.type_mandat.description"/> </small>
                        </div>
                        <div className="col-sm-1">
                            <i className="zmdi zmdi-help zmdi-hc-2x" title="Recommandations Mandexpa :
                                1er mois : vendeur 70% - acheteur 30%
                                2ème mois : vendeur 60% - acheteur 40%
                                3ème mois : vendeur 50% - acheteur 50%"> </i>
                        </div>

                        <div className="col-sm-2">
                            <Checkbox checked={auto_commission}
                                      onChange={this.handleChangeAutoCommission}
                                      name="auto_commission"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="property.reorder.commission.commission_seller.title"/>
                        </label>
                        <div className="col-sm-7">
                            <div >
                                <SelectAutoComplete name='commission_seller'
                                                    value={commission_seller}
                                                    label_props='label'
                                                    value_props='value'
                                                    isDisabled = {disableSelect}
                                                    onChange={this.handleChangeCommissionSeller}
                                                    listOption={renderSelectIndex(30,70,'array')}
                                />
                            </div>
                        </div>
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2  pdLeft0">
                            <div className="displayFlex">
                                <span className="percent">%</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="property.reorder.commission.commission_buyer.title"/>
                        </label>
                        <div className="col-sm-7">
                            <div >
                                <SelectAutoComplete name='commission_buyer'
                                                    value={commission_buyer}
                                                    isDisabled = {disableSelect}
                                                    label_props='label'
                                                    value_props='value'
                                                    onChange={this.handleChangeCommissionBuyer}
                                                    listOption={renderSelectIndex(30,70,'array')}
                                />

                            </div>
                        </div>
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 pdLeft0 ">
                            <div className="displayFlex">
                                <span className="percent">%</span>
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
        updateFieldsPropertyMainTab: (fields) => {
            dispatch(updateFieldsPropertyMainTab(fields))
        }
    }
};

const FormikForm = withFormik({

    mapPropsToValues(datas) { // Init form field
        if(typeof datas.propertyDetail != "undefined" ){
            let {propertyDetail} = datas;

            return {
                commission_seller: propertyDetail.property.commission_seller || '',
                commission_buyer: propertyDetail.property.commission_buyer || '',
                auto_commission: propertyDetail.property.auto_commission === 1,
                total_commission_inclusive: propertyDetail.property.total_commission_inclusive || 0,
            }
        }
        return {
            commission_seller: '',
            commission_buyer: '',
            auto_commission: false,
            total_commission_inclusive: 0,
        }
    },
    enableReinitialize: true,
    validationSchema:Yup.object().shape({
        total_commission_inclusive:Yup.number()
            .required((<IntlMessages id='notification.required' />)),
        commission_seller:Yup.string().required((<IntlMessages id='notification.required' />)),
        commission_buyer:Yup.string().required((<IntlMessages id='notification.required' />)),
    })


})(CommissionPropertyLayout);

export default connect(mapStatetoProps, mapDispatchToProp)(FormikForm);
