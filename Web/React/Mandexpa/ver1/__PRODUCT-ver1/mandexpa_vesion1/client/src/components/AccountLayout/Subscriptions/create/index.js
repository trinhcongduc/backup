/**
 * Component  create a subscriptions
 */



import React, {Component} from 'react';
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button/Button";
import Switch from 'react-switch';
import * as Yup from "yup";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withFormik} from "formik";
import {CreateSubscription,EditSubscription} from "Actions";


import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import {packages_type} from "Constants/ComponentConfigs/SubscriptionConfig"
import {createListIndex,numberWithCommas} from "Helpers";


const CREATE = 'create';
const EDIT = 'edit';

class CreateSubscriptions extends Component{
    constructor(props){
        super(props);
        this.state = {
            package_type:'day',
            number_package:30,
            state:true,
        }
    }

    handleSwitchButton = (state) => {
        this.props.values.state = state;
        this.setState({ state });
    };

    handleChangePackage = (event) =>{
        let number_package = 30;
        if(event.value === 'month' || event.value === 'year'){
            number_package = 1;
        }
        this.props.values.package_type = event.value;
        this.props.values.number_package = number_package;
        this.setState({
            package_type:event.value,
            number_package:number_package
        })
    };

    handleChangePrice = (event) =>{
        event.target.value = event.target.value.split(' ').join('');
        this.props.handleChange(event)
    };

    handleChangeNumberPackage = (value) =>{
        this.props.values.number_package = value;
        this.setState({
            number_package:value
        })
    };

    handleSave = () =>{
        let data =  this.props.values;
        this.props.CreateSubscription(data).then(res=>{
            this.props.onClose(false);
        });
    };

    handleEdit = (id) =>{
        let data =  this.props.values;
        data.id = id;
        this.props.EditSubscription(data).then(res=>{
            this.props.onClose(false);
        });
    };

    render() {
        const {
            title,
            main_price,
            second_price,
            package_type,
            number_package,
            state,
        } = this.props.values;
        const {action,detail_subs} =  this.props;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="subscriptions.title"/>
                        </label>
                        <div className="col-sm-7">
                            <div>
                                <input type="text"
                                       name="title"
                                       className="form-control"
                                       onChange={this.props.handleChange}
                                       value={title}/>
                            </div>
                        </div>
                        <label className="col-sm-3">
                            <div className="row">
                                <strong className="col-sm-4"><IntlMessages id="subscriptions.public"/></strong>
                                <div className="col-sm-6">
                                    <Switch onChange={this.handleSwitchButton} checked={state} />
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="form-group row">
                            <label className="col-sm-2 col-form-label obligateField">
                                <span className="obligate">*</span>
                                <IntlMessages id="subscriptions.main_price"/>
                            </label>
                            <div className="col-sm-4">
                                <input type="text"
                                       className="form-control"
                                       name="main_price"
                                       onChange={this.handleChangePrice}
                                       value={numberWithCommas(main_price)}/>
                            </div>


                            <label className="col-sm-2 col-form-label obligateField">
                                <span className="obligate">*</span>
                                <IntlMessages id="subscriptions.second_price"/>
                            </label>
                            <div className="col-sm-4">
                                <input type="text"
                                       className="form-control"
                                       name="second_price"
                                       onChange={this.handleChangePrice}
                                       value={numberWithCommas(second_price)}/>
                            </div>

                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="subscriptions.package_type"/>
                        </label>
                        <div className="col-sm-4">
                            <SelectAutoComplete
                                name="package_type"
                                value_props='value'
                                label_props='label'
                                getObject={true}
                                value={package_type}
                                listOption={packages_type}
                                onChange={this.handleChangePackage}
                            />
                        </div>

                        <label className="col-sm-2 col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="subscriptions.number_package_type"/>
                        </label>
                        <div className="col-sm-2">
                            <div>
                                <SelectAutoComplete
                                    name="number_package"
                                    value_props='value'
                                    label_props='label'
                                    value={number_package}
                                    onChange={this.handleChangeNumberPackage}
                                    listOption={createListIndex(0, 31)}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="offset-md-9 col-md-3">
                            {
                                action === CREATE ?
                                    (
                                        <Button className="btn btn-primary" onClick={this.handleSave}>
                                            <IntlMessages id="save"/>
                                        </Button>
                                    ):
                                    (
                                        <Button className="btn btn-primary" onClick={()=>this.handleEdit(detail_subs.id)}>
                                            <IntlMessages id="edit"/>
                                        </Button>
                                    )
                            }


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        detail_subs : state.subscriptions.detail
    };
};

const mapDispatchtoProps = (dispatch,props)=>{
    return{
        CreateSubscription:(data)=>{
            return dispatch(CreateSubscription(data))
        },
        EditSubscription:(data)=>{
            return dispatch(EditSubscription(data))
        },

    }
};

const FormikForm = withFormik({
    mapPropsToValues(props){
        let {action,detail_subs} = props;
        if(action === EDIT){
            return{
                title:detail_subs.title,
                main_price:detail_subs.main_price || 0,
                second_price:detail_subs.second_price || 0,
                package_type:detail_subs.package_type,
                number_package:detail_subs.number_package,
                state:detail_subs.state === 1,
            }
        }
        return{
            title:'',
            main_price:'',
            second_price:'',
            package_type:'day',
            number_package:30,
            state:true,
        }
    },
    validationSchema: Yup.object().shape({  // Validate form field
        title: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        main_price: Yup.number()
            .required((<IntlMessages id='notification.required' />)),
        second_price: Yup.number()
            .required((<IntlMessages id='notification.required' />)),
    })
})(CreateSubscriptions);

export default connect(mapStateToProps,mapDispatchtoProps)(withRouter(FormikForm));