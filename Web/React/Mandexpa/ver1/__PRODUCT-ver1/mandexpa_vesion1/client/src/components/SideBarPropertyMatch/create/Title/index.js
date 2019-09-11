/**
 * Siderbar
 */

'use strict'
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {withFormik} from "formik";
import  * as Yup from "yup";
import IntlMessages from "Util/IntlMessages";


class TitlePropertyMatches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check_values: true
        }
    }
    handleChange = (event) =>{
        this.props.handleChange(event);
        setTimeout(()=>{
            this.props.parent_get_data(this.props.values);
        },500)
    };


    render() {
        var {check_values} = this.state;
        var {title, price_max} = this.props.values;

        return (
            <div className="card">
                <div className="card-header obligateField"><span className="obligate">*</span>
                    <IntlMessages id="property.property_match.title"/>
                </div>
                <div className="card-body">
                    <div className="row">
                        <input className="form-control" type="text" name="title" value={title} onChange={this.handleChange}/>
                    </div>
                    {!check_values &&<small className="text-danger font-weight-bold"><IntlMessages id="notify.error.min_max_validate"/></small>}

                </div>
            </div>

        )

    }
}

const mapStateToProp = (state) => {
    return ({
        propertyMatchesDetail: state.property_matches.property_matches_edit
    })
};

const mapDispatchToProps = (dispatch, props) => {
    return {}
};


const FormikForm = withFormik({
    mapPropsToValues(datas) { // Init form field
        const {propertyMatchesDetail} = datas;
        if(propertyMatchesDetail && propertyMatchesDetail.id){
            return {
                title: propertyMatchesDetail.title||'',
            }
        }
        return {
            title: '',
        }
    },
    enableReinitialize: true,
    validationSchema : Yup.object().shape({
        title:Yup.string().required(((<IntlMessages id='notification.required' />))),
    })
})(TitlePropertyMatches);


export default connect(mapStateToProp, mapDispatchToProps)(withRouter(FormikForm));
