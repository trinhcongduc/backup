/**
 * Component  upgrade package for a subscriber
 */

import React, {Component} from 'react';
import IntlMessages from "Util/IntlMessages";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker,{registerLocale} from 'react-datepicker';
import enGB from "date-fns/locale/en-GB";


import * as Yup from "yup";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withFormik} from "formik";

// Custom component
import TableListBase from "Components/ComponentHelper/ComponentBase(building...)/TableListBase";


import {
    subscriberHistoryAPI
} from "Actions";


import {} from "Actions/types";
import {TableColType} from "Constants/ComponentConfigs";
import AppConfig from "Constants/AppConfig";



import moment from "moment";
import {configDateFormat} from "Constants/DateConfig";
import {datebyFormat} from "Helpers";

registerLocale('en', enGB);




class SubscriberHistory extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:{},
            data:[]
        }
    }


    componentDidMount(){
        let {user_id} =  this.props;
        this.props.subscriberHistoryAPI(user_id).then(res=>{
            this.setState({
                user:res.data.user,
                data:res.data.data
            })
        });
    }

    componentWillReceiveProps(nextProps,nextState){

    }


    render() {
        const {data,user} = this.state;
        const registrant_name =  user.fullname || "";
        return (
            <div>
                <TableListBase
                    checkboxRow={false}
                    prefix_lang="subscriber_history"
                    listCol={['title',
                        {key:'main_price',type:TableColType.currency},
                        {key:'second_price',type:TableColType.currency},
                        {key:'start_date',type:TableColType.date,format:AppConfig.dateFormatDisplay},
                        {key:'end_date',type:TableColType.date,format:AppConfig.dateFormatDisplay}
                    ]}
                    listObject={data}
                    title={"Registrant's name : " + registrant_name}
                    data_count={data.length}
                    selectAll={false}
                    handleSelectRow={()=>{}}
                    parentActionUpdateList={()=>{}}

                />
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        subscribers : state.subscribers,
    };
};

const mapDispatchtoProps = (dispatch,props)=>{
    return{
        subscriberHistoryAPI:(id)=>{
            return dispatch(subscriberHistoryAPI(id))
        }
    }
};

const FormikForm = withFormik({
    mapPropsToValues(props){
        return{
        }
    },
    validationSchema: Yup.object().shape({  // Validate form field
    }),
    enableReinitialize: true,
    handleSubmit(values, { props, setSubmitting, resetForm }) {

    },
})(SubscriberHistory);

export default connect(mapStateToProps,mapDispatchtoProps)(withRouter(FormikForm));