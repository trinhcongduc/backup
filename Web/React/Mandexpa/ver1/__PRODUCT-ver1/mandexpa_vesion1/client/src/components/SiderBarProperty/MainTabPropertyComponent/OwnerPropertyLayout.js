/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import {connect} from "react-redux";
import OwnerInput from './OwnerInput';
import IntlMessages from "Util/IntlMessages";
import {detailHost} from "Actions";


class OwnerPropertyLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle:false,
        }
    }
    handleToggle=()=>{
        this.setState({
            toggle:!this.state.toggle
        })
    };

    componentWillMount() {
        if(typeof this.props.propertyDetail != "undefined"){
            var host_1 = JSON.parse(this.props.propertyDetail.property.host_1)
            var host_2 = JSON.parse(this.props.propertyDetail.property.host_2)
            var host_3 = JSON.parse(this.props.propertyDetail.property.host_3)
            this.props.detailHost(host_1,host_2,host_3);
        }
    }
    componentWillReceiveProps  = (nextProps) => {
        if(nextProps.propertyDetail!== this.props.propertyDetail){
            const {propertyDetail} =  nextProps;
            var host_1 = JSON.parse(propertyDetail.property.host_1)
            var host_2 = JSON.parse(propertyDetail.property.host_2)
            var host_3 = JSON.parse(propertyDetail.property.host_3)
            this.props.detailHost(host_1,host_2,host_3);
        }
    }

    render(){
        const {toggle}= this.state;
        return(
            <div className="card">
                <div className="card-header">
                    <IntlMessages id="property.main.host.title"/>

                </div>
                <div className="card-body ">
                    <div className="">
                        <span className="obligate">*</span> <IntlMessages id="property.main.host.owner"/>
                        <OwnerInput   name="host_1" valueInput={this.props.propertyFields.host_1.name}/>
                    </div>
                    {/*<div className="">*/}
                        {/*/!* <Button  variant="contained" onClick={this.handleToggle}>*/}
                            {/*<IntlMessages id="property.main.host.plus"/>*/}
                        {/*</Button> *!/*/}
                        {/*{toggle&&(*/}
                            {/*<div className="row">*/}
                                {/*<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">*/}
                                    {/*<div className="obligateField"><span className="obligate">*</span> <OwnerInput title="Autre propriétaire" name="host_2" valueInput={this.props.propertyFields.host_2.name}/></div>*/}
                                {/*</div>*/}
                                {/*<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">*/}
                                    {/*<div className="obligateField"><span className="obligate">*</span><OwnerInput title="Autre propriétaire" name="host_3" valueInput={this.props.propertyFields.host_3.name} /></div>*/}
                                {/*</div>*/}

                            {/*</div>)*/}
                        {/*}*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}
const mapStatetoProps = (state)=>{
    return ({
        propertyFields: state.propertyFields
    })
};
const mapDispatchToProp = (dispatch, props) => {
    return {
        detailHost: (host_1,host_2,host_3) => {
            dispatch(detailHost(host_1,host_2,host_3))
        }
    }
};
export default connect(mapStatetoProps,mapDispatchToProp)(OwnerPropertyLayout);
