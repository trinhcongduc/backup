/**
 * Criteria Item
 */

'use strict'
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {withFormik} from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class CriteraItem extends Component {

    actionRemove = ()=>{
        this.props.remove(this.props.id);
    };

    render(){
        var {value} = this.props;
        return(
            <div className="input-group ">
                {/*Favorite Food: <FontAwesomeIcon icon="accessible-icon" />*/}
                <input type="text" className="form-control" disabled={true}
                       value={value} aria-describedby="basic-addon2"/>
                <div className="input-group-append" onClick={this.actionRemove}>
                    <span className="input-group-text" id="basic-addon2">
                        <i className="zmdi zmdi-delete"> </i>
                    </span>
                </div>
            </div>
        )

    }
}

const mapStateToProp = (state)=>{
    return ({})
};

const mapDispatchToProps = (dispatch,props)=>{
    return {
    }
};


const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {}
    }
})(CriteraItem);



export default connect(mapStateToProp,mapDispatchToProps)(withRouter(FormikForm));
