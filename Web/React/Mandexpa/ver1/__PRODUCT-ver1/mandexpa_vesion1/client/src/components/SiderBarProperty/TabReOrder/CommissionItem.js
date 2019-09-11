import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {withFormik} from "formik";
import {connect} from "react-redux";
import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import IntlMessages from "Util/IntlMessages";

class CommissionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadCom:true
        }
    }

    _isChanged = (status) => {
        this.setState({
            checkChange: status
        })
    };
    componentDidMount(){
        this.updateParentValue();
    }

    removeItem = () => {
        this.props.remove(this.props.position)
    };


    onChangeAgency = (value) => {
        let old_value = this.props.values.agency_id;
        this.props.values.agency_id = value;
        this.props.values.agency_old_id = old_value;
        this.updateParentValue(true);
    };

    updateParentValue = (isChange) =>{
        if(isChange === undefined){
            isChange =  false
        }
        this.setState({
            loadCom:!this.state.loadCom
        },()=>{
            let {agency_id,agency_old_id,amount,percent} = this.props.values;
            this.props.onChange({
                select_item:{value:agency_id,old_value:agency_old_id},
                amount: amount,
                isChange:isChange,
                percent: percent
            })
        })
    };

    handleChange = (event) =>{
        this.props.handleChange(event);
        this.setState({
            loadCom:!this.state.loadCom
        },()=>{
            this.updateParentValue(true);
        })
    };




    render() {
        const {listOption,select_disable,select_value,isDisabled} = this.props;
        const {agency_id, amount, percent} = this.props.values;
        return (
            <div className="row  form-group">
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>{this.props.select_text}</label>
                        {
                            !select_disable?
                                (
                                    <SelectAutoComplete
                                        name='agency_id'
                                        value={agency_id}
                                        onChange={this.onChangeAgency}
                                        listOption={listOption || []}
                                        isClearable={true}
                                        isDisabled={isDisabled}
                                    />
                                ):(
                                    <input className="form-control" value={select_value} readOnly={true} name='agency_id'/>
                                )
                        }
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label> <IntlMessages id="property.reorder.commission.amount"/></label>
                        {isDisabled?
                            <input
                                type="number"
                                className="form-control"
                                name="amount"
                                value={amount}
                                onChange={this.handleChange}
                                readOnly
                            />:
                            <input
                                type="number"
                                className="form-control"
                                name="amount"
                                value={amount}
                                onChange={this.handleChange}
                            />}
                    </div>

                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label><IntlMessages id="property.reorder.commission.percent"/> </label>
                        <div className="input-group">
                            {isDisabled?
                                <input
                                    type="number"
                                    className="form-control"
                                    name="percent"
                                    value={percent}
                                    onChange={this.handleChange}
                                    readOnly
                                />
                                :
                                <input
                                    type="number"
                                    className="form-control"
                                    name="percent"
                                    value={percent}
                                    onChange={this.handleChange}
                                />}

                            <div className="input-group-append">
                            <span className="input-group-text">
                                <IntlMessages id="property.reorder.commission.percent"/>
                            </span>
                            </div>
                        </div>
                    </div>


                </div>
                {
                    this.props.remove ?
                    (<div className="col-sm-1">
                        <i className="zmdi zmdi-delete zmdi-hc-2x" onClick={this.removeItem}> </i>
                    </div>):""
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {}
};

const FormikForm = withFormik({

    mapPropsToValues(datas) { // Init form field
        let {value}= datas;
        let {number_pay} =datas;
        let percent = "";
        let amount = "";
        if(number_pay){
            number_pay =  parseInt(number_pay)
        }else{
            number_pay = 0;
        }
        if(value){
            return {
                agency_id: value.agency_id | "",
                agency_old_id: value.agency_old_id | "",
                amount: value.amount !== undefined  ?value.amount:number_pay *parseInt(value.percent)/100 ,
                percent: value.percent || "",
            }
        }

        return {
            agency_id: "",
            agency_old_id: "",
            amount: amount,
            percent: percent
        }
    },
    enableReinitialize: true

})(CommissionItem);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormikForm));