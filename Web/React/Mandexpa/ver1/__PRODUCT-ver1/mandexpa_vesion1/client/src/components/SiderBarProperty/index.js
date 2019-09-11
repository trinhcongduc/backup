import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {updateFieldsPropertyMainTab, updateFieldsPropertyReorderTab} from "Actions";
import {getAllCountry} from 'Actions/CountryActions';


import TabDescription from './TabDescription/index'
import {Tabs, Tab} from 'react-bootstrap';
import IntlMessages from "Util/IntlMessages";
import TabDetails from "./TabDetails";
import Makerting from "./TabMarketing"
import MainPropertyLayout from './MainTabPropertyComponent/index';
import DialogProperty from './DialogLayout/DialogProperty';
import TabMedia from './TabMedia/index';
import TabOverview from "Components/SiderBarProperty/TabOverview";
import TabReOrder from "Components/SiderBarProperty/TabReOrder";
import MainTabDetail from "Components/SiderBarProperty/DetailProperty/MainTabDetail";
import TabDetail from "Components/SiderBarProperty/DetailProperty/TabDetail";
import TabDescriptionDetail from "Components/SiderBarProperty/DetailProperty/TabDescriptionDetail";
import TabMediaDetail from "Components/SiderBarProperty/DetailProperty/MediaDetail";
import TabMarketingDetail from "Components/SiderBarProperty/DetailProperty/TabMarketingDetail";
import TabReOrderDetail from "Components/SiderBarProperty/DetailProperty/TabReOrderDetail/index";
import {getAccountCurrent} from "Helpers/helpers";
import {saveKeyTabProperty, createProperty, clearDataProperty, FieldRequiredInTab,updateProperty} from "Actions";
import {types_confirm_collaberate} from "Constants/ComponentConfigs/PropertyConfig";
import {ACCOUNT_TYPE} from "Constants/GeneralConfig"
const currentAccount = getAccountCurrent();

const image_gif = require('./../../assets/img/gif/original.gif');
const loadingStyle = {
    fontSize:'20px',
    fontWeight:'600',
    color:'#684D9B'
};

class PropertyForm extends Component {
    constructor(props) {
        super(props);
        let propertyDetail = this.props.propertyDetail;
        let {process_tab} = this.props.propertyFields;
        this.state = {
            accountCurrent: null,
            value: 0,
            openDialog: true,
            countries: [],
            key: propertyDetail ? 0 : process_tab,
            // key: 7,
            hasChangeTab:true,
            propertyFields: {id: null},
            propertyData: false,
            loading : false,
            action_copy : false,
            checkTabReorder : false,
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
        let {propertyDetail} = this.props;
        this.props.getAllCountry();
        this.props.clearDataProperty();
        this.setState({
            accountCurrent: getAccountCurrent()
        });
        if(propertyDetail && propertyDetail.reorder && propertyDetail.reorder.id){
            let check = propertyDetail.reorder && propertyDetail.reorder.id;
            let confirm_collaberate = propertyDetail.reorder.confirm_collaberate;
            this.setState({
                key : check? (confirm_collaberate ===  types_confirm_collaberate.vadidate_by_seller ? 1 : 7):this.state.key,
                checkTabReorder:check
            })

        }


    }

    // componentWillReceiveProps(nextProps){
    //     let {propertyDetail} = nextProps;

        // if(propertyDetail && propertyDetail.reorder && propertyDetail.reorder.id){
        //     let check = propertyDetail.reorder && propertyDetail.reorder.id;
        //     this.setState({
        //         key : check? 7:this.state.key,
        //         checkTabReorder:check
        //     })
        //
        // }
    // }

    // event change tab
    changeTab = (tab_number,isReorder )=>{
        let {propertyDetail} = this.props ;
        if(propertyDetail && propertyDetail.property.id){
            if(tab_number === 7){
                this.setState({
                    key : tab_number,
                    checkTabReorder : true,
                    // hasChangeTab : false,
                })
            }else{
                this.setState({
                    key : tab_number,
                    checkTabReorder : false,
                    // hasChangeTab : false,
                })
            }

        }
    };

    // function close loading
    loadingStatus = (status) =>{
        if(status === undefined){
            status =  !this.state.loading;
        }
        this.setState({loading:status});
    };


    // event change tab
    handleSelect(key) {
        let prekey = this.state.key;
        let {hasChangeTab} = this.state;
        this.props.saveKeyTabProperty({preTab: prekey});
        if(hasChangeTab){
            this.setState({key});
        }

    }

    // back to before screen when you not want to edit
    handleCancelEdit = () => {
        this.props.clearDataProperty();
        this.props.history.goBack();
    };

    // save property
    handleSave = () => {
        let prekey = this.state.key;
        let {propertyFields,propertyDetail} = this.props;
        this.props.saveKeyTabProperty({preTab: prekey, readySubmit: true}, propertyFields).then((resolve) => {
            let check_validate = this.validateFieldList(propertyFields);
            // console.log("check validate==->",check_validate);
            if(check_validate.length && propertyDetail === undefined){
            // if(false){
                if( check_validate.indexOf('image_uploading') > -1){
                    alert("Veuillez patienter jusqu'à ce que votre image soit téléchargée avec succès!")
                    this.setState({
                        key:5,
                    });
                }
                else if( check_validate.indexOf('document_des_uploading') > -1 || check_validate.indexOf('document_uploading') > -1){
                    alert("Veuillez patienter jusqu'à ce que votre document soit chargé avec succès!")
                    this.setState({
                        key:check_validate.indexOf('document_des_uploading') > -1?1:5,
                    });
                }
                else{
                    this.setState({
                        key:check_validate[0],
                    });
                    let tab_missing=[];

                    if( check_validate.indexOf(1) > -1){
                        tab_missing.push('Tab Principal');
                    }
                    if( check_validate.indexOf(2) > -1){
                        tab_missing.push('Tab Detail');
                    }
                    if( check_validate.indexOf(3) > -1){
                        tab_missing.push('Tab Descriptif');
                    }
                    if( check_validate.indexOf(5) > -1){
                        tab_missing.push('Tab Media');
                    }
                    if( check_validate.indexOf(6) > -1){
                        tab_missing.push('Tab Marketing');
                    }
                    alert("Vous avez oublié certains champs obligatoires dans les onglets :\n"+tab_missing.join(' \n '));
                }

            }else{
                this.setState({propertyData: true,loading:true});
            }
        })
    };


    // save and copy property
    handleSaveandCopy = () =>{
        this.setState({
            action_copy:true
        },()=>{
            this.handleSave();
        })
    };

    validateFieldList = propertyFields =>{
        // console.log("DATA VALIDATE==->",propertyFields);
        let tab_check = [];
        const {host_1} = propertyFields;
        const {
            status_mandate, type_property,sub_type_property, startDate, endDate, number_pay, number_charge,
            total_commission_inclusive,commission_seller, commission_buyer,type_construction,
            date_avai, year_construction, number_floors, living_space, total_area, park_place,number_floors_building,
            energy_efficiency,total_area_building,park_inside,park_outdoor,
            outdoor_space
        } = propertyFields.main_fields;
        const {
            street_name, temperature, town, postal_code, sector
        } = propertyFields.location_fields;
        const {title_des, des_pro} = propertyFields.des_fields;
        const { number_wc, number_bathroom, number_bedroom,facilityDetails} = propertyFields.character_fields;
        const {
            at_home, immotop, wortimmo, luxbazard, immo_lu, editus_lu,
            editus_home, luxembourg_wort, distribution_flyers, vitrine_agences,agency_file
        } = propertyFields.marketing_fields;

        const {images,status_upload} = propertyFields.media_fields;
        const {status_document_upload,status_document_des_upload} = propertyFields.document_fields;

        if (
            status_mandate === "" || typeof status_mandate === "undefined" ||
            startDate === "" || typeof startDate === "undefined" ||
            endDate === "" || typeof endDate === "undefined" ||
            number_pay === "" || typeof number_pay === "undefined" ||
            // number_charge === "" || typeof number_charge === "undefined" ||
            total_commission_inclusive === "" || typeof total_commission_inclusive === "undefined" ||
            commission_buyer === "" || typeof commission_buyer === "undefined" ||
            commission_seller === "" || typeof commission_seller === "undefined" ||
            (host_1.id === "" && currentAccount.type !== ACCOUNT_TYPE.PROMOTER) ||
            street_name === "" || typeof street_name === "undefined" ||
            temperature === "" || typeof temperature === "undefined" ||
            town === "" || typeof town === "undefined" ||
            postal_code === "" || typeof postal_code === "undefined" ||
            sector === "" || typeof sector === "undefined"
        ) {
            tab_check.push(1);
        }

        if (
            type_property === "" || typeof type_property === "undefined" ||
            // sub_type_property === "" || typeof sub_type_property === "undefined" ||
            type_construction === "" || typeof type_construction === "undefined" ||
            year_construction === "" || typeof year_construction === "undefined" ||
            date_avai === "" || typeof date_avai === "undefined" ||
            number_floors === "" || typeof number_floors === "undefined" ||
            living_space === "" || typeof living_space === "undefined" ||
            total_area_building === "" || typeof total_area_building === "undefined" ||
            park_inside === "" || typeof park_inside === "undefined" ||
            total_area === "" || typeof total_area === "undefined" ||
            park_outdoor === "" || typeof park_outdoor === "undefined" ||
            outdoor_space === "" || typeof outdoor_space === "undefined" ||
            // park_place === "" || typeof park_place === "undefined" ||
            energy_efficiency === "" || typeof energy_efficiency === "undefined"  ||
            // certificate_date === "" || typeof certificate_date === "undefined"
            number_wc === "" || typeof number_wc === "undefined" ||
            number_bathroom === "" || typeof number_bathroom === "undefined" ||
            number_floors_building === "" || typeof number_floors_building === "undefined" ||
            // facilityDetails === "" || typeof facilityDetails === "undefined" ||
            number_bedroom === "" || typeof number_bedroom === "undefined"
        ) {
            tab_check.push(2);
        }

        if (
            title_des === "" || typeof title_des === "undefined" ||
            des_pro === "" || typeof des_pro === "undefined"
        ) {
            tab_check.push(3);
        }

        if (
            !images.length || typeof images === "undefined"
        ) {
            tab_check.push(5);
        }

        if (
            at_home === "" || typeof at_home === "undefined" ||
            wortimmo === "" || typeof wortimmo === "undefined" ||
            immotop === "" || typeof immotop === "undefined" ||
            luxbazard === "" || typeof luxbazard === "undefined" ||
            immo_lu === "" || typeof immo_lu === "undefined" ||
            editus_lu === "" || typeof editus_lu === "undefined" ||
            editus_home === "" || typeof editus_home === "undefined" ||
            luxembourg_wort === "" || typeof luxembourg_wort === "undefined" ||
            distribution_flyers === "" || typeof distribution_flyers === "undefined" ||
            agency_file === "" || typeof agency_file === "undefined" ||
            vitrine_agences === "" || typeof vitrine_agences === "undefined"
        ) {
            tab_check.push(6);
        }

        if(!status_upload){
            tab_check.push('image_uploading')
        }
        // console.log("status_document_upload========>",status_document_upload);
        if(!status_document_upload && status_document_upload !== undefined){
            tab_check.push('document_uploading')
        }
        if(!status_document_des_upload && status_document_des_upload !== undefined){
            tab_check.push('document_des_uploading')
        }
        return tab_check;

    };

    render() {
        let user_id = getAccountCurrent().id;
        let {propertyDetail} = this.props ;
        let {checkTabReorder} = this.state ;
        let status_mandate = typeof propertyDetail !=="undefined"  ? propertyDetail.property.status_mandate:'';
        let created_by = this.props.propertyDetail?this.props.propertyDetail.property.created_by:getAccountCurrent().id;
        let confirm_collaberate = this.props.propertyDetail?(this.props.propertyDetail.reorder?this.props.propertyDetail.reorder.confirm_collaberate:""):"";
        if (this.state.propertyData) {
            if (this.props.propertyDetail && user_id === created_by) {
                console.log("ACTION_______UPDATE______PROPERTY");
                this.props.propertyFields.id = this.props.propertyDetail.property.id;
                this.props.updateProperty(Object.assign(this.props.propertyFields, {action_copy: this.state.action_copy}))
                    .then(() => {
                        this.props.history.push('/app/dashboard/property/list');
                        this.props.clearDataProperty();
                    }).catch(err => {
                        console.log("ERROR====-->", err);
                        this.loadingStatus(false);
                    });

            } else {
                this.props.createNewProperty(Object.assign(this.props.propertyFields, {action_copy: this.state.action_copy}))
                    .then(() => {
                        this.props.history.push('/app/dashboard/property/list');
                        this.props.clearDataProperty();
                    }).catch(err =>{
                    console.log("ERROR====-->", err);
                    this.loadingStatus(false);
                })
            }
            this.setState({propertyData: false});
        }

        return (

            <div style={{width:'100%'}}>
                {this.state.loading?
                    <div className=" text-center">
                        <img src={image_gif} alt="Loading..."/><br/>
                        <div style={loadingStyle}>
                            <IntlMessages  id="property.loading" />
                        </div>

                    </div>:
            <div>
                {this.props.propertyDetail ? "" : <DialogProperty/>}


                {this.props.propertyDetail && user_id !== created_by ?
                    <div className="tabParentStyle">
                        <Tabs
                            activeKey={this.state.key}
                            onSelect={this.handleSelect}
                            id="controlled-tab-example"
                            className="tabParent"
                        >
                            <Tab eventKey={0} title={<IntlMessages id="property.tab.overview"/>}
                                     tabClassName="titleProperty">
                                    <div className="contentProperty">
                                        <TabOverview key={0} propertyDetail={this.props.propertyDetail}/>
                                    </div>
                                </Tab>
                            <Tab eventKey={1} title={<IntlMessages id="property.tab.principal"/>}
                                 tabClassName="titleProperty">
                                <div className="contentProperty">
                                    <MainTabDetail key={1}
                                                   propertyDetail={this.props.propertyDetail}
                                                   changeTab={this.changeTab}
                                    />
                                </div>
                            </Tab>
                            <Tab eventKey={2} title={<IntlMessages id="property.tab.details"/>}
                                 tabClassName="titleProperty">
                                <div className="contentProperty">
                                    <TabDetail key={2} propertyDetail={this.props.propertyDetail}/>
                                </div>
                            </Tab>
                            <Tab eventKey={3} title={<IntlMessages id="property.tab.description"/>}
                                 tabClassName="titleProperty">
                                <div className="contentProperty">
                                    <TabDescriptionDetail key={3} propertyDetail={this.props.propertyDetail}/>
                                </div>
                            </Tab>
                            <Tab eventKey={5} title={<IntlMessages id="property.tab.media" key={5}/>}
                                 tabClassName="titleProperty">
                                <div className="contentProperty">
                                    <TabMediaDetail propertyDetail={this.props.propertyDetail}/>
                                </div>
                            </Tab>

                            <Tab eventKey={6} title={<IntlMessages id="property.tab.marketing" key={6}/>}
                                 tabClassName="titleProperty">
                                <div className="contentProperty">
                                    <TabMarketingDetail propertyDetail={this.props.propertyDetail}/>
                                </div>
                            </Tab>
                            {
                                propertyDetail && propertyDetail.property.id  &&
                                (checkTabReorder ||
                                    propertyDetail.property.status_mandate === 'SOLD' ||
                                    propertyDetail.property.status_mandate === 'SOLD_SUCCESS' ||
                                    propertyDetail.property.status_mandate === 'NEGOTIATING'


                                ) &&
                                (
                                    <Tab  eventKey={7} title={<IntlMessages id="property.tab.reorder" key={7}/>}
                                          tabClassName="titleProperty">
                                        <div className="contentProperty">
                                            <TabReOrderDetail propertyDetail={this.props.propertyDetail}/>
                                        </div>
                                    </Tab>
                                )
                            }
                        </Tabs>
                    </div>
                    :
                    <div className="tabParentStyle">
                    <Tabs
                        activeKey={this.state.key}
                        onSelect={this.handleSelect}
                        id="controlled-tab-example"
                        className="tabParent"
                    >
                        {this.props.propertyDetail  ?
                            <Tab eventKey={0} title={<IntlMessages id="property.tab.overview"/>}
                                 tabClassName="titleProperty">
                                <div className="contentProperty">
                                    <TabOverview
                                        key={0}
                                        propertyDetail={this.props.propertyDetail}/>
                                </div>
                            </Tab> : ""}


                        <Tab eventKey={1} title={<IntlMessages id="property.tab.principal"/>}
                             tabClassName="titleProperty">
                            <div className="contentProperty">
                                <MainPropertyLayout
                                    key={1}
                                    propertyDetail={this.props.propertyDetail}
                                    changeTab={this.changeTab}/>
                            </div>
                        </Tab>


                            <Tab eventKey={2} title={<IntlMessages id="property.tab.details"/>}
                               tabClassName="titleProperty">
                            <div className="contentProperty">
                                <TabDetails
                                    key={2}
                                    propertyDetail={this.props.propertyDetail}/>
                            </div>
                        </Tab>


                            <Tab eventKey={3} title={<IntlMessages id="property.tab.description"/>}
                                 tabClassName="titleProperty">
                                <div className="contentProperty">
                                    <TabDescription
                                        key={3}
                                        propertyDetail={this.props.propertyDetail}/>
                                </div>
                            </Tab>


                            <Tab eventKey={5} title={<IntlMessages id="property.tab.media" key={5}/>}
                                 tabClassName="titleProperty">
                                <div className="contentProperty">
                                    <TabMedia propertyDetail={this.props.propertyDetail}/>
                                </div>
                            </Tab>
                            <Tab eventKey={6} title={<IntlMessages id="property.tab.marketing" key={6}/>}
                                 tabClassName="titleProperty">
                                <div className="contentProperty">
                                    <Makerting propertyDetail={this.props.propertyDetail}/>
                                </div>
                            </Tab>

                        {
                            propertyDetail && propertyDetail.property.id  &&
                            (checkTabReorder ||
                                propertyDetail.property.status_mandate === 'SOLD' ||
                                propertyDetail.property.status_mandate === 'SOLD_SUCCESS' ||
                                propertyDetail.property.status_mandate === 'NEGOTIATING'


                            ) &&
                            (
                                <Tab  eventKey={7} title={<IntlMessages id="property.tab.reorder" key={7}/>}
                                     tabClassName="titleProperty">
                                    <div className="contentProperty">
                                        {confirm_collaberate === types_confirm_collaberate.vadidate_by_seller?
                                            <TabReOrderDetail propertyDetail={this.props.propertyDetail}/>
                                            :
                                            <TabReOrder propertyDetail={this.props.propertyDetail} changeTab={this.changeTab}/>}

                                    </div>
                                </Tab>
                            )
                        }

                    </Tabs>
                </div>}
                {
                    (user_id === created_by)?
                        <div className="row pd20px" style={{marginBottom: '5%'}}>
                            <div className="col-sm-3  col-md-3 col-lg-3">

                                <button className="btn btn-secondary" onClick={this.handleCancelEdit}>
                                    <IntlMessages id="property.cancel_edit"/>
                                </button>

                            </div>

                            {/*Hidden when this property is cancelled*/}
                            {status_mandate !== 'CANCELLED' &&
                            (<div className="col-sm-3  col-md-3 col-lg-3">
                                <button className="btn btn-primary" onClick={this.handleSave}>
                                    <IntlMessages id="property.save"/>
                                </button>
                            </div>)}

                            {status_mandate !== 'CANCELLED' && !checkTabReorder &&
                            (<div className="col-sm-3  col-md-3 col-lg-3">
                                <button className="btn btn-primary" onClick={this.handleSaveandCopy}>
                                {/*<button className="btn btn-primary" onClick={this.handleSave}>*/}
                                    <IntlMessages id="property.save&copy"/>
                                </button>
                            </div>)}

                        </div>:""
                }
            </div>}
            </div>
        );
    }
}


const mapStateToProp = (state) => {
    return ({
        propertyDatas: state.propertyDatas,
        countries: state.country,
        propertyFields: state.propertyFields,
        currentAccount: state.authLogin
    })
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateFieldsPropertyMainTab: (field) => {
            return dispatch(updateFieldsPropertyMainTab(field))
        },
        getAllCountry: () => {
            return dispatch(getAllCountry());
        },
        saveKeyTabProperty: (keys, resolve) => {
            return dispatch(saveKeyTabProperty(keys, resolve))
        },
        createNewProperty: (data) => {
            return dispatch(createProperty(data))
        },
        updateProperty: (data) => {
            return dispatch(updateProperty(data))
        },
        clearDataProperty: () => {
            return dispatch(clearDataProperty());
        },
        FieldRequiredInTab: (tab) => {
            return dispatch(FieldRequiredInTab(tab));
        },
    }
};

export default connect(mapStateToProp, mapDispatchToProps)(withRouter(PropertyForm));
