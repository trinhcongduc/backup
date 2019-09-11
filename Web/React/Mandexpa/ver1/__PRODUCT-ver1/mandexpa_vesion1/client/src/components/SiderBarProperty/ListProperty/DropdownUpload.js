/**
 * Component  upgrade package for a subscriber
 */



import React, {Component} from 'react';
import IntlMessages from "Util/IntlMessages";
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getListProperty, UploadPropertyOfferDocument} from "Actions";
import classNames from "classnames";
import {URL_SERVER} from "Constants/GeneralConfig";
const loading_icon =  require("Assets/img/gif/loading-2.gif");

const styles = theme => ({
    Dropdownmenu:{
        border:"1px #614194 solid",
        minWidth: '15rem'
    },
    cursor:{
        cursor:'pointer'
    },
    d_none:{
        display:'none'
    },
    loading:{
        maxHeight:'40px'
    }
});

class DropdownUpload extends Component{
    constructor(props){
        super(props);
        this.state = {
            docVisitLoading:false,
            docPurchaseLoading:false,
        }
    }

    openVisitDoc = () =>{
        const {doc_visit} =  this.props.docs;
        window.open(URL_SERVER + doc_visit, '_blank');
    };
    openPurchaseDoc = () =>{
        const {doc_purchase} =  this.props.docs;
        window.open(URL_SERVER + doc_purchase, '_blank');
    };

    onToggle = () =>{
        this.props.onToggle(this.props.id);
    };

    _handleFileChange = (e) =>{
        const {id} = this.props;
        if(e.target.files[0]){
            let type = e.target.name === "docVisit"?"docVisitLoading":"docPurchaseLoading";
            let loading = {};
            let name = e.target.name;
            let file = e.target.files[0];
            loading[type] = true;
            this.setState(loading,()=>{
                this.props.UploadPropertyOfferDocument(id,name,file).then(res=>{
                    loading[type] = false;
                    this.setState(loading,()=>{
                        let {properties} =  this.props;
                        let pagination = {
                            page:1,
                            rowsPerPage:5,
                            orderBy:'property.id',
                            order:'asc'};
                        if(properties !== undefined && properties.condition_listing !== undefined){
                            pagination = properties.condition_listing
                        }
                        this.props.getListProperty(null,pagination).then(res=>{
                            console.log("resLIST-==>",res.data);
                        });
                    });
                });
            })
        }
    };


    render() {
        const {classes,open,docs} = this.props;
        const {docVisitLoading,docPurchaseLoading} = this.state;
        return (
            <div>
                <Dropdown
                    isOpen={open}
                    toggle={this.onToggle}
                >
                    <DropdownToggle  tag="div" caret>
                        <Tooltip
                            title={<IntlMessages id="upload" />}
                            placement={'top-start'}
                            enterDelay={100}
                        >
                            <FontAwesomeIcon icon={['far','ellipsis-v']}/>
                        </Tooltip>
                    </DropdownToggle>
                    <DropdownMenu className={classes.Dropdownmenu}>
                        <ul  className="list-unstyled mb-0">
                            <li className={classNames("p-2 flex-fill ",classes.cursor)}>
                                {
                                    docVisitLoading ?
                                        (
                                            <img src={loading_icon}
                                                 className={classes.loading}
                                                 alt="Loading..."
                                            />
                                        ):
                                        (
                                            <FontAwesomeIcon className="mr-2"
                                                             icon={['fas','upload']}
                                                             onClick={()=>this.docVisit.click()}
                                            />
                                        )
                                }
                                {
                                    docs.doc_visit && (
                                        <FontAwesomeIcon className="mr-2"
                                                         icon={['fas','eye']}
                                                         onClick={this.openVisitDoc}/>
                                    )
                                }
                                <IntlMessages id="property.upload.visit" />
                            </li>
                            <li className={classNames("p-2 flex-fill ",classes.cursor)}  >

                                {
                                    docPurchaseLoading ?
                                        (
                                            <img src={loading_icon}
                                                 className={classes.loading}
                                                 alt="Loading..."
                                            />
                                        ):
                                        (
                                            <FontAwesomeIcon className="mr-2"
                                                             icon={['fas','upload']}
                                                             onClick={()=>this.docPurchase.click()}
                                            />
                                        )
                                }
                                {
                                    docs.doc_purchase && (
                                        <FontAwesomeIcon className="mr-2"
                                                         icon={['fas','eye']}
                                                         onClick={this.openPurchaseDoc}
                                        />
                                    )
                                }
                                <IntlMessages id="property.upload.offer_purchase" />
                            </li>
                        </ul>
                    </DropdownMenu>
                    <input className={classes.d_none}
                           type="file"
                           ref={(docVisit) => {
                                this.docVisit = docVisit;
                            }}
                           name="docVisit"
                           onChange={this._handleFileChange}/>
                    <input className={classes.d_none}
                           type="file"
                           name="docPurchase"
                           ref={(docPurchase) => {
                                this.docPurchase = docPurchase;
                            }}
                           onChange={this._handleFileChange}/>
                </Dropdown>
            </div>

        )
    }
}

const mapStateToProps = (state)=>{
    return{
        subscribers : state.subscribers,
        subscriptions : state.subscriptions,
        properties : state.propertyDatas
    };
};

const mapDispatchtoProps = (dispatch,props)=>{
    return{
        UploadPropertyOfferDocument:(id,type,file)=>{
            return dispatch(UploadPropertyOfferDocument(id,type,file))
        },
        getListProperty:(filter,pagination)=>{
            return dispatch( getListProperty(filter,pagination))
        },
    }
};

export default connect(mapStateToProps,mapDispatchtoProps)(withStyles(styles)(DropdownUpload));