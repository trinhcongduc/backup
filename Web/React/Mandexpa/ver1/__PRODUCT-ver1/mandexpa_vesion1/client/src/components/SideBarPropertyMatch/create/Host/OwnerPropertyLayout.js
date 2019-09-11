/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import {connect} from "react-redux";
import OwnerInput from './OwnerInput';



class OwnerPropertyLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle:false,
        }
    }

    get_child_data=(data)=>{
        this.props.parent_get_data(data);
    }

    render(){
        const {toggle}= this.state;
        return(
            <div className="card">
                <div className="card-header obligateField"><span className="obligate">*</span>
                Informations du contact
                </div>
                <div className="card-body ">
                    <div className="">
                        {/*<span className="obligate">*</span>*/}
                        <OwnerInput parent_get_data={this.get_child_data}/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStatetoProps = (state)=>{
    return ({
        propertyMatchesDetail: state.property_matches.property_matches_edit
    })
};
const mapDispatchToProp = (dispatch, props) => {
    return {
    }
};
export default connect(mapStatetoProps,mapDispatchToProp)(OwnerPropertyLayout);
