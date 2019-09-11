/**
 * App.js Layout Start Here
 */

'use strict'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import {withFormik} from "formik";
import {getAllCountry, getContactDetail} from "Actions";
import EditContact from '../CreateContact/InforContact'
import {isEmpty} from "Helpers/helpers";



class EditUserLayout extends Component {

    constructor(props) {
        super(props);
        const {location} = this.props;
        this.state = {
            id:location.state
        }
    }
    componentWillMount() {
        let path = window.location.href.split("/");
        // console.log(path);
        var id = path[path.length-1];
        this.props.getContactDetail(id).then((res) =>{
                if(isEmpty(res)){
                        this.props.history.push('/app/dashboard/not-found');
                }
            }
        );
        this.props.getAllCountry();
    }
    render(){
        const {contactdetail,countries} = this.props;
        const check = isEmpty(contactdetail);

        return(
            <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="row">
                    <div className="col-xs-10 col-md-10 col-sm-10 col-lg-10">
                        {(!check && countries.length)?<EditContact contactdetail={contactdetail} countries={countries}/>:null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProp = (state)=>{
    return ({
       contactdetail : state.contact.contactdetail,
        countries:  state.country,

    });
};

const mapDispatchToProps = (dispatch,props)=>{
    return {
        getContactDetail:(id)=>{
            return dispatch(getContactDetail(id));
        },
        getAllCountry:()=>{
            return dispatch(getAllCountry());
        }

    }
};



const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {}
    }
})(EditUserLayout);



export default connect(mapStateToProp,mapDispatchToProps)(withRouter(FormikForm));
