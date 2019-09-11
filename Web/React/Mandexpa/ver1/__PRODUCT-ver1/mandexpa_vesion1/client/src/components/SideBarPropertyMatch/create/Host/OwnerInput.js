/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react';
import {connect} from "react-redux";

import DialogHostProperty from "./DialogHostProperty";


class OwnerInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_name: ""
        }

    }
    get_child_data=(data)=>{
        this.setState({
            host_name: data.host_name?data.host_name:""
        })
        this.props.parent_get_data(data);
    }
    componentWillMount() {
        if(typeof this.props.propertyMatchesDetail != "undefined"){
            this.setState({
                host_name: this.props.propertyMatchesDetail.host_name?this.props.propertyMatchesDetail.host_name:""
            })
        }
    }
    componentWillReceiveProps  = (nextProps) => {
        if(nextProps.propertyMatchesDetail!== this.props.propertyMatchesDetail){
            const {propertyMatchesDetail} =  nextProps;
            this.setState({
                host_name: propertyMatchesDetail.host_name?propertyMatchesDetail.host_name:""
            })
        }
    }
    render() {
        var {title} = this.props;
        const divStyle = {
            cursor: 'pointer',
            color: '#614194',
        };
        return (
            <div className="form-group ">
                <label>{title}</label>
                <div className="row">
                    <div className="col-xs-3 col-sm-3 col-ms-3 col-lg-3 hostPropertyMatch">
                        <DialogHostProperty parent_get_data={this.get_child_data}/>
                     </div>
                    <div className="col-xs-9 col-sm-9 col-ms-9 col-lg-9 height40px">
                        <input type="text"
                               className="form-control"
                               name="host"
                               value={this.state.host_name}
                               placeholder="Nom du contact"
                               readOnly={true}
                        />
                    </div>


                </div>

            </div>
        )
    }
}
const mapStatetoProps = (state) => {
    return ({
        propertyMatchesDetail: state.property_matches.property_matches_edit
    })
};

export default connect(mapStatetoProps)(OwnerInput);
