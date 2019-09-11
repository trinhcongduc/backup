import {Component} from "react";
import Select from "@material-ui/core/Select/Select";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import IntlMessages from "Util/IntlMessages";
import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import {getListAccountByConditions} from "Actions";
import connect from "react-redux/es/connect/connect";
import {GET_AGENCYS} from "Actions/types";
class SelectMarketing extends Component{

    componentDidMount(){
        const {agencys} = this.props;
        if(agencys.length < 1) {
            this.props.getListAccountByConditions({type: "agency"},null, GET_AGENCYS)
        }
    }

    render(){
        let {agencys}= this.props;
        return(
            <div>
            <Select
                className="form-control"
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange}
                onBlur={this.props.onBlur}
                displayEmpty
            >
                <MenuItem value="" disabled>
                    {<IntlMessages id="property.marketing.select" />}
                </MenuItem>
                <MenuItem value={"1"}>{<IntlMessages id="property.marketing.select.1" />}</MenuItem>
                <MenuItem value={"2"}>{<IntlMessages id="property.marketing.select.2" />}</MenuItem>
                <MenuItem value={"3"}>{<IntlMessages id="property.marketing.select.3" />}</MenuItem>
                <MenuItem value={"5"}>{<IntlMessages id="property.marketing.select.5" />}</MenuItem>
            </Select>
                {this.props.value==="1"||this.props.value==="2"||this.props.value==="5"?<input type="text"
                       className="form-control"
                       name={this.props.nameInput}
                       value={this.props.valueInput}
                       onChange={this.props.onChange}

                />:""}
                {this.props.value==="2"?<SelectAutoComplete name='agency_for_marketing'
                                                            value_props='id'
                                                            label_props='fullname'
                                                            value={this.props.valueAgency}
                                                            onChange={this.props.onChangeAgency}
                                                            listOption={agencys||[]}
                />:""}

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return ({
        propertyFields: state.propertyFields,
        agencys :state.accounts.agencys
    })
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        getListAccountByConditions:(conditions,pagination_cond,typeReducer)=>{
            return dispatch(getListAccountByConditions(conditions,pagination_cond,typeReducer))
        }

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(SelectMarketing);