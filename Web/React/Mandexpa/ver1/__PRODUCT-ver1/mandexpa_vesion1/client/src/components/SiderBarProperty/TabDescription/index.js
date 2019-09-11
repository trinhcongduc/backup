import React, {Component} from 'react';
import {withFormik} from "formik";
import * as Yup from "yup";
import IntlMessages from "Util/IntlMessages";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import {connect} from "react-redux";
import {updateFieldsPropertyDesciptionTab} from "Actions";
import {ACCOUNT_TYPE} from "Constants/GeneralConfig";

class TabDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkChange: false,
        }
    }

    onChange = (e) => {
        this.setState({
            checkChange: true
        });

        this.props.handleChange(e);
    };
    // onChangeFile = (e) => {
    //     this.setState({
    //         checkChange: true
    //     });
    //     console.log(e);
    //     this.props.setFieldValue('file_des', e.currentTarget.files[0])
    // }
    _saveToRedux = () => {
        var {checkChange} = this.state;
        var {propertyFields} = this.props;
        var {preTab} = propertyFields;
        if (checkChange && (preTab === 3 || preTab === "3")) {
            this.props.updateFieldsPropertyDesciptionTab(this.props.values);

            this.setState({
                    checkChange: false
                }
            )
            this.props.handleSubmit();
        }
    };

    render() {
        this._saveToRedux();
        const {accountCurrent} = this.props;
        // var {propertyDetail} = this.props;
        // var file_des = "1";
        // if(propertyDetail){
        //     propertyDetail.documents.map(item =>{
        //         if(item.kind === "des_file"){
        //             file_des = item.file_doc;
        //         }
        //     })
        // }
        // var file_uploaded = "";
        // var file = typeof this.props.propertyDetail!=="undefined"?this.props.propertyDetail.documents:[];
        // file.map((item,index) => {
        //     if(item.kind==="des_file"){
        //         file_uploaded = item.file_doc;
        //     }
        // })
        // var href = URL_SERVER+ file_uploaded;
        return (
            <div>
                {accountCurrent.type === ACCOUNT_TYPE.PROMOTER?<div className="card">
                    <div className="card-header">
                        Titre du projet immobilier
                    </div>
                    <div className="card-body">
                        <div>
                            <div>
                                <div className="row">
                                    <div className="col-sm-10 col-md-10 col-lg-10 col-12">
                                        <textarea name="title_project"  className="form-control"
                                                  value={this.props.values.title_project}
                                                  onChange={this.onChange}
                                                  onBlur={this.props.handleBlur}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:""}
                <div className="card">
                    <div className="card-header">
                        Titre du bien
                    </div>
                    <div className="card-body">
                        <div>
                        <p className="obligateField"><span className="obligate">*</span><IntlMessages
                            id="property.description.add_slogan"/></p>
                            <div>
                                <div className="row">
                                    <div className="col-sm-10 col-md-10 col-lg-10 col-12">
                                        <textarea name="title_des"  className="form-control"
                                                  // placeholder="Superbe penthouse de très haut standing à la vente"
                                                  // placeholder={<IntlMessages id="property.description.property_title.placeholder"/>}
                                                  value={this.props.values.title_des}
                                                  onChange={this.onChange}
                                                  onBlur={this.props.handleBlur}
                                        />
                                    </div>
                                    <p className="col-sm-2 col-12 mt-3">(maximim 50 caractères)</p>
                                </div>
                            </div>
                        {this.props.touched.title_des && <FormHelperText>{this.props.errors.title_des}</FormHelperText>}
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-10 col-12">
                                {/*<label>Descriptif du bien</label>*/}
                                <label className="obligateField">
                                                    <span className="obligate">*</span><IntlMessages id="property.description.property_description"/></label>
                                <textarea name="des_pro" className="form-control"
                                          placeholder = "Votre agence immobilière vous propose (Ne jamais mettre ses coordonnées)"
                                          value={this.props.values.des_pro}
                                       onChange={this.onChange}
                                       onBlur={this.props.handleBlur}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-10 col-12">
                                <label>A savoir</label>
                                <textarea name="more_des" className="form-control"
                                       value={this.props.values.more_des}
                                       onChange={this.onChange}
                                       onBlur={this.props.handleBlur}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className="card mt-2">*/}
                    {/*<div className="card-header">*/}
                        {/*Uploader le plan*/}
                    {/*</div>*/}
                    {/*<div className="card-body">*/}
                        {/*{file_uploaded!==""?<a href={href} target="_blank">{file_uploaded}</a>:<div>*/}
                            {/*<input className="upload" type="file" name="file_des"*/}
                                   {/*onChange={this.onChangeFile}*/}
                            {/*/>*/}
                        {/*</div>}*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        )
    }
}

const FormikForm = withFormik({

    mapPropsToValues(datas) { // Init form field
        if(typeof datas.propertyDetail != "undefined" ){

            return {
                title_des: datas.propertyDetail.property.title_des||"",
                title_project: datas.propertyDetail.property.title_project||"",
                // file_des:  "",
                more_des:datas.propertyDetail.property.more_des||"",
                des_pro:datas.propertyDetail.property.des_pro||"",
            }
        }
        return {
            title_des: "",
            // file_des: "",
            more_des:"",
            des_pro:"",
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field

        title_des: Yup.string()
            .required((<IntlMessages id='notification.required'/>)),
        des_pro: Yup.string()
            .required((<IntlMessages id='notification.required'/>)),
    }),
    enableReinitialize: true,
    handleSubmit(values, {props, setSubmitting, resetForm}) {
        // props.updateFieldsPropertyDesciptionTab(values);
        // console.log(props.propertyFields);
    },

})(TabDescription);

const mapStateToProps = (state) => {
    return ({
        propertyFields: state.propertyFields,
        accountCurrent:state.authLogin
    })
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateFieldsPropertyDesciptionTab: (fields) => {
            return dispatch(updateFieldsPropertyDesciptionTab(fields))
        }

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FormikForm);