import {Component} from "react";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import IntlMessages from "Util/IntlMessages";
import {URL_SERVER} from 'Constants/GeneralConfig';
import reactCSS from "reactcss";
import {SelectValidator, TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {renderSelectIndex} from "Helpers/helpers";
import {SketchPicker} from "react-color";
import Avatar from "react-avatar-edit";
import Button from "@material-ui/core/es/Button/Button";
import React from "react";
import {createAccount, updateAccount} from "Actions";
import {withFormik} from "formik";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";

class FormAccountLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
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
        }
    };

    renderAccountType = (datas) => {
        var result = null;
        if (datas.length > 0) {
            result = datas.map((data, index) => {
                if (data.status) {
                    return (<MenuItem value={data.type} key={index}><IntlMessages id={data.title}/></MenuItem>)
                }
            })
        }

        return result;

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.inforAccount) {
            var {inforAccount} = nextProps;
            this.setState({
                preview: URL_SERVER + inforAccount.logo,
                id: inforAccount.id
            })

        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var {inforAccount} = this.props;
        var currentData = {
            ...this.props.values,
            color: this.state.color,
            logo_preview: this.state.preview,
            logo_change: this.state.logo_change,
            id: this.state.id
        };

        // console.log("current-data",currentData);
        var redirect = this.props.history;
        if (typeof inforAccount !== "undefined") {

            this.props.updateAccount(currentData, redirect);
        } else {
            // console.log('create');
            this.props.createAccount(currentData, redirect);
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

    onCrop = (preview) => {
        this.setState({
            preview,
            logo_change: true
        })
    };

    render() {
        var {
            reason_social,
            name_account,
            firstname,
            email,
            telephone,
            mobile,
            address,
            postalcode,
            city,
            fax,
            number_agents,
            password,
            type
        } = this.props.values; // get prop of Formik return
        var {submitted, src, preview, color} = this.state;
        const {inforAccount} = this.props;
        const isEdit = typeof inforAccount !== "undefined";

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
                        <label className="col-sm-3  col-form-label"><IntlMessages id="account.reason_social"/></label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="reason_social"
                                               value={reason_social}
                                               validators={['required']}
                                               errorMessages={<IntlMessages id="notification.required"/>}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
                            <IntlMessages id="account.name_contact"/>
                        </label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="name_account"
                                               value={name_account}
                                               validators={['required']}
                                               errorMessages={<IntlMessages id="notification.required"/>}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
                            <IntlMessages id="account.firstname_contact"/>
                        </label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="firstname"
                                               value={firstname}
                                               validators={['required']}
                                               errorMessages={<IntlMessages id="notification.required"/>}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
                            <IntlMessages id="account.email"/>
                        </label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="email"
                                               value={email}
                                               validators={['required', 'isEmail']}
                                               InputProps={{
                                                   readOnly: isEdit,
                                               }}
                                               errorMessages={<IntlMessages id="notification.required"/>}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
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
                                               errorMessages={<IntlMessages id="notification.required"/>}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
                            <IntlMessages id="account.telephone"/>
                        </label>
                        <div className="col-sm-3">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="telephone"
                                               value={telephone}
                                               validators={['required']}
                                               errorMessages={<IntlMessages id="notification.required"/>}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                        <label className="col-sm-2  col-form-label">
                            <IntlMessages id="account.mobile"/>
                        </label>
                        <div className="col-sm-4">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="mobile"
                                               value={mobile}
                                               validators={['required']}
                                               errorMessages={<IntlMessages id="notification.required"/>}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
                            <IntlMessages id="account.address"/>
                        </label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="address"
                                               value={address}
                                               validators={['required']}
                                               errorMessages={<IntlMessages id="notification.required"/>}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
                            <IntlMessages id="account.postalcode"/>
                        </label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="postalcode"
                                               value={postalcode}
                                               validators={['required']}
                                               errorMessages={<IntlMessages id="notification.required"/>}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
                            <IntlMessages id="account.city"/>
                        </label>
                        <div className="col-sm-9">
                            <div className="formalInput">
                                <TextValidator type="text"
                                               className="form-control"
                                               name="city"
                                               value={city}
                                               validators={['required']}
                                               errorMessages={<IntlMessages id="notification.required"/>}
                                               onChange={this.props.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
                            <IntlMessages id="account.faxVAT"/>
                        </label>
                        <div className="col-sm-3">
                            <div className="row">
                                <div className="col-sm-10 col-md-10 ">
                                    <div className="formalInput">
                                        <TextValidator type="text"
                                                       className="form-control"
                                                       name="fax"
                                                       value={fax}
                                                       validators={['required']}
                                                       errorMessages={<IntlMessages id="notification.required.numberOnly" />}
                                                       onChange={this.props.handleChange}
                                        />
                                    </div>
                                </div>
                                <label className="col-xs-2 col-md-2 col-sm-2 col-form-label">
                                    <IntlMessages id="symbol.percent"/>
                                </label>
                            </div>
                        </div>
                        {accountCurrent.type === "admin" ? (
                            <div className="col-sm-6 col-md-6">
                                <div className="row">
                                    <label className="col-sm-4  col-form-label">
                                        <IntlMessages id="account.number_agents"/>
                                    </label>
                                    <div className="col-sm-7">
                                        <div className="formalInput formalInputSpecial">
                                            <SelectValidator
                                                className="form-control"
                                                name="number_agents"
                                                value={number_agents}
                                                validators={['required']}
                                                errorMessages={<IntlMessages id="notification.required"/>}
                                                onChange={this.props.handleChange}
                                            >
                                                {renderSelectIndex(0, 50)}
                                            </SelectValidator>
                                        </div>
                                    </div>
                                </div>
                            </div>) : null}

                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
                            <IntlMessages id="account.types"/>
                        </label>
                        <div className="col-sm-4">
                            <div className="formalInput formalInputSpecial">
                                <SelectValidator
                                    className="form-control"
                                    name="type"
                                    value={type}
                                    validators={['required']}
                                    errorMessages={<IntlMessages id="notification.required"/>}
                                    onChange={this.props.handleChange}
                                >
                                    {this.renderAccountType(type_accounts)}
                                </SelectValidator>
                            </div>
                        </div>
                        <label className="col-sm-3  col-form-label">
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
                    <div className="form-group row">
                        <label className="col-sm-3  col-form-label">
                            <IntlMessages id="account.logo"/>
                        </label>
                        <div className="col-sm-6">
                            <div className="formalInput">
                                <Avatar
                                    width={320}
                                    height={180}
                                    onCrop={this.onCrop}
                                    onClose={this.onClose}
                                    src={src}
                                />
                            </div>
                        </div>
                        <div className=" col-sm-3 col-md-3">
                            <img src={preview} alt="Preview"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className=" col-sm-3 offset-sm-3 col-md-3 offset-md-3">
                            <Button variant="contained" type="submit" color="primary" disabled={submitted}>
                                {/*<IntlMessages id="account.btn_create" />*/}
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
    return ({});
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        createAccount: (infors, redirect) => {
            dispatch(createAccount(infors, redirect));
        },
        updateAccount: (infors, redirect) => {
            dispatch(updateAccount(infors, redirect));
        }
    }
};


const FormikForm = withFormik({

    mapPropsToValues(datas) { // Init form field
        var {inforAccount} = datas;
        var check = typeof inforAccount !== "undefined";
        if (!check) {
            return {
                type: '',
                reason_social: '',
                firstname: '',
                name_account: '',
                telephone: '',
                mobile: '',
                email: '',
                address: '',
                postalcode: '',
                city: '',
                fax: '',
                number_agents: '',
                color: '',
                password: '',
            }
        }
        return {
            type: inforAccount.type || '',
            reason_social: inforAccount.reason_social || '',
            firstname: inforAccount.firstname || '',
            name_account: inforAccount.name_account || '',
            telephone: inforAccount.telephone || '',
            mobile: inforAccount.mobile || '',
            email: inforAccount.email || '',
            address: inforAccount.address || '',
            postalcode: inforAccount.postalcode || '',
            city: inforAccount.city || '',
            fax: inforAccount.fax || '',
            number_agents: inforAccount.number_agents || '',
            color: inforAccount.color || '',
            password: '',
        }
    },
    enableReinitialize: true

})(CreateUserLayout);


export default connect(mapStateToProp, mapDispatchToProps)(withRouter(FormikForm));
