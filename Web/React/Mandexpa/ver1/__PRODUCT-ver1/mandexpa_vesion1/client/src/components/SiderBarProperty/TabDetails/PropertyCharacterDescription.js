import React, {Component} from 'react';
import IntlMessages from "../../../util/IntlMessages";
import {withFormik} from "formik";


import DetailParamRoom from './DetailParamRoom';
import {connect} from "react-redux";
import {getListRoomTypes, getListParentFacility, updateFieldsPropertyCharacterTab} from "Actions";
import * as Yup from "yup";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";

var position = 0;


class PropertyCharacterDescription extends Component {
    constructor(props) {
        super(props);
        const {propertyDetail} =  props;
        const {room_type} = props.propertyDatas;
        var detail_rooms_values = [];
        var detail_rooms_component = [];
        if(propertyDetail && propertyDetail.property.id ){
            detail_rooms_values = JSON.parse(propertyDetail.character[0].detail_rooms_values);
            if(detail_rooms_values){
                detail_rooms_component = this._update_data_edit(detail_rooms_values);
            }
        }
        this.state = {
            position: 0,
            detail_rooms_component: detail_rooms_component,
            detail_rooms_values: detail_rooms_values||[],
            checkChange: false,
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {

        const {propertyDetail} =  nextProps;
        const {room_type} = nextProps.propertyDatas;
        var detail_rooms_values = [];
        var detail_rooms_component = [];

        if(propertyDetail && propertyDetail.property.id && propertyDetail !== this.props.propertyDetail ){
            detail_rooms_values = JSON.parse(propertyDetail.character[0].detail_rooms_values);
            if(detail_rooms_values){
                detail_rooms_component = this._update_data_edit(detail_rooms_values);
            }
            this.setState({
                detail_rooms_component: detail_rooms_component||[],
                detail_rooms_values: detail_rooms_values||[],
            })
        }
    }

    _update_data_edit=(detail_rooms_values)=>{
        var detail_rooms_component = [];
        const {room_type} = this.props.propertyDatas;
        position = detail_rooms_values.length+1;
        detail_rooms_values.map((detail)=>{
            var item = {
                position: detail.position,
                component: (
                    <DetailParamRoom removeItem={this.removeItem}
                                     values={detail}
                                     Up={this.handleUp}
                                     Down={this.handleDown}
                                     key={detail.position}
                                     onChange={this.handleChangeRooms}
                                     position={detail.position}
                                     listOption={room_type}/>)
            };
            // Kiểm tra xem đã đưa dữ liệu này vào state chưa?
            var check = detail_rooms_component.map((item)=>item.position);
            if(check.indexOf(detail.position) === -1){
                detail_rooms_component.push(item);
            }
        });

        return detail_rooms_component;
    };

    _swap(arr1, index1, index2) {
        let tg = arr1[index1];
        arr1[index1] = arr1[index2];
        arr1[index2] = tg;
        return arr1;
    }

    _mapDetailRoomsToValues = () => {
        this._isChanged(true);
        var {detail_rooms_component, detail_rooms_values} = this.state;
        for (var i = 0; i < detail_rooms_component.length; i++) {
            var position = detail_rooms_component[i].position;
            var position_value = detail_rooms_values.map(item => item.position).indexOf(position);
            if (position_value !== i) {
                detail_rooms_values = this._swap(detail_rooms_values, position_value, i);
            }
        };

    };

    componentWillMount = () => {
        var {propertyDatas} = this.props;
        var {room_type} = propertyDatas;
        if (room_type && room_type.length <= 0) {
            // console.log("getListRoomType");
            this.props.getListRoomTypes();
        }
    };

    renderListRoomsDetail = () => {
        var result = null;
        var {detail_rooms_component} = this.state;
        if (detail_rooms_component && detail_rooms_component.length) {
            result = detail_rooms_component.map((item, index) => {
                return (item.component);
            });
        }
        return result;
    };

    handleChangeRooms = (event) => {
        this._isChanged(true);
        var {detail_rooms_values} = this.state;
        var position = detail_rooms_values.map(item => item.position).indexOf(event.id);
        var {target} = event;
        detail_rooms_values[position][target.name] = target.value;
        this.setState({
            detail_rooms_values: detail_rooms_values,
        },()=>{
            // console.log("DATE--detail_rooms_values--> ",this.state.detail_rooms_values);
        })
    };

    addDetailRoom = (room_type) => {
        this._isChanged(true);
        var {detail_rooms_component, detail_rooms_values} = this.state;
        var item = {
            position: position,
            component: (
                <DetailParamRoom removeItem={this.removeItem}
                                 value={{}}
                                 Up={this.handleUp}
                                 Down={this.handleDown}
                                 key={position}
                                 onChange={this.handleChangeRooms}
                                 position={position}
                                 listOption={room_type}/>)
        };
        var item_value = {
            position: position,
            room_type: "",
            dimension: "",
            acreage: 0,
            description: ""

        };
        position++;
        detail_rooms_component.push(item);
        detail_rooms_values.push(item_value);
        this.setState({
            detail_rooms_component: detail_rooms_component
        })
    };
    removeItem = (index) => {
        this._isChanged(true);
        var {detail_rooms_component, detail_rooms_values} = this.state;
        var items = detail_rooms_component.filter((item) => {
            return item.position !== index;
        });
        var items_values = detail_rooms_values.filter((item) => {
            return item.position !== index;
        });

        this.setState({
            detail_rooms_component: items,
            detail_rooms_values: items_values,
        }, () => {
            // console.log(this.state.detail_rooms_component)
        })
    };

    handleUp = (index) => {
        var {detail_rooms_component} = this.state;
        const position = detail_rooms_component.map(item => item.position).indexOf(index);
        if (position) {
            var item = detail_rooms_component[position];
            detail_rooms_component[position] = detail_rooms_component[position - 1];
            detail_rooms_component[position - 1] = item;
        }
        this.setState({
            detail_rooms_component: detail_rooms_component
        }, () => {
            this._mapDetailRoomsToValues();
        })
    };
    handleDown = (index) => {
        var {detail_rooms_component} = this.state;
        const position = detail_rooms_component.map(item => item.position).indexOf(index);
        if (position < detail_rooms_component.length - 1) {
            var item = detail_rooms_component[position];
            detail_rooms_component[position] = detail_rooms_component[position + 1];
            detail_rooms_component[position + 1] = item;
        }
        this.setState({
            detail_rooms_component: detail_rooms_component
        }, () => {
            this._mapDetailRoomsToValues();
        })
    };

    handleChange = (event) => {
        this._isChanged(true);
        this.props.handleChange(event)
    };

    _isChanged = (status) => {
        this.setState({
            checkChange: status
        })
    };

    _saveToRedux = () => {
        var {checkChange} = this.state;
        var {propertyFields} = this.props;
        var {preTab} = propertyFields;
        if (checkChange && (preTab === 2 || preTab === "2")) {
            var {detail_rooms_values} = this.state;
            detail_rooms_values = {detail_rooms_values: detail_rooms_values};
            var data = this.props.values;
            data = Object.assign(data, detail_rooms_values);
            // console.log("DATA-SAVE===-> ",data);
            this.props.updateFieldsPropertyCharacterTab(data);
            this._isChanged(false);
            this.props.handleSubmit();
        }
    };

    render() {
        this._saveToRedux();
        const {
            // number_room,
            number_wc,
            number_bathroom,
            number_bedroom,
        } = this.props.values;
        const {propertyDatas} = this.props;
        const {room_type} = propertyDatas;
        const {detail_rooms_component, detail_rooms_values} = this.state;


        return (
            <div>

                <div className="card">
                    <div className="card-header">
                        <IntlMessages id="character.room.title.child"/>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {/*<div className="col-sm-3 col-md-3 col-lg-3">*/}
                                {/*<div className="row">*/}
                                    {/*<div className="col-sm-6 col-md-6 col-lg-6 obligateField">*/}
                                        {/*<span className="obligate">*</span><IntlMessages*/}
                                        {/*id="character.room.number_room"/>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-sm-4 col-md-4 col-lg-4">*/}
                                        {/*<div>*/}
                                            {/*<input type="number" className="form-control" min = {0} name="number_room"*/}
                                                   {/*value={number_room}*/}
                                                   {/*onChange={this.handleChange}*/}
                                                   {/*onBlur={this.props.handleBlur}*/}
                                            {/*/>*/}
                                        {/*</div>*/}

                                        {/*{this.props.touched.number_room &&*/}
                                        {/*<FormHelperText error={true}>{this.props.errors.number_room}</FormHelperText>}*/}


                                    {/*</div>*/}

                                {/*</div>*/}
                            {/*</div>*/}
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <div className="row">
                                    <div className="col-sm-6 col-md-6 col-lg-6 obligateField">
                                        <span className="obligate">*</span><IntlMessages
                                        id="character.room.number_bedroom"/>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div>
                                            <input type="number" className="form-control" min = {0} name="number_bedroom"
                                                   value={number_bedroom}
                                                   onChange={this.handleChange}
                                                   onBlur={this.props.handleBlur}
                                            />
                                        </div>
                                        {this.props.touched.number_bedroom && <FormHelperText
                                            error={true}>{this.props.errors.number_bedroom}</FormHelperText>}
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <div className="row">
                                    <div className="col-sm-6 col-md-6 col-lg-6 obligateField">
                                        <span className="obligate">*</span><IntlMessages
                                        id="character.room.number_bathroom"/>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div>
                                            <input type="number" className="form-control" min = {0} name="number_bathroom"
                                                   value={number_bathroom}
                                                   onChange={this.handleChange}/>
                                        </div>
                                        {this.props.touched.number_bathroom && <FormHelperText
                                            error={true}>{this.props.errors.number_bathroom}</FormHelperText>}
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <div className="row">
                                    <div className="col-sm-6 col-md-6 col-lg-6 obligateField">
                                        <span className="obligate">*</span><IntlMessages id="character.room.number_wc"/>
                                    </div>
                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                        <div>
                                            <input type="number" className="form-control" min = {0} name="number_wc"
                                                   value={number_wc}
                                                   onChange={this.handleChange}/>
                                        </div>
                                        {this.props.touched.number_wc &&
                                        <FormHelperText error={true}>{this.props.errors.number_wc}</FormHelperText>}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-sm-3 col-md-3 col-lg-3"><IntlMessages id="character.room.type"/></div>
                            <div className="col-sm-3 col-md-3 col-lg-3"><IntlMessages id="character.room.dimension"/>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3"><IntlMessages id="character.room.description"/>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <button className="btn btn-primary" onClick={() => this.addDetailRoom(room_type)}>
                                    <IntlMessages id="character.room.detail.add"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="detail_room" className="card-body">
                        {this.renderListRoomsDetail()}
                    </div>


                </div>
            </div>
        )
    }
}

const FormikForm = withFormik({
    mapPropsToValues(props) { // Init form field
        var {propertyDetail} = props;
        if(propertyDetail && propertyDetail.property.id){
            var character_values = propertyDetail.character[0];
            return {
                // number_room: character_values.number_room || '',
                number_wc: character_values.number_wc || '',
                number_bathroom: character_values.number_bathroom || '',
                number_bedroom: character_values.number_bedroom || '',
            }
        }
        return {
            // number_room: '',
            number_wc: '',
            number_bathroom: '',
            number_bedroom: '',
        }
    },
    validationSchema: Yup.object().shape({ // Validate form field

        // number_room: Yup.string()
        //     .required((<IntlMessages id='field.required'/>)),
        number_wc: Yup.string()
            .required((<IntlMessages id='field.required'/>)),
        number_bathroom: Yup.string()
            .required((<IntlMessages id='field.required'/>)),
        number_bedroom: Yup.string()
            .required((<IntlMessages id='field.required'/>)),

    }),
    handleSubmit(values, { props, setSubmitting, resetForm }) {

    },
})(PropertyCharacterDescription);
const mapStateToProps = (state) => {
    return {
        propertyDatas: state.propertyDatas,
        propertyFields: state.propertyFields
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        getListRoomTypes: () => {
            return dispatch(getListRoomTypes())
        },
        getListParentFacility: () => {
            return dispatch(getListParentFacility())
        },
        updateFieldsPropertyCharacterTab: (fields) => {
            dispatch(updateFieldsPropertyCharacterTab(fields))
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm);