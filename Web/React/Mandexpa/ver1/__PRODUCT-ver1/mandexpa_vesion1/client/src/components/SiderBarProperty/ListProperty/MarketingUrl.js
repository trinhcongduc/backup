/**
 * Component  upgrade package for a subscriber
 */



import React, {Component} from 'react';
import IntlMessages from "Util/IntlMessages";
import * as Yup from "yup";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import {withFormik} from "formik";
import classNames from "classnames";
import {
    updateMarketingUrl
} from "Actions";

import {} from "Actions/types";

const styles = () =>({
    button_content:{
        textTransform:'none !importance'
    }
});


class MarketingUrl extends Component{
    componentDidMount(){

    }

    componentWillReceiveProps(nextProps,nextState){

    }


    handlerSave = () =>{
        const {id,type} = this.props;
        let data = {id:id};
        data[type] =  this.props.values.url;
        this.props.updateMarketingUrl(data).then(res=>{
            this.props.onClose();
        })
    };


    render() {
        const {url} = this.props.values;
        const {name} = this.props;
        return (
            <div className="input-group mb-3">
                <input type="text"
                       className="form-control"
                       value={url}
                       name="url"
                       onChange={this.props.handleChange}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={this.handlerSave}>
                        <IntlMessages id={"property.marketing.save."+name}/>
                    </button>
                </div>
            </div>
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
        updateMarketingUrl:(data)=>{
            return dispatch(updateMarketingUrl(data))
        }
    }
};

const FormikForm = withFormik({
    mapPropsToValues(props){
        return{
            url:""
        }
    },
    validationSchema: Yup.object().shape({  // Validate form field
    }),
    enableReinitialize: true,
    handleSubmit(values, { props, setSubmitting, resetForm }) {

    },
})(MarketingUrl);

export default connect(mapStateToProps,mapDispatchtoProps)(withRouter(withStyles(styles)(FormikForm)));