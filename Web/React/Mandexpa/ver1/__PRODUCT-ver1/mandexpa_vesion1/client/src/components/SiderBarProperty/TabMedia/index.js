import React, {Component} from 'react';
import { withRouter} from "react-router-dom";
import {withFormik} from "formik";
import {connect} from "react-redux";
import {RegExp} from "Constants/GeneralConfig"

import ImageUpload from 'Components/ComponentHelper/ImageUpload'
import IntlMessages from "Util/IntlMessages";
import DialogMediaImage from "../DialogLayout/DialogMediaImage";
import {updateFieldsPropertyMediaTab,propertyUploadImage} from "Actions";
import Documents from "Components/SiderBarProperty/TabDocument";
const image_youtube = require('Assets/img/social/youtube.png');

class TabMedia extends Component {
    constructor(props) {
        super(props);
        let {propertyDetail} =  props;
        this.state = {
            urlYoutube: propertyDetail && propertyDetail.property.id && propertyDetail.market[0] !== undefined && propertyDetail.market[0].urlYoutube?propertyDetail.market[0].urlYoutube:'',
            values_image: propertyDetail && propertyDetail.property.id?propertyDetail.media:[],
            checkLink:false,
            openEditImage:false,
            id_Edit:null,
            image_Edit:null,
            checkChange: false,
        }

    }
    componentWillReceiveProps  = (nextProps) => {

        if(nextProps.propertyDetail!== this.props.propertyDetail){
            let {propertyDetail} =  nextProps;
            this.setState({
                urlYoutube: propertyDetail.market[0].urlYoutube || '',
                values_image:propertyDetail.media || [],
            })
        }
    }
    checkValidattionURL =(url)=>{
        const match =  url.match(RegExp.linkYoutube);
        if(match && match[2].length === 11){
            this.setState({
                checkLink: true,
            })
        }else {
            this.setState({
                checkLink: false,
            })
        }
    };

    handleChangeUrlYoutube = (event) => {
        this._isChanged(true);
        let url = event.target.value;
        this.checkValidattionURL(url);
        this.setState({
            urlYoutube: url,
        })
    };

    onUpload = async (data) =>{
        return new Promise((resolve,reject)=>{
            this.props.propertyUploadImage(data.imagesPreviews).then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(err);
            })
        })
    };

    clickPreview=()=>{
        window.open(this.state.urlYoutube,'_blank');
    };

    handleEditImage=(id)=>{
        this._isChanged(true);
        console.log("id",id);
        const {media_fields}= this.props.propertyFields;
        const item =  media_fields.images.filter(item=>item.id===id);
        this.setState({
            openEditImage:true,
            id_Edit:id,
            image_Edit:item[0]
        })
    };
    closeEditImage=()=>{
            this.setState({
                openEditImage:false,
                image_Edit:null,
                id_Edit:null,
            })
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
        let {checkChange} =  this.state;
        let {propertyFields} =  this.props;
        let {preTab} =  propertyFields;
        if(checkChange &&( preTab ===5|| preTab ==="5")){
            this.props.updateFieldsPropertyMediaTab({urlYoutube:this.state.urlYoutube});
            this._isChanged(false);
        }
    };

    render() {
        this._saveToRedux();
        const {urlYoutube,checkLink,openEditImage,image_Edit,values_image} = this.state;

        return (
            <div>
                <DialogMediaImage openDialog={openEditImage} data={image_Edit} closeDialog={this.closeEditImage}/>
                <div>
                    <IntlMessages id="property.media.photo.description"/>
                </div>
                <div className="card image-upload">
                    <div className="card-header obligateField">
                    <span className="obligate">*</span>
                        <IntlMessages id="property.media.photo.title"/>
                    </div>
                    <div className="card-body" style={{overflow:"-webkit-paged-x"}}>
                        {/* Media In here */}
                        <ImageUpload
                            values={values_image}
                            edit={this.handleEditImage}
                            onUpload={this.onUpload}
                        />
                    </div>

                </div>
                <div className="card">
                    <div className="card-header">
                        <IntlMessages id="property.media.youtube.title"/>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-1 col-md-1 col-lg-1">
                                <img
                                    src={image_youtube}
                                    alt="user profile"
                                    className="img-fluid rounded-circle"
                                    width="100"
                                    height="200"
                                />
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleChangeUrlYoutube}
                                    value={urlYoutube}
                                />
                            </div>

                                {urlYoutube&&checkLink?(
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div className="row">
                                            <div className="col-sm-4 col-md-4 col-lg-4">
                                                <button className="btn btn-primary" onClick={this.clickPreview}>
                                                    <IntlMessages id="property.media.youtube.btn_preview"/>
                                                </button>
                                            </div>
                                            <div className="col-sm-4 col-md-4 col-lg-4">
                                                <i className="zmdi zmdi-check-circle zmdi-hc-2x mdc-text-green"> </i>
                                            </div>
                                        </div>

                                    </div>
                                ):(<i className="zmdi zmdi-close-circle zmdi-hc-2x mdc-text-green"> </i> )}


                        </div>
                    </div>
                </div>
                <div className="mt-3 card">
                    <div className="card-header">
                        <IntlMessages id="property.tab.documents"/>
                    </div>
                    <div className="card-body">
                        <Documents propertyDetail={this.props.propertyDetail}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        propertyFields: state.propertyFields
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateFieldsPropertyMediaTab: (fields) => {
            return dispatch(updateFieldsPropertyMediaTab(fields))
        },
        propertyUploadImage:field=>{
            return dispatch(propertyUploadImage(field))
        }
    }
};

const FormikForm = withFormik({

    mapPropsToValues(datas) { // Init form field
        return {

        }
    },
    enableReinitialize: true

})(TabMedia);

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FormikForm));