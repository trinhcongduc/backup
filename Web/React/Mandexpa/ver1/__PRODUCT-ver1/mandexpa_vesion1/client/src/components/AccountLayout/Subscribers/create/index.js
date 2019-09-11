/**
 * Component  create a subscriptions
 */



import React, {Component} from 'react';
import IntlMessages from "Util/IntlMessages";
import Button from "@material-ui/core/Button/Button";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker,{registerLocale} from 'react-datepicker';
import * as Yup from "yup";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withFormik} from "formik";
import {
    getListAccountByConditions,
    ListAllSubscription,
    createSubscriberAPI
} from "Actions";


import {UPDATE_SUBSCRIBER_USERS} from "Actions/types";

import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import TableListBase  from "Components/ComponentHelper/ComponentBase(building...)/TableListBase";
import AppConfig from "Constants/AppConfig";
import {configDateFormat} from "Constants/DateConfig";
import FR from "date-fns/locale/fr";
import enGB from "date-fns/locale/en-GB";

import moment from "moment";
import {datebyFormat} from "Helpers"
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

registerLocale('en', enGB);

const CREATE = 'create';
const EDIT = 'edit';
const UPDATE = 'update';

class CreateSubscribers extends Component{
    constructor(props){
        super(props);
        this.state = {
            state:true,
            subscriptions:[],
            data:{
                start_date: new Date(),
                end_date: new Date(),
            }
        }
    }


    componentDidMount(){
        let {subscribers} = this.props;
        if(!(subscribers !== undefined  && subscribers.users !== undefined && subscribers.users.length > 0) ){
            this.props.getListAccountByConditions(
                {
                    condition_in:{type:['agency','promoter']},
                    condition_or :{activation:{operator:'<>',value:'ACTIVE'}}
                }
                ,{rowsPerPage:5,page:1},
                UPDATE_SUBSCRIBER_USERS
            )
        }

        this.props.ListAllSubscription().then(res=>{
            this.setState({
                subscriptions:res.data
            })
        })

    }



    validateForm = () => {

    };


    handleChangePackage = (value) =>{
        const {subscriptions,data} = this.state;
        let package_detail = subscriptions.filter(item=>{
            return item.id === value;
        });
        if(Array.isArray(package_detail) && package_detail.length > 0){
            package_detail = package_detail[0];
        }

        let end_date = moment(data.start_date).add(package_detail.exact_number_days,'days');
        this.props.values.sub_id = value;
        this.setState({
            data: {...data,
                sub_id:value,
                end_date: new Date(end_date),
                main_price: package_detail.main_price,
                second_price: package_detail.second_price,
            }

        })
    };

    handleChangeDate = (date) =>{
        const {subscriptions,data} = this.state;
        let package_detail = subscriptions.filter(item=>{
            return item.id === data.package_id;
        });
        if(Array.isArray(package_detail) && package_detail.length > 0){
            package_detail = package_detail[0];
        }
        let end_date = moment(date).add(package_detail.exact_number_days,'days');
        this.setState({
            data:{...data,
                start_date: date,
                end_date: new Date(end_date)}
        }, () => {
            this.props.values.start_date = this.state.start_date;
            this.props.values.end_date = this.state.end_date;
        })
    };

    handleSelectRow = (value) =>{
        let {data} = this.state;
        if(Array.isArray(value) && value.length > 0){
            value = value[0].id;
        }else{
            value = null
        }
        this.setState({
            data:{...data,user_id:value}
        })
    };


    parentActionUpdateList = (pagination) =>{

        if(pagination.orderBy === "fullname"){
            pagination.orderBy = "lastname"
        }
        this.props.getListAccountByConditions({
            condition_in:{type:['agency','promoter']},
                condition_or :{activation:{operator:'<>',value:'ACTIVE'}}
            }
            ,pagination,UPDATE_SUBSCRIBER_USERS)
    };
    handleSave = () =>{
        let data =  {...this.state.data};
        data.start_date = datebyFormat(data.start_date,AppConfig.dateFormatSave);
        data.end_date = datebyFormat(data.end_date,AppConfig.dateFormatSave);
        this.props.createSubscriberAPI(data).then(res=>{
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
        const {} = this.props.values;
        const {action,subscribers,} =  this.props;
        const {subscriptions,data} = this.state;
        const {start_date,end_date,sub_id} = data;
        let subscription_list = subscriptions !== undefined? subscriptions :[]
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group row">
                            <div className="col-sm-6">
                                <label>
                                    <IntlMessages id="subscribers.select_package"/>
                                </label>
                                <SelectAutoComplete
                                    name="sub_id"
                                    value={sub_id}
                                    value_props='id'
                                    label_props='title'
                                    onChange={this.handleChangePackage}
                                    listOption={subscription_list || []}
                                />
                                {this.props.touched.sub_id&&<FormHelperText error={true}>{this.props.errors.sub_id}</FormHelperText>}
                            </div>

                            <div className="col-sm-3">
                                <label>
                                    <IntlMessages id="subscriber.startdate"/>
                                </label>
                                <DatePicker
                                    selected={start_date}
                                    className="form-control"
                                    name="start_date"
                                    locale="en"
                                    placeholderText="Click to select a date"
                                    dateFormat={AppConfig.date_format}
                                    onChange={this.handleChangeDate}
                                />
                            </div>
                            <div className="col-sm-3">
                                <label>
                                    <IntlMessages id="subscriber.enddate"/>
                                </label>
                                <DatePicker
                                    selected={end_date}
                                    className="form-control"
                                    name="end_date"
                                    locale="en"
                                    disabled={true}
                                    placeholderText="Click to select a date"
                                    dateFormat={AppConfig.date_format}
                                    onChange={this.handleChangeendDate}
                                />
                            </div>
                        </div>
                        {
                            action === CREATE && (
                                <div className="form-group row">
                                    <TableListBase
                                        title={<IntlMessages id="subscribers.select_user"/>}
                                        prefix_lang="subscriber.user"
                                        selectAll={false}
                                        numberSelected={1}
                                        listObject={(subscribers.users !== undefined && subscribers.users.data) || []}
                                        data_count={(subscribers.users !== undefined && subscribers.users.count) || 0}
                                        listCol={['id','fullname','mobile','email','city','bank_name']}
                                        handleSelectRow={this.handleSelectRow}
                                        parentActionUpdateList={this.parentActionUpdateList}
                                    />
                                </div>
                            )
                        }

                        <div className="row">
                            <div className="offset-md-9 col-md-3">
                                {
                                    action === CREATE ?
                                        (
                                            <Button className="btn btn-primary" type="submit" onClick={()=>this.handleSave()} >
                                                <IntlMessages id="save"/>
                                            </Button>
                                        ):
                                        (
                                            <Button className="btn btn-primary"  type="submit" onClick={()=>this.handleEdit()}>
                                                <IntlMessages id="edit"/>
                                            </Button>
                                        )
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        subscribers : state.subscribers,
        subscriptions : state.subscriptions,
    };
};

const mapDispatchtoProps = (dispatch,props)=>{
    return{
        getListAccountByConditions:(cond,pagination_cond,type)=>{
            return dispatch(getListAccountByConditions(cond,pagination_cond,type))
        },
        ListAllSubscription:(cond,type)=>{
            return dispatch(ListAllSubscription(cond,type))
        },
        createSubscriberAPI:(data)=>{
            return dispatch(createSubscriberAPI(data))
        },

    }
};

const FormikForm = withFormik({
    mapPropsToValues(props){
        let {action} = props;
        if(action === EDIT){
            return{
            }
        }
        return{
            sub_id:null,
            user_id:null,
            start_date:null,
            end_date:null,
        }
    },
    validationSchema: Yup.object().shape({  // Validate form field
        sub_id:Yup.number()
            .required((<IntlMessages id='notification.required' />)),
        start_date:Yup.number()
            .required((<IntlMessages id='notification.required' />)),
        end_date:Yup.number()
            .required((<IntlMessages id='notification.required' />)),
    }),
    enableReinitialize: true,
    handleSubmit(values, { props, setSubmitting, resetForm }) {

    },
})(CreateSubscribers);

export default connect(mapStateToProps,mapDispatchtoProps)(withRouter(FormikForm));