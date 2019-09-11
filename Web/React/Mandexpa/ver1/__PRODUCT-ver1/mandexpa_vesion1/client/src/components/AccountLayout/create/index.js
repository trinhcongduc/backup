/**
 * App.js Layout Start Here
 */

'use strict'
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withFormik} from "formik";
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import classNames from "classnames";
import reactCSS from 'reactcss'
import {SketchPicker} from 'react-color'
import Button from "@material-ui/core/es/Button/Button";
import Select from "@material-ui/core/Select/Select";
import MenuItem from '@material-ui/core/MenuItem';
import ImageUpload from "Components/ComponentHelper/ImageUpload"
import {
    createAccount,
    updateAccount,
    checkNumberAccountChild,
    UploadImage
} from '../../../actions';
import {URL_SERVER} from 'Constants/GeneralConfig';
import IntlMessages from "../../../util/IntlMessages";
import {ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import {renderSelectIndex, getAccountCurrent} from 'Helpers/helpers'
import Avatar from 'react-avatar-edit';
import {NotificationManager} from 'react-notifications';
import {ACCOUNT_TYPE} from 'Constants/GeneralConfig';
import * as Yup from "yup";


const stylesUI = () => ({
    licenses:{
        fontSize:'12px'
    },
    input_mark:{
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor:'white'

    },
    input_mark_text:{
        padding: '10px 10px 7px 10px',
        margin:'0px'
    }
});


class CreateUserLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            type_accounts: null,
            accountCurrent: null,
            displayColorPicker: false,
            color: {
                r: '241',
                g: '112',
                b: '12',
                a: '5',
            },
            preview: null,
            src: '',
            logo_change: false,
            submitted: false,
            image_agency:null,
            logo:null
        }
    };

    renderAccountType = (datas) => {
        let result = null;
        if (datas !== null && datas.length > 0) {
            result = datas.map((data, index) => {
                if (data.status) {
                    return (<MenuItem value={data.type} key={index}><IntlMessages id={data.title}/></MenuItem>)
                }
            })
        }

        return result;

    };

    componentWillMount() {
        this.setState({
            accountCurrent: getAccountCurrent()
        }, () => {
            let {accountCurrent} = this.state;
            this.setState({
                type_accounts: [
                    {
                        type: "promoter",
                        title: "account.type.promoter",
                        status: accountCurrent.type === ACCOUNT_TYPE.ADMIN
                    },
                    {
                        type: "agency",
                        title: "account.type.agency",
                        status: accountCurrent.type === ACCOUNT_TYPE.ADMIN
                    },
                    {
                        type: "staff",
                        title: "account.type.staff",
                        status: accountCurrent.type === ACCOUNT_TYPE.PROMOTER || accountCurrent.type === ACCOUNT_TYPE.AGENCY
                    }
                ],
            }, () => {
                let redirect = this.props.history;
                let {inforAccount} = this.props;

                if ((accountCurrent.type !== "admin") && typeof inforAccount === "undefined") {
                    this.props.checkNumberAccountChild()
                        .catch(err => {
                            redirect.push("/app/dashboard");
                            NotificationManager.error("Impossible de créer plus de compte!");
                        })
                }
            })
        });

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.inforAccount && this.props.inforAccount !== nextProps.inforAccount) {
            let {inforAccount} = nextProps;
            this.setState({
                logo: inforAccount.logo?[{image:inforAccount.logo}]:[],
                image_agency: inforAccount.image_agency?[{image:inforAccount.image_agency}]:[],
                id: inforAccount.id
            })

        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {inforAccount,loadpage} = this.props;
        let {color,logo,image_agency,id} = this.state;
        logo =  logo[0]?logo[0].image.replace(URL_SERVER,""):null;
        image_agency =  image_agency[0]?image_agency[0].image.replace(URL_SERVER,""):null;

        let currentData = {
            ...this.props.values,
            color: color,
            logo: logo,
            image_agency: image_agency,
            id: id
        };

        const redirect = this.props.history;
        if (typeof inforAccount !== "undefined") {
            this.props.updateAccount(currentData)
                .then(data => {
                    if(loadpage){
                        redirect.push("/app/dashboard");
                    }
                    else{
                        setTimeout(() => {
                            redirect.push("/app/dashboard/account/list");
                        }, 1000);
                    }
                }).catch(err => {
                    console.log("error update Account",err);
                })
        } else {
            this.props.createAccount(currentData)
                .then(data => {
                    setTimeout(() => {
                        redirect.push("/app/dashboard/account/list");
                    }, 1000);
                }).catch(err => {
                    console.log("error create Account");
                })
        }


    };

    handleClick = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker})
    };

    handleClose = () => {
        this.setState({displayColorPicker: false})
    };

    handleChange = (color) => {
        this.setState({color: color.rgb})
    };

    onClose = () => {
        this.setState({
            preview: null,
            logo_change: false
        })
    };

    onUpload = async (data) =>{

        return new Promise((resolve,reject)=>{
            this.props.UploadImage(data.imagesPreviews)
                .then(res=>{
                    console.log("res",res);
                    if(data.name !== undefined){
                        let _state = {};
                        _state[data.name] = [{image:res.data[0].path}];
                        this.setState(_state);
                }
                    resolve(res);
                }).catch(err=>{
                    reject(err);
                })
        })
    };

    onCrop = (preview) => {
        this.setState({
            preview,
            logo_change: true
        })
    };

    render() {
        const {
            reason_social,
            lastname,
            firstname,
            email,
            telephone,
            mobile,
            address,
            postalcode,
            city,
            sector,
            fax,
            number_agents,
            password,
            type,
            accept_license
        } = this.props.values; // get prop of Formik return
        const {submitted, color,logo,image_agency ,type_accounts, accountCurrent} = this.state;
        const {inforAccount, currentAccount,classes,typeCom} = this.props;
        const isMod = currentAccount.type === ACCOUNT_TYPE.AGENCY || currentAccount.type === ACCOUNT_TYPE.PROMOTER;
        const isAdmin = currentAccount.type === ACCOUNT_TYPE.ADMIN;

        const isEdit = typeCom === "edit";
        const isProfile = typeCom === "profile";

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });
        return (
            <div className="offset-md-2 col-md-7">
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label  obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="account.reason_social"/>
                        </label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="reason_social"
                                               value={reason_social}
                                               validators={['required']}
                                               inputProps={{
                                                   readOnly:isMod
                                               }}
                                               errorMessages={['Ce champ est requis']}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label obligateField"><span className="obligate">*</span>
                            <IntlMessages id="account.name_contact"/>
                        </label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="lastname"
                                               value={lastname}
                                               validators={['required']}
                                               errorMessages={['Ce champ est requis']}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="account.firstname_contact"/>
                        </label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="firstname"
                                               value={firstname}
                                               validators={['required']}
                                               errorMessages={['Ce champ est requis']}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="account.email"/>
                        </label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="email"
                                               value={email}
                                               validators={['required', 'isEmail']}
                                               // InputProps={{
                                               //     readOnly: isEdit,
                                               // }}
                                               errorMessages={['Ce champ est requis']}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages
                                id={typeof inforAccount !== "undefined" ? "account.password" : "account.new_password"}/>
                        </label>
                        <div className="col-sm-6">
                            <div className="formalInput">
                                <TextValidator type="password"
                                               className="form-control"
                                               name="password"
                                               value={password}
                                               validators={typeof inforAccount === "undefined" ? ['required'] : []}
                                               errorMessages={['Ce champ est requis']}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="account.telephone"/>
                        </label>
                        <div className="col-sm-3">
                            <div className="formalInput">
                                <TextValidator type="number"
                                               className="form-control"
                                               name="telephone"
                                               value={telephone}
                                               validators={['required']}
                                               errorMessages={['Ce champ est requis']}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                        <label className="col-sm-2  col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="account.mobile"/>
                        </label>
                        <div className="col-sm-4">
                            <div className="formalInput">
                                <TextValidator type="number"
                                               className="form-control"
                                               name="mobile"
                                               value={mobile}
                                               validators={['required']}
                                               errorMessages={['Ce champ est requis']}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="account.address"/>
                        </label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="address"
                                               value={address}
                                               validators={['required']}
                                               errorMessages={['Ce champ est requis']}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="account.postalcode"/>
                        </label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="postalcode"
                                               value={postalcode}
                                               validators={['required']}
                                               errorMessages={['Ce champ est requis']}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="account.city"/>
                        </label>
                        <div className="col-sm-3">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="city"
                                               value={city}
                                               validators={['required']}
                                               errorMessages={['Ce champ est requis']}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                        <label className="col-sm-2  col-form-label obligateField">
                            <span className="obligate">*</span>
                            <IntlMessages id="property.location.sector" />
                        </label>
                        <div className="col-sm-4">
                            <div className="formalInput">
                                <Select
                                    className="form-control"
                                    name="sector"
                                    value={sector}
                                    onChange={this.props.handleChange}
                                    onBlur={this.props.handleBlur}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        {<IntlMessages id="property.location.type.select" />}
                                    </MenuItem>
                                    <MenuItem value={"center"}>{<IntlMessages id="property.location.type.center" />}</MenuItem>
                                    <MenuItem value={"east"}>{<IntlMessages id="property.location.type.east" />}</MenuItem>
                                    <MenuItem value={"north"}>{<IntlMessages id="property.location.type.north" />}</MenuItem>
                                    <MenuItem value={"south"}>{<IntlMessages id="property.location.type.south" />}</MenuItem>
                                    <MenuItem value={"west"}>{<IntlMessages id="property.location.type.west" />}</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {currentAccount.type !== ACCOUNT_TYPE.STAFF ?(<div>
                        <div className="form-group row">
                            <label className="col-sm-3  col-form-label obligateField"><span className="obligate">*</span>
                                <IntlMessages id="account.faxVAT"/>
                            </label>
                            <div className="col-sm-3">
                                <div className="formalInput">
                                    <TextValidator type="text"
                                                   className="form-control"
                                                   name="fax"
                                                   value={fax}
                                                   validators={['required']}
                                                   errorMessages={['notification.required.numberOnly']}
                                                   onChange={this.props.handleChange}
                                    />
                                </div>
                            </div>
                            {typeof accountCurrent !== "undefined" && accountCurrent.type === ACCOUNT_TYPE.ADMIN && (
                                <label className="col-sm-2  col-form-label obligateField"><span className="obligate">*</span>
                                    <IntlMessages id="account.number_agents"/>
                                </label>)
                            }
                            {typeof accountCurrent !== "undefined" && accountCurrent.type === ACCOUNT_TYPE.ADMIN && (
                                <div className="col-sm-4">
                                    <div className="formalInput formalInputSpecial">
                                        <SelectValidator
                                            className="form-control"
                                            name="number_agents"
                                            value={number_agents}
                                            validators={['required']}
                                            errorMessages={['Ce champ est requis']}
                                            onChange={this.props.handleChange}
                                        >

                                            {renderSelectIndex(0, 50)}
                                        </SelectValidator>
                                    </div>
                                </div>)
                            }

                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3  col-form-label obligateField"><span className="obligate">*</span>
                                <IntlMessages id="account.types"/>
                            </label>
                            <div className="col-sm-4">
                                <div className={classNames(classes.input_mark,"formalInput formalInputSpecial")}>
                                    {
                                        isProfile ?
                                            (
                                                <p className={classNames(classes.input_mark_text)}><IntlMessages id={"account.type." + currentAccount.type}/></p>
                                            ):
                                            (
                                                <SelectValidator
                                                    className="form-control"
                                                    name="type"
                                                    value={type}
                                                    validators={['required']}
                                                    errorMessages={['Ce champ est requis']}
                                                    onChange={this.props.handleChange}
                                                >
                                                    <MenuItem disabled value="">
                                                        <em><IntlMessages id="account.selectbox.types"/></em>
                                                    </MenuItem>
                                                    {this.renderAccountType(type_accounts)}
                                                </SelectValidator>
                                            )

                                    }
                                </div>
                            </div>
                            <label className="col-sm-3  col-form-label obligateField">
                                <span className="obligate">*</span>
                                <IntlMessages id="account.color_your_agency"/>
                            </label>
                            <div className="col-sm-1">
                                <div className="formalInput">
                                    <div style={styles.swatch} onClick={this.handleClick}>
                                        <div style={styles.color}/>
                                    </div>
                                    {this.state.displayColorPicker ?
                                        <div style={styles.popover}>
                                            <div style={styles.cover} onClick={this.handleClose}/>
                                            <SketchPicker color={color} onChange={this.handleChange}/>
                                        </div> : null}
                                </div>
                            </div>
                        </div>
                    </div>):null}

                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
                            {isAdmin?(<IntlMessages id="account.logo"/>):(<IntlMessages id="account.photo.profile"/>)}
                        </label>
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col-sm-6">
                                    <ImageUpload dropBox_title={<IntlMessages id="account.image.profile"/>}
                                                 numberImages={1}
                                                 actionClickOnDrop={true}
                                                 isEditImage={false}
                                                 onUpload={this.onUpload}
                                                 values={logo}
                                                 name="logo"
                                    />
                                </div>
                                {
                                    // ((isEdit && isAdmin) ||
                                    ((isAdmin) ||
                                        (
                                            isProfile &&
                                            (accountCurrent.type === ACCOUNT_TYPE.AGENCY || accountCurrent.type === ACCOUNT_TYPE.PROMOTER
                                        )
                                    )) && (
                                    <div className="col-sm-6">
                                        <ImageUpload dropBox_title={<IntlMessages id="account.agency.logo"/>}
                                                    numberImages={1}
                                                    values={image_agency}
                                                    actionClickOnDrop={true}
                                                    isEditImage={false}
                                                    onUpload={this.onUpload}
                                                    name="image_agency"
                                        />
                                    </div>

                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className={classNames("col-11   col-form-label",classes.licenses)} >
                            <IntlMessages id="account.license.title"/>
                        </label>
                        <div className="col-1">
                            <input type="checkbox"
                                   name="accept_license"
                                   checked={accept_license === 1}
                                   onChange={this.props.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className=" col-sm-3 offset-sm-3 col-md-3 offset-md-3">
                            <Button variant="contained" type="submit" color="primary" disabled={submitted}>
                                {
                                    (submitted && 'Your form is submitted!')
                                    || (!submitted && 'Enregistrer')
                                }
                            </Button>
                        </div>
                    </div>

                </ValidatorForm>
            </div>
        )
    }

}

const mapStateToProp = (state) => {
    return ({
        currentAccount: state.authLogin
    });
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        createAccount: (infors) => {
            return dispatch(createAccount(infors));
        },
        updateAccount: (infors) => {
            return dispatch(updateAccount(infors));
        },
        checkNumberAccountChild: () => {
            return dispatch(checkNumberAccountChild());
        },
        UploadImage:(field)=>{
            return dispatch(UploadImage(field));
        }
    }
};


const FormikForm = withFormik({

    mapPropsToValues(datas) { // Init form field
        let {inforAccount, currentAccount} = datas;
        let check = typeof inforAccount !== "undefined" && inforAccount !== null;
        let isMod = currentAccount.type === ACCOUNT_TYPE.AGENCY || currentAccount.type === ACCOUNT_TYPE.PROMOTER;
        if (!check) {
            return {
                type: isMod?ACCOUNT_TYPE.STAFF:'',
                reason_social: isMod ? currentAccount.reason_social : '',
                firstname: '',
                lastname: '',
                telephone: '',
                mobile: '',
                email: '',
                address: '',
                postalcode: '',
                city: '',
                sector: '',
                fax: isMod?currentAccount.fax:'',
                number_agents: 0,
                color: isMod?currentAccount.color:'',
                accept_license: false,
                password: '',
            }
        }
        return {
            type: inforAccount.type || '',
            reason_social: inforAccount.reason_social || '',
            firstname: inforAccount.firstname || '',
            lastname: inforAccount.lastname || '',
            telephone: inforAccount.telephone || '',
            mobile: inforAccount.mobile || '',
            email: inforAccount.email || '',
            address: inforAccount.address || '',
            postalcode: inforAccount.postalcode || '',
            city: inforAccount.city || '',
            sector: inforAccount.sector || '',
            fax: inforAccount.fax || '',
            number_agents: inforAccount.number_agents || 0,
            color: inforAccount.color || '',
            accept_license: inforAccount.accept_license || false,
            password: '',
        }
    },
    enableReinitialize: true,
    validationSchema:Yup.object().shape({
        reason_social:Yup.string().required((<IntlMessages id='notification.required' />)),
        firstname:Yup.string().required((<IntlMessages id='notification.required' />)),
        lastname:Yup.string().required((<IntlMessages id='notification.required' />)),
        telephone:Yup.number().required((<IntlMessages id='notification.required' />)),
        mobile:Yup.number().required((<IntlMessages id='notification.required' />)),
        email:Yup.string().required((<IntlMessages id='notification.required' />)),
        address:Yup.string().required((<IntlMessages id='notification.required' />)),
        postalcode:Yup.string().required((<IntlMessages id='notification.required' />)),
        fax:Yup.string().required((<IntlMessages id='notification.required' />)),
        number_agents:Yup.string().required((<IntlMessages id='notification.required' />)),
    })

})(CreateUserLayout);


export default withStyles(stylesUI)(connect(mapStateToProp, mapDispatchToProps)(withRouter(FormikForm)));
