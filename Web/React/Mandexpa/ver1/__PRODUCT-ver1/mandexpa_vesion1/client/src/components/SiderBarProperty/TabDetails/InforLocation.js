import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import IntlMessages from "Util/IntlMessages";
import {withFormik} from "formik";
import * as Yup from "yup";
import {updateFieldsPropertyLocationTab} from "Actions";
import connect from "react-redux/es/connect/connect";

class InforLocation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checkChange:false,
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange = (e) =>{
        this.setState({
            checkChange : true
        });
        this.props.handleChange(e);
    };
    _saveToRedux=()=>{
        var {checkChange} =  this.state;
        var {propertyFields} =  this.props;
        var {preTab} =  propertyFields;
        if(checkChange &&( preTab ===2|| preTab ==="2")){

            this.props.updateFieldsPropertyLocationTab(this.props.values);
            this.setState({
                checkChange : false
            });
            this.props.handleSubmit();
        }
    };
    render(){
        this._saveToRedux();
        return(
            <Tabs>
                <Tab label="English" >
                        <div>
                        <textarea name="english" cols={50} rows={5}
                                  value={this.props.values.english}
                                  onChange={this.onChange}></textarea>
                    </div>
                </Tab>
                <Tab label="Français">
                    <div>
                        <textarea name="french" cols={50} rows={5}
                                  value={this.props.values.french}
                                  onChange={this.onChange}></textarea>
                    </div>
                </Tab>
            </Tabs>
        )
    }
}
const FormikForm = withFormik({

    mapPropsToValues(datas) { // Init form field
        if(typeof datas.propertyDetail != "undefined" ){
            var {propertyDetail} = datas;
            return {
                english: propertyDetail.location[0].english||"",
                french: propertyDetail.location[0].french||"",
            }
        }
        return {
            english:"",
            french:"",

        }
    },
    enableReinitialize: true,
    handleSubmit(values, { props, setSubmitting,resetForm }) {
        // props.updateFieldsPropertyLocationTab(values);
        // console.log(props.propertyFields);
    },

})(InforLocation);
const mapStateToProps = (state) => {
    return ({
        propertyFields: state.propertyFields
    })
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateFieldsPropertyLocationTab:(fields)=>{
            return dispatch(updateFieldsPropertyLocationTab(fields))
        }

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(FormikForm);