/**
 * Component  upgrade package for a subscriber
 */



import React, {Component} from 'react';
import IntlMessages from "Util/IntlMessages";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {getListAccountByConditions,getStatisticAPI,CancellationRequestDashBoard} from "Actions";
import {getAccountCurrent} from "Helpers";
import {GET_ACCOUNTS_BY_CONDITIONS} from "Actions/types";



const styles = () =>({
    statistic_icon:{
        fontSize:'3em'
    },
    statistic_content:{
        textTransform:'uppercase'
    },
    mg_auto_10:{
        margin:'auto 10px'
    },
    pd_none:{
        padding:'0px',
    },
    number_statistic_size:{
        fontSize:'28px'
    }
});


class StatisticComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            statistic:{}
        }
    }


    componentDidMount(){
        // const currentAccount = getAccountCurrent();
        // this.props.getListAccountByConditions({created_by:currentAccount.id},null,GET_ACCOUNTS_BY_CONDITIONS).then(res=>{
        //     console.log("res",res);
        // });
        this.props.getStatisticAPI().then(res=>{
            this.setState({statistic:res.data});
        })
    }
    componentWillUnmount(){
        this.props.CancellationRequestDashBoard()
    }

    showStatistic(value){
        value = parseInt(value);
        return value > 9 ? value: "0"+value
    }


    render() {
        const {classes,accounts} = this.props;
        const {statistic} = this.state;
        let number_userProperty = this.showStatistic(statistic.property !== undefined ? statistic.property.counter : 0);
        let number_soldProperty = this.showStatistic(statistic.sold_property !== undefined ? statistic.sold_property.counter : 0);
        let number_propertyMatch =this.showStatistic( statistic.property_match !== undefined ? statistic.property_match.counter : 0);
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className={classNames("card-body d-flex bd-highlight",classes.pd_none)}>
                            <div className={classNames("p-2 bd-highlight",classes.statistic_icon)}>
                                <FontAwesomeIcon icon={['far','file-medical-alt']}/>
                            </div>
                            <div className={classNames("p-2 bd-highlight",classes.mg_auto_10,classes.statistic_content)}>
                                <strong className={classes.number_statistic_size}>
                                    { number_userProperty }
                                </strong><br/>
                                <IntlMessages id="dashboard.statistic.number_agent"/>
                            </div>
                            <div className={classNames("ml-auto p-2 bd-highlight",classes.mg_auto_10)}>
                                <FontAwesomeIcon icon={['fas','chevron-right']}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className={classNames("card-body d-flex bd-highlight",classes.pd_none)}>
                            <div className={classNames("p-2 bd-highlight",classes.statistic_icon)}>
                                <FontAwesomeIcon icon={['far','handshake']}/>
                            </div>
                            <div className={classNames("p-2 bd-highlight",classes.mg_auto_10,classes.statistic_content)}>
                                <strong className={classes.number_statistic_size}>{number_soldProperty}</strong><br/>
                                <IntlMessages id="dashboard.statistic.sale_and_collaboration"/>
                            </div>
                            <div className={classNames("ml-auto p-2 bd-highlight",classes.mg_auto_10)}>
                                <FontAwesomeIcon icon={['fas','chevron-right']}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className={classNames("card-body d-flex bd-highlight",classes.pd_none)}>
                            <div className={classNames("p-2 bd-highlight",classes.statistic_icon)}>
                                <FontAwesomeIcon icon={['far','house-flood']}/>
                            </div>
                            <div className={classNames("p-2 bd-highlight",classes.mg_auto_10,classes.statistic_content)}>
                                <strong className={classes.number_statistic_size}>{number_propertyMatch}</strong><br/>
                                <IntlMessages id="dashboard.statistic.property_match"/>
                            </div>
                            <div className={classNames("ml-auto p-2 bd-highlight",classes.mg_auto_10)}>
                                <FontAwesomeIcon icon={['fas','chevron-right']}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        accounts:state.accounts,
    };
};

const mapDispatchtoProps = (dispatch,props)=>{
    return{
        getListAccountByConditions:(conditions,pagination,typeReducer)=>{
            return dispatch(getListAccountByConditions(conditions,pagination,typeReducer))
        },
        getStatisticAPI:()=>{
            return dispatch(getStatisticAPI())
        },
        CancellationRequestDashBoard:()=>{
            dispatch(CancellationRequestDashBoard())
        }
    }
};

export default connect(mapStateToProps,mapDispatchtoProps)(withRouter(withStyles(styles)(StatisticComponent)));