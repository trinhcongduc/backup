import React, { Component } from 'react';
import { connect } from 'react-redux';
import InforContact from "./InforContact";
import {getAllCountry} from 'Actions/CountryActions';
import {withRouter} from "react-router-dom";




class MainContactLayout extends Component {

    componentWillMount(){
        this.props.getAllCountry();
    }
    render(){
        const {countries} = this.props;
        return(
            <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="row">
                    <div className="col-xs-10 col-md-10 col-sm-10 col-lg-10">
                        {countries.length?<InforContact countries={countries}/>:null}
                    </div>
                </div>
            </div>
        )
    }

}

// map state to props
const mapStateToProp = (state)=>{
    return({
        countries:state.country,
    })
};

const mapDispatchToProps = (dispatch, props)=>{
    return{
        getAllCountry:()=>{
            return dispatch(getAllCountry());
        }
    }
};
export default connect(mapStateToProp,mapDispatchToProps)(withRouter(MainContactLayout));