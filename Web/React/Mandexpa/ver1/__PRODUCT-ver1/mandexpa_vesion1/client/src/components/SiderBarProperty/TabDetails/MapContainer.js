import React, { Component } from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import AppConfig from 'Constants/AppConfig';
import FormControl from "@material-ui/core/FormControl/FormControl";
import IntlMessages from "Util/IntlMessages";
import {updateFieldsPropertyLocationTab} from "Actions";
import connect from "react-redux/es/connect/connect";


const Map = compose(

    withScriptjs,
    withGoogleMap
)
(props =>
    <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 49.490245, lng: 5.978449 }}
        onClick={props.onChange}
    >
        {props.isMarkerShown && <Marker position={{lat : props.markerPosition.lat,lng : props.markerPosition.lng}} />}

    </GoogleMap>

)

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: typeof this.props.propertyDetail!=="undefined"?parseFloat(this.props.propertyDetail.location[0].lat):49.490245,
            lng: typeof this.props.propertyDetail!=="undefined"?parseFloat(this.props.propertyDetail.location[0].lng):5.978449 ,
            checkChange:false,
        }

    }
    handleHandChange = (e) =>{
        this.setState({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        });
        this.setState({
            checkChange : true
        });
    };
    handleHandChangeInput = (event) =>{

        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: parseFloat(value)
        });
        this.setState({
            checkChange : true
        });
    };
    _saveToRedux=()=>{
        var {checkChange} =  this.state;
        var {propertyFields} =  this.props;
        var {preTab} =  propertyFields;
        var location = {
            lat : this.state.lat,
            lng : this.state.lng
        }
        if(checkChange &&( preTab ===2|| preTab ==="2")){
            this.props.updateFieldsPropertyLocationTab(location);
            this.setState({
                checkChange : false
            });
        }
    };
    render() {
        this._saveToRedux();
        return (
            <div>
                <Map
                    googleMapURL= {"https://maps.googleapis.com/maps/api/js?key=" + AppConfig.apiGoogleMap}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onChange ={this.handleHandChange}
                    markerPosition ={this.state}
                    isMarkerShown
                />
                <div className="row">
                    <div className="col-3">
                        <FormControl className="form-group" >
                            <label  className="col-form-label">{<IntlMessages id= "property.location.latitude" />}</label>
                            <div>
                                <div className="heightIP40">
                                    <input
                                            type="number"
                                            step="0.001"
                                            className="form-control"
                                            name="lat"
                                            onChange={this.handleHandChangeInput}
                                            value={this.state.lat}
                                    />
                                {/*{this.props.touched.streetname &&<FormHelperText>{this.props.errors.streetname}</FormHelperText>}*/}
                                </div>
                            </div>
                        </FormControl>
                    </div>
                    <div className="col-3">
                        <FormControl className="form-group" >
                            <label  className="col-form-label">{<IntlMessages id= "property.location.longitude" />}</label>
                                <div>
                                    <div className="heightIP40">
                                        <input
                                            type="number"
                                            step="0.001"
                                            className="form-control"
                                            name="lng"
                                            value={this.state.lng}
                                            onChange={this.handleHandChangeInput}
                                        />
                                        {/*{this.props.touched.streetname &&<FormHelperText>{this.props.errors.streetname}</FormHelperText>}*/}
                                        </div>
                            </div>
                        </FormControl>
                    </div>
                </div>

            </div>
        )
    }
}

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
export default connect(mapStateToProps,mapDispatchToProps)(MapContainer);
