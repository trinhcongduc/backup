/**
 * Component  upgrade package for a subscriber
 */



import React, {Component} from 'react';
import IntlMessages from "Util/IntlMessages";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import {dimensionImage} from "Helpers";


const styles = () =>({
    circular_square_img :{
        borderRadius: '50%',
    },
    circular_landscape :{

        width: '200px',
        height: '200px',
        overflow: 'hidden',
        borderRadius: '50%',
    },

    circular_landscape_img :{
        width: 'auto',
        height: '100%',
        marginLeft: '-40%',
    },

    circular_portrait :{
        position: 'relative',
        width: '200px',
        height: '200px',
        overflow: 'hidden',
        borderRadius: '50%',
    },

    circular_portrait_img :{
        width:' 100%',
        height: 'auto',
    }
});


class AutoCropImage extends Component{
    constructor(props) {
        super(props);
        this._isMounted  = true;
        this.state = {
            dimensions:null
        }
    }

    componentDidMount(){
        const {src} = this.props;
        if(src && this._isMounted){
            dimensionImage(src).then(res=>{
                let _ReisMounted = this._isMounted;
                if(_ReisMounted){
                    this.setState({
                        dimensions : res
                    })
                }
            })
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
    }

    renderImageCroped =  (dimension) =>{
        const {classes,src,imageSize} = this.props;
        let scale =  dimension.width/dimension.height;
        if(scale > 1.1){                // landscape
            return (
                <div style={imageSize} className={classes.circular_landscape} >
                    <img className={classes.circular_landscape_img} src={src} alt="image_crop"/>
                </div>
            )
        }else if(scale < 0.95){         // portrait
            return (
                <div style={imageSize} className={classes.circular_portrait} >
                    <img className={classes.circular_portrait_img} src={src} alt="image_crop"/>
                </div>
            )
        }else {                         // square
            return (
                <div>
                    <img className={classes.circular_square_img} style={imageSize} src={src} alt="image_crop"/>
                </div>
            )
        }

    };

    render() {
        const {dimensions} = this.state;
        return (
            <div>
                {
                    dimensions && this.renderImageCroped(dimensions)
                }

            </div>
        );
    }
}

AutoCropImage.defaultProps = {
    imageSize:{
        height:'100px',
        width:'100px',
    }
};

AutoCropImage.propTypes = {
    src:PropTypes.string.isRequired,
    imageSize:PropTypes.shape({
        height:PropTypes.string,
        width:PropTypes.string,
    })
};

export default withRouter(withStyles(styles)(AutoCropImage));