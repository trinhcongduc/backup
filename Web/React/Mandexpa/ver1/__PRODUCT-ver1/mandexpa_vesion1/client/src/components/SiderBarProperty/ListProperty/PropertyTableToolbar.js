import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import classNames from "classnames";
import {connect} from "react-redux";
import {withFormik} from "formik";
import Typography from "@material-ui/core/Typography/Typography";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
import SelectAutoComplete from "Components/ComponentHelper/SelectAutoComplete";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import React,{Component} from "react";
import IntlMessages from "Util/IntlMessages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {status_property} from "Constants/ComponentConfigs/PropertyConfig";
import {getListProperty} from "Actions";
const loading_icon = require('Assets/img/gif/loading-2.gif');

let action_search_enginer = null;

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    filter_addon:{
        margin: 'auto 0px'
    },
    property_number:{
        fontSize:'12px',
        color:'gray'
    },
    loading:{
        maxHeight:'40px'
    }
});


class PropertyTableToolbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false
        }
    }


    handleClick =()=>{
        this.props.onFilter();
    };

    handleChange = (event) =>{
        clearTimeout(action_search_enginer);
        this.setState({loading:true});
        const propertyReducer =  this.props;
        // search_value =  event.target.value;
        let filter = {};
        let pagination = {
            page:1,
            rowsPerPage:5,
            orderBy:'property.id',
            order:'asc',
        };
        if(propertyReducer !== undefined && propertyReducer.advanced_filter !== undefined){
            filter =  propertyReducer.advanced_filter;
        };
        if(propertyReducer !== undefined && propertyReducer.condition_listing !== undefined){
            pagination = propertyReducer.condition_listing;
        };
        filter = {...filter,search_engine:event.target.value};
        this.props.handleChange(event);
        action_search_enginer = setTimeout(()=>{
            this.props.getListProperty(filter,pagination).then(res=>{
                this.setState({loading:false})
            });
        },2000);
    };

    handleSelectChange = (value) =>{
        this.setState({loading:true});
        const propertyReducer =  this.props;
        let filter = {};
        let pagination = {
            page:1,
            rowsPerPage:5,
            orderBy:'property.id',
            order:'asc',
        };
        if(propertyReducer !== undefined && propertyReducer.advanced_filter !== undefined){
            filter =  propertyReducer.advanced_filter;
        };
        if(propertyReducer !== undefined && propertyReducer.condition_listing !== undefined){
            pagination = propertyReducer.condition_listing;
        };
        filter = {...filter,status_mandate:value};
        this.props.getListProperty(filter,pagination).then(res=>{
            this.setState({loading:false})
        });
    };


    render(){
        const {classes,counter_data} = this.props;
        const {loading} = this.state;
        const {search_engine} = this.props.values;
        return (
            <Toolbar
                className={classNames(classes.root,"row")}
            >
                <div className={classNames("col-xs-12 col-md-2")}>
                    <Typography className="p-2  d-flex" variant="h6" id="tableTitle">
                        <FontAwesomeIcon icon={['fas','home']} size="2x" />
                        <div className="d-flex flex-column">
                            <IntlMessages id="property.properties" />
                            <span className={classes.property_number}>{counter_data} property</span>
                        </div>



                    </Typography>
                </div>
                <SelectAutoComplete
                    name="property_filter_status"
                    onChange={this.handleSelectChange}
                    isClearable={true}
                    className="col-xs-6 offset-md-4 col-md-3"
                    value_props="value"
                    label_props="label"
                    listOption={status_property.sale}

                />
                <div className=" col-xs-6 col-md-3 ">
                    <div className="d-flex">
                        <div className={classNames("flex-grow-1",classes.filter_addon)}>
                            <input type="text"
                                   className="form-control"
                                   name="search_engine"
                                   value={search_engine}
                                   placeholder="Search property"
                                   onChange={this.handleChange}
                            />
                        </div>
                        <div className="bd-highlight" onClick={this.handleClick}>
                            <Tooltip title={(<IntlMessages id="filter.advance" />)}
                                     placement={'top-start'}
                            >
                                <IconButton>
                                    <FontAwesomeIcon icon={['fas','abacus']}/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        {   loading &&
                            (<div className="bd-highlight">
                                <img src={loading_icon}
                                     className={classes.loading}
                                     alt="Loading..."/>
                            </div>)
                        }
                    </div>
                </div>
            </Toolbar>
        );
    }
};

PropertyTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const FormikForm = withFormik({
    mapPropsToValues() {
        return {
            search_engine:""
        }
    },

})(PropertyTableToolbar);

const mapStatetoProps = (state) =>{
    return {
        propertyReducer: state.propertyDatas
    }
};


const mapDispatchtoProps = (dispatch,props)=>{
    return{
        getListProperty:(filter,pagination)=>{
            return dispatch(getListProperty(filter,pagination))
        }
    }
};

export default  connect(mapStatetoProps,mapDispatchtoProps)(withStyles(toolbarStyles)(FormikForm));