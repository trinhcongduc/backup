import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactDetail from "./ContactDetail";




class MainContactDetailLayout extends Component {
    render(){
        return(
            <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="row">
                    <div className="col-xs-10 col-md-10 col-sm-10 col-lg-10">
                        <ContactDetail/>
                    </div>
                </div>
            </div>
        )
    }

}

// map state to props
const mapStateToProps = ({ state }) => {
    return { };
};

export default connect(mapStateToProps)(MainContactDetailLayout);