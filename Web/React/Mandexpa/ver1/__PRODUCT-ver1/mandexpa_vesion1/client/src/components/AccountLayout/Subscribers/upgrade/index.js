/**
 * Component  upgrade package for a subscriber
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
    createSubscriberAPI,
    upgradeSubscriberAPI,
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

const currentDay  = datebyFormat('now',AppConfig.dateFormatSave);

const CREATE = 'create';
const EDIT = 'edit';
const UPDATE = 'update';

class UpgradeSubscribers extends Component{
    constructor(props){
        super(props);
        this.state = {
            state:true,
            subscriptions:[],
            data:{
                start_date: new Date(),
                end_date: new Date(),
                user:[]
            }
        }
    }

    fillData = (subscribers) =>{
        if(subscribers !== undefined && subscribers.detail !== undefined){
            let current = new Date(currentDay).getTime();
            let end_date = new Date(subscribers.detail.end_date).getTime();
            let date  = subscribers.detail.final_date ||  subscribers.detail.end_date ;
            if(end_date < current){
                date = currentDay
            }
            this.setState({
                data:{...this.state.data,
                    // id:subscribers.detail.id,
                    sub_id: null,
                    start_date:new Date(date) || null,
                    end_date:new Date(date) || null,
                    main_price:subscribers.detail.main_price || null,
                    second_price:subscribers.detail.second_price || null,

                }
            })
        }
    };

    componentDidMount(){
        let {subscribers} =  this.props;
        if(subscribers !== undefined && subscribers.detail !== undefined){
            this.fillData(subscribers);
            this.props.getListAccountByConditions({id:subscribers.detail.user_id},{},null).then(data=>{
                this.setState({
                    data:{...this.state.data,user:data}
                })
            })
        }
        this.props.ListAllSubscription().then(res=>{
            this.setState({
                subscriptions:res.data
            })
        })
    }

    componentWillReceiveProps(nextProps,nextState){
        let {subscribers} =  nextProps;
        this.fillData(subscribers);
        // if(subscribers !== undefined && subscribers.detail !== undefined){
        //     this.setState({
        //         data:{...this.state.data,
        //             sub_id:subscribers.detail.sub_id || null,
        //             start_date:new Date(subscribers.detail.end_date) || null,
        //             end_date:new Date(subscribers.detail.end_date) || null, }
        //     })
        // }
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
    handleUpgrade = () =>{
        let data =  {...this.state.data};
        data.start_date = datebyFormat(data.start_date,AppConfig.dateFormatSave);
        data.end_date = datebyFormat(data.end_date,AppConfig.dateFormatSave);
        data.user_id =  data.user[0].id;

        delete data.user;

        console.log("data",data);
        this.props.upgradeSubscriberAPI(data).then(res=>{
            this.props.onClose(false);
        });
    };


    render() {
        // const {subscribers} =  this.props;
        const {subscriptions,data} = this.state;
        const {start_date,end_date,sub_id,user} = data;
        let subscription_list = subscriptions !== undefined? subscriptions :[];
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
                                    minDate={start_date}
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
                                    checkboxRow={false}
                                    placeholderText="Click to select a date"
                                    dateFormat={AppConfig.date_format}
                                    onChange={this.handleChangeendDate}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <TableListBase
                                title={<IntlMessages id="subscribers.select_user"/>}
                                prefix_lang="subscriber.user"
                                selectAll={false}
                                checkboxRow={false}
                                numberSelected={1}
                                listObject={user || []}
                                data_count={1}
                                listCol={['id','fullname','mobile','email','city','bank_name']}
                                handleSelectRow={()=>{}}
                                parentActionUpdateList={()=>{}}
                            />
                        </div>


                        <div className="row">
                            <div className="offset-md-9 col-md-3">
                                <Button className="btn btn-primary" type="submit" onClick={this.handleUpgrade} >
                                    <IntlMessages id="upgrade"/>
                                </Button>


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
        ListAllSubscription:(cond,type)=>{
            return dispatch(ListAllSubscription(cond,type))
        },
        createSubscriberAPI:(data)=>{
            return dispatch(createSubscriberAPI(data))
        },
        getListAccountByConditions:(condition,pagination,type)=>{
            return dispatch(getListAccountByConditions(condition,pagination,type))
        },
        upgradeSubscriberAPI:(data)=>{
            return dispatch(upgradeSubscriberAPI(data))
        },

    }
};

const FormikForm = withFormik({
    mapPropsToValues(props){
        let {action,subscribers} = props;
        console.log("subscribers",subscribers);
        if(action === UPDATE){
            return{
                sub_id:subscribers.detail.sub_id || null,
                start_date:new Date(subscribers.detail.end_date) || null,
                end_date:new Date(subscribers.detail.end_date) || null,
            }
        }
        return{
            sub_id:null,
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
})(UpgradeSubscribers);

export default connect(mapStateToProps,mapDispatchtoProps)(withRouter(FormikForm));