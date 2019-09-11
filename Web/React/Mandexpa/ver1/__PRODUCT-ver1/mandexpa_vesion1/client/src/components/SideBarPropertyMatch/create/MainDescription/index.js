/**
 * App.js Layout Start Here
 */

'use strict'
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {withFormik} from "formik";
import IntlMessages from "../../../../util/IntlMessages";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import Checkbox from '@material-ui/core/Checkbox';
import "react-datepicker/dist/react-datepicker.css";


class MainDescription extends Component {
    constructor(props) {
        super(props);
        // this.state={
        //     date_avai:new Date(),
        // }
    }
    _updateData = () =>{
        // var data = Object.assign(this.props.values,{date_avai:this.state.date_avai});
        this.props.parent_get_data(this.props.values);
    };


    render() {
        const {
            kind_property,
            send_contact,
            sale,
            rent,
        } = this.props.values;
        this._updateData();
        return (
            <div>
                <form>
                    <div className="card">
                        <div className="card-header">
                            <IntlMessages id="property.property_match.main_des.title"/>
                        </div>
                        <div className="card-body">
                            <FormControlLabel
                                label={<IntlMessages id="property.popup.kind.residential"/>}
                                control={
                                    <Radio checked={kind_property === "residential"}
                                           onChange={this.props.handleChange}
                                           name="kind_property"
                                           value="residential"/>}
                            />
                            <FormControlLabel
                                label={<IntlMessages id="property.popup.kind.commercial"/>}
                                control={
                                    <Radio checked={kind_property ==="commercial"}
                                           onChange={this.props.handleChange}
                                           name="kind_property"
                                           value="commercial"/>}
                            />

                            <FormControlLabel
                                label={<IntlMessages id="property.popup.purpose.sale"/>}
                                control={
                                    <Checkbox checked={sale}
                                              onChange={this.props.handleChange}
                                              name="sale"/>
                                }
                            />
                            <FormControlLabel
                                label={<IntlMessages id="property.popup.purpose.rent"/>}
                                disabled
                                control={
                                    <Checkbox checked={rent}
                                              onChange={this.props.handleChange}
                                              name="rent"/>
                                }
                            />

                            <hr/>
                            <div className="form-group row">
                                <div className="col-sm-4 col-md-4 col-lg-4">
                                    <FormControlLabel
                                        label={<IntlMessages id="property.property_match.main_des.agree_send_match_contact"/>}
                                        control={
                                            <Checkbox checked={send_contact}
                                                      onChange={this.props.handleChange}
                                                      name="send_contact"/>
                                        }
                                    />
                                </div>
                                <label  className="col-sm-8 col-md-8 col-lg-8 col-form-label ">
                                    <IntlMessages id="property.property_match.main_des.agree_send_match_contact.des"/>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


const mapStateToProp = (state) => {
    return {
        propertyMatchesDetail: state.property_matches.property_matches_edit
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {

    }
};


const FormikForm = withFormik({
    mapPropsToValues(datas) { // Init form field
        const {propertyMatchesDetail} = datas;
        if(propertyMatchesDetail && propertyMatchesDetail.id){
            return {
                kind_property: propertyMatchesDetail.kind_property,
                send_contact: propertyMatchesDetail.send_contact?true:false,
                sale: propertyMatchesDetail.sale?true:false,
                rent: propertyMatchesDetail.rent?true:false,
            }
        }
        return {
            kind_property: 'residential',
            send_contact: true,
            sale: true,
            rent: false,
        }
    },
    enableReinitialize:true,
})(MainDescription);


export default connect(mapStateToProp, mapDispatchToProps)(withRouter(FormikForm));
