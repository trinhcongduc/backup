import React, {Component} from 'react';
import { withRouter} from "react-router-dom";
import {withFormik} from "formik";
import {connect} from "react-redux";
import {confirmCollaberateByAgencyB, updateFieldsPropertyReorderTab} from "Actions";
import {types_confirm_collaberate} from "Constants/ComponentConfigs/PropertyConfig"
import Detail_Transaction from "./Detail_Transaction";
import Commission from "./Commission";
import { getAccountCurrent} from "Helpers";

class Tab_ReOrder extends Component {
    handleConfirm = () => {
        this.props.confirmCollaberateByAgencyB(this.props.propertyDetail.property.id).then(() => {
            this.props.history.push('/app/dashboard/property/list');
        }).catch(err => {
            this.props.history.push('/app/dashboard/property/list');
        })
    };
    render() {
        let user_id = getAccountCurrent().id;
        let check = false;
        let confirm_collaberate = this.props.propertyDetail.reorder.confirm_collaberate;
        if(user_id === this.props.propertyDetail.reorder.buyer_id){
            check = true;
        }
        return (
            <div>
                <Detail_Transaction   propertyDetail={this.props.propertyDetail}/><br/>
                <Commission    propertyDetail={this.props.propertyDetail} /><br/>
                {(check && confirm_collaberate === types_confirm_collaberate.request_by_seller)?<button className="confirm-b"  onClick={this.handleConfirm} >Confirmer la transaction</button>:""}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        propertyDatas: state.propertyDatas,
        propertyFields: state.propertyFields
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        confirmCollaberateByAgencyB: (id) => {
           return dispatch(confirmCollaberateByAgencyB(id))
        }
    }
};

const FormikForm = withFormik({

    mapPropsToValues(datas) { // Init form field
        return {

        }
    },
    enableReinitialize: true

})(Tab_ReOrder);

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FormikForm));