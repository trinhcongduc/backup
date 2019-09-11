/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withFormik} from "formik";
import IntlMessages from "Util/IntlMessages";
import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import {PROPERTY_TYPE} from "Constants/ComponentConfigs/PropertyConfig";
import {updateFieldsPropertyMainTab} from "Actions";

class Representation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkChange:false,
        }
    };

    handleChange=(event)=>{
        this._isChanged(true);
        this.props.handleChange(event)
    };

    _isChanged = (status)=>{
        this.setState({
            checkChange:status
        })
    };

    _saveToRedux=()=>{
        var {checkChange} =  this.state;
        var {propertyFields} =  this.props;
        var {preTab} =  propertyFields;
        if(checkChange &&( preTab ===1|| preTab ==="1")){
            var data =  this.props.values;
            this.props.updateFieldsPropertyMainTab(data);
            this._isChanged(false);
        }
    };

    render() {
        this._saveToRedux();
        const {
            representation,
            orientation_terrace,
            type_heating,
        } = this.props.values; // get prop of Formik return
        const {propertyFields} = this.props;
        const {type} = propertyFields;
        return (
            <div className="card">
                <div className="card-header">
                    <IntlMessages id="property.main.representation"/>
                </div>
                <div className="card-body">
                    <div className="row form-group">
                        <div className="col-sm-4 col-md-4 col-lg-4 obligateField">
                            <span className="obligate">*</span><IntlMessages id="property.main.representation"/>
                        </div>
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <div>
                                <input type="text" name="representation" value={representation} className="form-control"
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                    {type === PROPERTY_TYPE.type.RENT && (
                        <div>
                            <div className="row form-group">
                                <div className="col-sm-4 col-md-4 col-lg-4">
                                    <IntlMessages id="property.main.orientation_terrace"/>
                                </div>
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <div>
                                        <input type="text" name="orientation_terrace" value={orientation_terrace}
                                               onChange={this.handleChange}
                                               className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-sm-4 col-md-4 col-lg-4">
                                    <IntlMessages id="property.main.type_heating"/>
                                </div>
                                <div className="col-sm-8 col-md-8 col-lg-8">
                                    <SelectAutoComplete name="type_heating" onChange={this.handleChange}
                                                        value={type_heating}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return ({
        propertyFields: state.propertyFields
    })
};
const mapDispatchToProp = (dispatch,props)=>{
    return{
        updateFieldsPropertyMainTab:(fields)=>{
            dispatch(updateFieldsPropertyMainTab(fields))
        }
    }
};

const FormikForm = withFormik({
    mapPropsToValues() { // Init form field
        return {
            representation: '',
            orientation_terrace: '',
            type_heating: {value: 0, label: 'xxx'},
        }
    },
})(Representation);

export default connect(mapStatetoProps,mapDispatchToProp)(FormikForm);
