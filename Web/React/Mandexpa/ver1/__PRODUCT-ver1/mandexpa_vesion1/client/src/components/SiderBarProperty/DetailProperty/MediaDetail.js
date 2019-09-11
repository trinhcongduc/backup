import React, {Component} from 'react';

import ImageUpload from './ImageUploadDetail'
import IntlMessages from "Util/IntlMessages";
const image_youtube = require('Assets/img/social/youtube.png');

class TabMedia extends Component {
    constructor(props) {
        super(props);
        const {propertyDetail} =  props;
        this.state = {
            urlYoutube: propertyDetail && propertyDetail.property.id && propertyDetail.market[0] !== undefined &&  propertyDetail.market[0].urlYoutube?propertyDetail.market[0].urlYoutube:'',
            values_image: propertyDetail && propertyDetail.property.id?propertyDetail.media:[],
    }

    }
    componentWillReceiveProps  = (nextProps) => {

        if(nextProps.propertyDetail!== this.props.propertyDetail){
            const {propertyDetail} =  nextProps;
            this.setState({
                urlYoutube: propertyDetail.market[0].urlYoutube || '',
                values_image:propertyDetail.media || [],
            })
        }
    }
    clickPreview=()=>{
        window.open(this.state.urlYoutube,'_blank');
    };

    render() {
        const {urlYoutube,values_image} = this.state;
        return (
            <div>
                <div>
                    <IntlMessages id="property.media.photo.description"/>
                </div>
                <div className="card">
                    <div className="card-header">
                        <IntlMessages id="property.media.photo.title"/>
                    </div>
                    <div className="card-body" style={{overflow:"-webkit-paged-x"}}>
                        {/* Media In here */}
                        <ImageUpload values={values_image}/>
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
                                {urlYoutube}
                            </div>

                            {urlYoutube?(
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
                            ):""}


                        </div>
                    </div>
                </div>
                <div className="mt-3 card">
                    <div className="card-header">
                        <IntlMessages id="property.tab.documents"/>
                    </div>
                    <div className="card-body">
                        {/*<TabDocument propertyDetail={this.props.propertyDetail}/>*/}
                    </div>
                </div>
            </div>
        )
    }
}


export default TabMedia;