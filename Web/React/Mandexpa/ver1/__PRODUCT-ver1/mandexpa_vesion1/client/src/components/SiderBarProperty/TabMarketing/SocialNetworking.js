import React, { Component } from 'react';
import FormControl from "@material-ui/core/FormControl/FormControl";
import IntlMessages from "Util/IntlMessages";
import {withFormik} from "formik";
import {updateFieldsPropertyMarketingTab} from "Actions";
import connect from "react-redux/es/connect/connect";

class SocialNetworking extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checkChange:false,
        };
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
        if(checkChange &&( preTab ===6|| preTab ==="6")){
            // this.props.handleSubmit();
            this.props.updateFieldsPropertyMarketingTab(this.props.values);
            this.setState({
                checkChange : false
            });
        }
    };
    render(){
        this._saveToRedux();
        var {agencys} = this.props;
        // console.log('check',this.props.check_agency);
        // console.log('check_agency',this.state.checkAgency);
        return(
            <div>
                <div className="row">
                        <div className="col-sm-6 col-12">
                            <FormControl className="form-group" >
                                <label  className="col-form-label" >{<IntlMessages id="property.marketing.title.facebook_personnel" />}</label>
                                <div className="heightIP40">
                                    <div >
                                        <div className="heightIP40">
                                            <input type="text"
                                                   className="form-control"
                                                   name="facebook_personnel"
                                                   value={this.props.values.facebook_personnel}
                                                   onChange={this.onChange}

                                            />
                                            {/*{this.props.touched.telephone &&<FormHelperText>{this.props.errors.telephone}</FormHelperText>}*/}
                                        </div>
                                    </div>
                                </div>
                            </FormControl>
                        </div>
                        <div className="col-sm-6 col-12">
                            <label  className="col-form-label" >{<IntlMessages id="property.marketing.title.sponsored_facebook_announcement" />}</label>
                            <div className="heightIP40">
                                <div >
                                    <div className="heightIP40">
                                        <input type="text"
                                               className="form-control"
                                               name="sponsored_facebook_announcement"
                                               value={this.props.values.sponsored_facebook_announcement}
                                               onChange={this.onChange}

                                        />
                                        {/*{this.props.touched.telephone &&<FormHelperText>{this.props.errors.telephone}</FormHelperText>}*/}
                                    </div>

                                </div>
                            </div>
                        </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <label  className="col-form-label" >{<IntlMessages id="property.marketing.title.instagram" />}</label>
                        <div className="heightIP40">
                            <div >
                                <div className="heightIP40">
                                    <input type="text"
                                           className="form-control"
                                           name="instagram"
                                           value={this.props.values.instagram}
                                           onChange={this.onChange}

                                    />
                                    {/*{this.props.touched.telephone &&<FormHelperText>{this.props.errors.telephone}</FormHelperText>}*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <label  className="col-form-label" >{<IntlMessages id="property.marketing.title.linkedin" />}</label>
                        <div className="heightIP40">
                            <div >
                                <div className="heightIP40">
                                    <input type="text"
                                           className="form-control"
                                           name="linkedin"
                                           value={this.props.values.linkedin}
                                           onChange={this.onChange}

                                    />
                                    {/*{this.props.touched.telephone &&<FormHelperText>{this.props.errors.telephone}</FormHelperText>}*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        )
    }
}
const FormikForm = withFormik({

    mapPropsToValues(datas) { // Init form field
        let {propertyDetail} = datas;
        if(typeof datas.propertyDetail !== "undefined"  && propertyDetail.market[0]){
            return {
                facebook_personnel: propertyDetail.market[0].facebook_personnel||"https://",
                sponsored_facebook_announcement: propertyDetail.market[0].sponsored_facebook_announcement||"https://",
                instagram:propertyDetail.market[0].instagram||"https://",
                linkedin:propertyDetail.market[0].linkedin||"https://",
            }
        }
        return {
            facebook_personnel: "https://",
            sponsored_facebook_announcement: "https://",
            instagram:"https://",
            linkedin:"https://",
        }
    },

    enableReinitialize: true,

})(SocialNetworking);
const mapStateToProps = (state) => {
    return ({
        propertyFields: state.propertyFields,
    })
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateFieldsPropertyMarketingTab:(fields)=>{
            return dispatch(updateFieldsPropertyMarketingTab(fields))
        },
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(FormikForm);