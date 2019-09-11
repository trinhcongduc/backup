/**
 * by ductrinh
 * Component allow drop or choose one or many images for display and upload to server.
 * ===============>PROPS<===================\
 * name(optional)               : name of image upload
 * values(optional)             : list image (array)
 * image_styles                 : style for image display.
 * dropBox_title                : title of drop box when not have any image chosen.
 * numberImages                 : limit number image show in list.
 * isEditImage                  : show action edit in the each image dislayed.
 * actionClickOnDrop            : enable or disable action click to drop space for action choose image.
 * onUpload                     : function (async) for action upload image to server .
 * edit                         : function for action edit each image
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import Dropzone from "react-dropzone";
import classNames from 'classnames';
import {updateFieldsPropertyMediaTab,propertyUploadImage} from "Actions";
import Tooltip from '@material-ui/core/Tooltip';
import {URL_SERVER} from "Constants/GeneralConfig";
import IntlMessages from "Util/IntlMessages";
const loading_icon = require('Assets/img/gif/loading-2.gif');


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    img: {
        width: '50px',
    },
    otherclass: {
        margin: '10px',
        display: 'block',
        width: '100%',
        height: 'auto',
    },
    overlay: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        height: '100%',
        width: '100%',
        opacity: '0',
        transition: '.3s ease',
        backgroundColor: 'black',
        '&:hover': {
            opacity: '0.4',
            width: '89%',
            margin: 'auto',
        }
    },
    containerImage: {
        position: 'relative',
        width: '100%',
    },
    icon: {
        color: 'white',
        fontSize: '30px',
        position: 'absolute',
        left: '20px',
    },
    icon1: {
        color: 'white',
        fontSize: '30px',
        position: 'absolute',
        right: '20px',
    },
    ImageLayout: {
        borderStyle: 'dashed',
        borderRadius: '5px',
        borderWidth: '2px',
        borderColor: '#ccc',
        minHeight: '170px',
    },
    addImage: {
        color: '#614194',
    },
    loading:{
        maxHeight:'70px'
    },
    wrap_imageUpload:{
        display:"table",
        width: '100%',
        tableLayout: 'fixed'
    },
    child_imageUpload:{
        display:"table-cell",

    },
    drop_tile:{
        whiteSpace: 'pre-wrap'
    }
});
const loadingStyle = {
    fontSize:'15px',
    fontWeight:'900',
    color:'#684D9B'
};

let AutoincrementID = 0;


class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        const {values} =  props;
        let imagePreview=[];
        if(values){
            values.map((detail) => {
                try {
                // Check did data save to state ?
                let check = imagePreview.map((item)=>item.id);
                if(check.indexOf(detail.id) === -1){
                    if(detail.image !== undefined && detail.image.search('http') === -1){
                        detail.image = URL_SERVER+detail.image;
                    }
                    imagePreview.push(detail);
                }
                }
                catch (err) {
                    console.log(err)
                }
            });
        }
        this.state = {
            files: [],
            loadcom:true,
            loading:false,
            imagesPreviews: imagePreview,
        };
        this.saveToRedux();
    }

    componentWillReceiveProps(nextProps) {
        const {values} =  nextProps;
        if(values!== this.props.values){
            let imagePreview=[];
            values.map((detail)=>{
                try {
                    // Check did data save to state ?
                let check = imagePreview.map((item)=>item.id);
                    if(check.indexOf(detail.id) === -1){
                        if(detail.image !== undefined && detail.image.search('http') === -1){
                            detail.image = URL_SERVER+detail.image;
                        }
                        imagePreview.push(detail);
                    }
                }
                catch (err) {
                    console.log(err)
                }
            });
            this.setState({
                files: [],
                imagesPreviews: imagePreview
            })
        }
    }

    _handleFile = async (files_data) => {
        let {files,imagesPreviews} = this.state;
        let {numberImages} = this.props;
        if(numberImages){
            if(files_data.length < numberImages){
                numberImages = files_data.length;
            }else if(files_data.length > numberImages){
                files_data = files_data.slice(files_data.length-numberImages,files_data.length)
            }
            files = files.slice(numberImages,files.length);
            imagesPreviews = imagesPreviews.slice(numberImages,imagesPreviews.length);
        }
        this.setState({
            files:files,
            imagesPreviews:imagesPreviews,
        },async () =>{
            await Promise.all(
                files_data.map(async (file, i) => {
                    let result = null;
                    this.setState(prevState => ({
                        files: [...prevState.files, file],
                        imagesPreviews: [...prevState.imagesPreviews,
                            {
                                id: AutoincrementID++,
                                image: URL.createObjectURL(file),
                                file: file,
                                title:"",
                                primaryImage:false
                            }
                        ]
                    }));
                    return result;
                })
            );
        });


    };

    saveToRedux() {
        let {imagesPreviews} = this.state;
        let {name} = this.props;
        if (imagesPreviews.length) {
            this.props.saveToRedux({images: imagesPreviews});
            let new_image = imagesPreviews.filter(item=>{
                return item.property_id === undefined && item.path === undefined;
            });
            if(new_image.length > 0){
                this.setState({
                    loading:true
                },()=>{
                    let data = {};
                    data = {...data,imagesPreviews:imagesPreviews}
                    if(name !== undefined && name !== null){
                        data = {...data,name:name}
                    }
                    this.props.onUpload(data).then(res=>{
                        this.setState({
                            loadcom:!this.state.loadcom,
                            loading:false
                        })
                    })
                });
            }
        }
    }

    _handleImageChange = (e) => {
        e.preventDefault();
        // FileList to Array`
        let files = Array.from(e.target.files);

        // File Reader for Each file and and update state arrays
        this._handleFile(files).then(res=>{
            this.saveToRedux();
        })
    };

    removeImage = (event) => {
        let target = event.target;
        let position = target.attributes.position.value;
        let {imagesPreviews, files} = this.state;
        files.splice(position, 1);
        imagesPreviews.splice(position, 1);
        this.setState({
            imagesPreviews: imagesPreviews
        })
    };

    handleEditImage = (id) => {
        this.props.edit(id);

    };

    onDrop = (files) => {
        this._handleFile(files).then(res=>{
            this.saveToRedux();
        })

    };

    render() {

        let {imagesPreviews,loading} = this.state;
        const {classes,media_fields,image_styles,dropBox_title,actionClickOnDrop,isEditImage} = this.props;
        return (
            <div className={classes.wrap_imageUpload}>
                <label
                    className={classNames("btn btn-default btn-sm z-depth-0 mr-0 pl-2 pr-2 custom-file-upload waves-effect waves-light ",classes.child_imageUpload)}
                    htmlFor="file">
                    {
                        !actionClickOnDrop && (
                            <div>
                                <i className="fas fa-image fa-fw" aria-hidden="true"> </i>
                                <div onClick={() => this.fileUpload.click()}>
                                    <div className={classNames(classes.addImage)}>
                                        <Tooltip title="Add image here" aria-label="Add">
                                            <i className="zmdi zmdi-plus-circle zmdi-hc-4x" >
                                            </i>
                                        </Tooltip>
                                    </div>
                                </div>
                                <input type="file" ref={(fileUpload) => {
                                    this.fileUpload = fileUpload;
                                }}
                                       style={{ visibility: 'hidden'}} onChange={this._handleImageChange} multiple/>
                            </div>
                        )
                    }

                    {
                        // !media_fields.status_upload &&
                        // (<div className=" text-center">
                        //     <img src={loading_icon} className={classes.loading} alt="Loading..."/><br/>
                        //     <div style={loadingStyle}>
                        //         <IntlMessages  id="property.upload_image.loading" />
                        //     </div>
                        // </div>)
                        loading &&
                        (<div className=" text-center">
                            <img src={loading_icon} className={classes.loading} alt="Loading..."/><br/>
                            <div style={loadingStyle}>
                                <IntlMessages  id="property.upload_image.loading" />
                            </div>
                        </div>)
                    }
                    <Dropzone className={classNames(classes.ImageLayout)} multiple={true} accept="image/*"
                              onDrop={this.onDrop} onClick={(event) => {
                                  !actionClickOnDrop && event.preventDefault();
                              }}
                    >
                        {
                            imagesPreviews.length === 0 && (
                            <div className={classes.drop_tile}>
                                {dropBox_title}
                            </div>
                            )
                        }
                        <Grid container className={classes.root} spacing={16}>
                            <Grid item xs={12}>
                                <Grid container
                                      spacing={8}>
                                    {imagesPreviews.map((imagesPreview, value) => {
                                        return (
                                            <div key={value}>
                                                <div className={classNames(classes.containerImage)}>
                                                    <Grid item>
                                                        <img className={classNames(classes.img, classes.otherclass)}
                                                             key={value} src={imagesPreview.image}
                                                             style={image_styles}
                                                        />
                                                    </Grid>
                                                    <div className={classNames(classes.overlay)}>
                                                        <div className={classNames(classes.icon)}>
                                                            <i className="zmdi zmdi-close" position={value} style={{
                                                                border: '1px solid #ccc',
                                                                borderRadius: '20px',
                                                                padding: '0 5px',
                                                            }} onClick={this.removeImage}> </i>
                                                        </div>
                                                        {
                                                            isEditImage && (
                                                                <div className={classNames(classes.icon1)}>
                                                                    <i className="zmdi zmdi-edit iconEdit" style={{
                                                                        border: '1px solid #ccc',
                                                                        borderRadius: '20px',
                                                                        padding: '0 4px',
                                                                    }}
                                                                       onClick={() => this.handleEditImage(imagesPreview.id)}> </i>

                                                                </div>
                                                            )
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Dropzone>
                </label>
            </div>
        )
    }
}

ImageUpload.defaultProps = {
    image_styles:{
        height:'150px',
        minHeight:'150px',
        width:'auto',
    },
    dropBox_title: (<IntlMessages id="dropdown.title.default"/>),
    numberImages:0,
    actionClickOnDrop:false,
    isEditImage:true,
    values:[]
};

ImageUpload.propTypes = {
    classes: PropTypes.object.isRequired,
    name:PropTypes.string,
    image_styles:PropTypes.object,
    dropBox_title:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    numberImages:PropTypes.number,
    actionClickOnDrop:PropTypes.bool,
    isEditImage:PropTypes.bool,
    onUpload:PropTypes.func.isRequired,
    values:PropTypes.arrayOf(PropTypes.shape({
        image:PropTypes.string.isRequired
    })),
};

const mapStateToProps = (state) => {
    return {
        // media_fields: state.propertyFields.media_fields
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        saveToRedux: (fields) => {
            return dispatch(updateFieldsPropertyMediaTab(fields))
        },
        propertyUploadImage:field=>{
            return dispatch(propertyUploadImage(field))
        }
    }
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ImageUpload));