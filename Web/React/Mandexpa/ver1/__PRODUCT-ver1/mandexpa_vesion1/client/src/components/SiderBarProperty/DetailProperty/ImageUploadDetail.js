import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import Dropzone from "react-dropzone";
import classNames from 'classnames';
import {updateFieldsPropertyMediaTab} from "Actions";
import Tooltip from '@material-ui/core/Tooltip';
import {URL_SERVER} from "Constants/GeneralConfig";

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
        // position: 'relative',
        borderStyle: 'dashed',
        borderRadius: '5px',
        borderWidth: '2px',
        borderColor: '#ccc',
        minHeight: '170px',
        // minWidth: '170px',
    },
    addImage: {
        color: '#614194',
    },
});

var AutoincrementID = 0;


class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        const {values} =  props;
        var imagePreview=[];
        if(values){
            values.map((detail)=>{
                try {
                    // Kiểm tra xem đã đưa dữ liệu này vào state chưa?
                    var check = imagePreview.map((item)=>item.id);
                    if(check.indexOf(detail.id) === -1){
                        if(detail.image.search('http') === -1){
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
            imagesPreviews: imagePreview,
        };
    }

    componentWillReceiveProps(nextProps) {
        const {values} =  nextProps;
        if(values!== this.props.values){
            var imagePreview=[];
            values.map((detail)=>{
                try {
                    // Kiểm tra xem đã đưa dữ liệu này vào state chưa?
                    var check = imagePreview.map((item)=>item.id);
                    if(check.indexOf(detail.id) === -1){
                        if(detail.image.search('http') === -1){
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


    render() {
        let {imagesPreviews} = this.state;
        const {classes} = this.props;
        // console.log("=(====)=-->",this.props.media_fields.images);
        return (
            <div className="">
                <label
                    className="btn btn-default btn-sm z-depth-0 mr-0 pl-2 pr-2 custom-file-upload waves-effect waves-light "
                    htmlFor="file">
                    <i className="fas fa-image fa-fw" aria-hidden="true"> </i>
                    {/* <input className="upload" type="file" onChange={this._handleImageChange} multiple/> */}
                    <Dropzone className={classNames(classes.ImageLayout)} multiple={true} accept="image/*"
                              >
                        <Grid container className={classes.root} spacing={16}>
                            <Grid item xs={12}>
                                <Grid container className={classes.demo}
                                      spacing={8}>
                                    {imagesPreviews.map((imagesPreview, value) => {
                                        return (<div key={value}>
                                                <div className={classNames(classes.containerImage)}>
                                                    <Grid item>
                                                        <img className={classNames(classes.img, classes.otherclass)}
                                                             key={value} src={imagesPreview.image}
                                                             style={{
                                                                 height: '150px',
                                                                 width: 'auto',
                                                                 minHeight: '150px'
                                                             }}/>
                                                    </Grid>
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

ImageUpload.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        media_fields: state.propertyFields.media_fields
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        saveToRedux: (fields) => {
            return dispatch(updateFieldsPropertyMediaTab(fields))
        }
    }
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ImageUpload));