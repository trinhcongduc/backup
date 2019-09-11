import React, {Component} from 'react';
import {connect} from "react-redux";
import SelectAutoComplete from '../../ComponentHelper/SelectAutoComplete'
import IntlMessages from "../../../util/IntlMessages";
import {withFormik} from "formik";

class DetailParamRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }


    removeItem = () => {
        this.props.removeItem(this.props.position)
    };

    getValues = (value) => {
        this.setState({
            value: value
        })
    };
    handleUp = () => {
        this.props.Up(this.props.position);
    };
    handleDown = () => {
        this.props.Down(this.props.position);
    };
    handleChange = (event) => {
        event.id =  this.props.position;
        this.props.onChange(event);
        this.props.handleChange(event);
    };
    handleChangeSelect = (value) => {
        this.props.values.room_type =  value;
        this.props.onChange({target:{name:'room_type',value:value},id:this.props.position});
    };

    render() {
        const {
            description,
            room_type,
            dimension,
            acreage,
        } = this.props.values;
        const {listOption} = this.props;
        return (
            <div className="row">

                <div className="col-sm-3 col-md-3 col-lg-3">
                    <div className="row">
                        <div className="col-sm-2 col-md-2">
                            <i className="zmdi zmdi-long-arrow-up zmdi-hc-2x" onClick={this.handleUp}> </i>
                            <i className="zmdi zmdi-long-arrow-down zmdi-hc-2x" onClick={this.handleDown}> </i>
                        </div>
                        <div className="col-sm-10 col-md-10">
                            <SelectAutoComplete className="form-control"
                                                listOption={listOption}
                                                name="room_type"
                                                value={room_type}
                                                onChange={this.handleChangeSelect}/>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 col-md-2 col-lg-3">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <div className="row">
                                <div className="offset-sm-2 col-sm-8  offset-md-2 col-md-8 offset-lg-2  col-lg-8">
                                    <div>
                                        <input type="text" className="form-control" min="0" name="dimension" value={dimension}
                                               onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-sm-6 col-md-6 col-lg-6">
                            <div className="row">
                                <div className="offset-sm-2 col-sm-8  offset-md-2 col-md-8 offset-lg-2  col-lg-8">
                                    <div>
                                        <input type="number" className="form-control" min="0" name="acreage" value={acreage}
                                               onChange={this.handleChange}/>
                                    </div>
                                </div>

                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="col-sm-5 col-md-5 col-lg-5">
                    <div>
                        <input type="text" className="form-control" name="description" value={description}
                               onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="col-sm-1 col-md-1 col-lg-1">
                    <i className="zmdi zmdi-delete zmdi-hc-2x mdc-text-green " onClick={this.removeItem}
                       style={{cursor: "pointer"}}> </i>
                </div>
            </div>
        )
    }
}

const FormikForm = withFormik({
    mapPropsToValues(datas) {
        var {values} = datas;
        if(values){
            return {
                description: values.description ||'',
                dimension: values.dimension ||'',
                acreage: values.acreage ||'',
                room_type: values.room_type ||{},
            }
        }
        return {
            description: '',
            dimension: '',
            acreage: '',
            room_type: '',
        }
    },
    enableReinitialize: true,
})(DetailParamRoom);

const mapStateToProps = (state) => {
    return {}
};
const mapDispatchToProps = (dispatch, props) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm);