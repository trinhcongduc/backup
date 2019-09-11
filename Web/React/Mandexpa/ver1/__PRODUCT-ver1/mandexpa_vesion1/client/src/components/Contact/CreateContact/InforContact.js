/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import IntlMessages from "Util/IntlMessages";
import FormHelperText from '@material-ui/core/FormHelperText'
import {connect} from "react-redux";
import {withFormik,FieldArray} from "formik";
import * as Yup from 'yup'
import FormControl from '@material-ui/core/FormControl'
import {createContact,getAllCountry,updateContact,getContactType} from "Actions";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import SelectCountry from 'react-select';
class InforContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
        }
    }
    componentWillReceiveProps(nextProps){

        if(nextProps.contactdetail !== this.props.contactdetail){
             this.props.resetForm(nextProps);
        }
    }
    componentWillMount() {
        this.props.getContactType();
        var suggestions = null;
        const listOption= this.props.countries;
        if(typeof listOption ==="object" && listOption.length>0){
            suggestions = listOption.map(suggestion => ({
                value: suggestion.id,
                label: suggestion.name,
            }));
        }

        this.setState({
            countries: suggestions
        })
    }
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props. setFieldValue("country_id", value);
    };

    render(){
        const divStyle = {
            margin: '5px',
        };
       var {
           title,
           company,
           firstname,
           lastname,
           type,
           unit,
           streetname,
           streetnumber,
           country_id,
           zipcode ,
           telephone,
           mobile,
           email,
           city,
           params


       } = this.props.values;
       // console.log('login',this.props.authLogin);
        const  contacttypes = this.props.contacttype;
        const contactdetail = this.props.contactdetail;
        return(

            <form  onSubmit={this.props.handleSubmit}>
                <div className="card">
                    <div className="card-header">
                        Communication
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-8 col-12">
                                <div className="row">
                                    <div className="col-sm-6 col-12">
                                        <FormControl className="form-group" >
                                            <label  className="col-form-label" >{<IntlMessages id="contact.title" />}</label>
                                                <div className="col-sm-6 noPadding heightIP40">
                                                    <div >
                                                    <Select
                                                        className="form-control"
                                                        name="title"
                                                        value={title}
                                                        onChange={this.props.handleChange}
                                                        displayEmpty
                                                    >
                                                        <MenuItem value="" disabled>
                                                            {<IntlMessages id="contact.selecttitle" />}
                                                        </MenuItem>
                                                        <MenuItem value={"Mr"}>{<IntlMessages id="contact.mr" />}</MenuItem>
                                                        <MenuItem value={"Mrs"}>{<IntlMessages id="contact.mrs" />}</MenuItem>
                                                    </Select>
                                                    </div>
                                                 </div>
                                        </FormControl>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <FormControl className="form-group"  error={!!this.props.errors.telephone}>
                                            <label  className="col-form-label">{<IntlMessages id="contact.home_phone" />}</label>
                                            <div>
                                            <div className="heightIP40">
                                                <input type="text"
                                                       className="form-control"
                                                       name="telephone"
                                                       onChange={this.props.handleChange}
                                                       value={telephone}
                                                       onBlur={this.props.handleBlur}/>
                                                {this.props.touched.telephone &&<FormHelperText>{this.props.errors.telephone}</FormHelperText>}
                                                </div>
                                            </div>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-12">
                                        <FormControl className="form-group"  error={!!this.props.errors.company}>
                                            <label  className="col-form-label">{<IntlMessages id="contact.company" />}</label>
                                            <div>
                                            <div className="heightIP40">
                                                <input type="text"
                                                       className="form-control"
                                                       name="company"
                                                       placeholder=""
                                                       onChange={this.props.handleChange}
                                                       value={company}
                                                     />
                                            </div>
                                            </div>
                                        </FormControl>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <FormControl className="form-group" >
                                            <label  className="col-form-label obligateField"><span className="obligate">*</span>{<IntlMessages id="contact.cell_phone" />}</label>
                                            <div>
                                            <div className="heightIP40">
                                                <input type="text"
                                                       className="form-control"
                                                       name="mobile"
                                                       placeholder=""
                                                       onChange={this.props.handleChange}
                                                       value={mobile}
                                                       onBlur={this.props.handleBlur}/>
                                                {/*{this.props.touched.mobile &&<FormHelperText>{this.props.errors.mobile}</FormHelperText>}*/}
                                            </div>
                                            </div>
                                    </FormControl>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-12">
                                        <FormControl className="form-group"  error={!!this.props.errors.firstname}>
                                            <label  className="col-form-label obligateField"><span className="obligate">*</span>{<IntlMessages id="contact.first_name" />}</label>
                                            <div>
                                            <div className="heightIP40">
                                                <input type="text"
                                                       className="form-control"
                                                       name="firstname"
                                                       placeholder=""
                                                       onChange={this.props.handleChange}
                                                       value={firstname}
                                                       onBlur={this.props.handleBlur}/>
                                                {this.props.touched.firstname &&<FormHelperText>{this.props.errors.firstname}</FormHelperText>}
                                            </div>
                                            </div>
                                        </FormControl>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <FormControl className="email"  error={!!this.props.errors.email}>
                                            <label  className="col-form-label obligateField"><span className="obligate">*</span>{<IntlMessages id="contact.email" />}</label>
                                            <div>
                                            <div className="heightIP40">
                                                <input type="text"
                                                       className="form-control"
                                                       name="email"
                                                       placeholder=""
                                                       onChange={this.props.handleChange}
                                                       value={email}
                                                       onBlur={this.props.handleBlur}/>
                                                {this.props.touched.email &&<FormHelperText>{this.props.errors.email}</FormHelperText>}
                                            </div>
                                            </div>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-12">
                                        <FormControl className="form-group"  error={!!this.props.errors.lastname}>
                                            <label  className="col-form-label obligateField"><span className="obligate">*</span>{<IntlMessages id="contact.last_name" />}</label>
                                            <div>
                                            <div className="heightIP40">
                                                <input type="text"
                                                       className="form-control"
                                                       name="lastname"
                                                       placeholder=""
                                                       onChange={this.props.handleChange}
                                                       value={lastname}
                                                       onBlur={this.props.handleBlur}/>
                                                {this.props.touched.lastname &&<FormHelperText>{this.props.errors.lastname}</FormHelperText>}
                                            </div>
                                            </div>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 col-12">
                                <div className="card">
                                    <div className="card-header">
                                        Catégories
                                    </div>
                                    <div className="card-body">
                                        <div>
                                            <FieldArray
                                                name="params"
                                                render={arrayHelpers => (
                                                    <div>
                                                        {contacttypes.map(contact => (
                                                            <div key={contact.id}>
                                                                <label>
                                                                    <input
                                                                        name="params"
                                                                        type="checkbox"
                                                                        value={contact.id}
                                                                        checked={params.includes(contact.id)}
                                                                        onChange={e => {
                                                                            if (e.target.checked) arrayHelpers.push(contact.id);
                                                                            else {
                                                                                const idx = params.indexOf(contact.id);
                                                                                arrayHelpers.remove(idx);
                                                                            }
                                                                        }}
                                                                    />{" "}
                                                                    {contact.name}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        Adresse
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3 col-12">
                                <FormControl className="form-group" >
                                    <label  >{<IntlMessages id="contact.type" />}</label>
                                    <div className="heightIP40">
                                        <div>
                                        <Select
                                            className="form-control"
                                            name="type"
                                            value={type}
                                            onChange={this.props.handleChange}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>
                                                {<IntlMessages id="contact.selecttype" />}
                                            </MenuItem>
                                            <MenuItem value={"Office"}>{<IntlMessages id="contact.office" />}</MenuItem>
                                            <MenuItem value={"Office address"}>{<IntlMessages id="contact.officeaddress" />}</MenuItem>
                                            <MenuItem value={"Office 2"}>{<IntlMessages id="contact.office2" />}</MenuItem>
                                            <MenuItem value={"Residence"}>{<IntlMessages id="contact.residence" />}</MenuItem>
                                            <MenuItem value={"Other address"}>{<IntlMessages id="contact.otheraddress" />}</MenuItem>
                                            <MenuItem value={"Mailing address"}>{<IntlMessages id="contact.mailingaddress" />}</MenuItem>
                                        </Select>
                                    </div>
                                    </div>
                                </FormControl>
                            </div>
                            <div className="col-sm-3 col-12">
                                <FormControl className="form-group">
                                    <label >{<IntlMessages id="contact.app" />}</label>
                                        <div>
                                            <div className="heightIP40">
                                            <input type="text"
                                                   className="form-control "
                                                   name="unit"
                                                   placeholder=""
                                                   onChange={this.props.handleChange}
                                                   value={unit}/>
                                             </div>
                                        </div>
                                </FormControl>
                            </div>
                            <div className="col-sm-3 col-12">
                                <FormControl className="form-group" error={!!this.props.errors.streetname}>
                                    <label className="">{<IntlMessages id="contact.street_name" />}</label>
                                    <div>
                                    <div className="heightIP40">
                                        <input type="text"
                                               className="form-control "
                                               name="streetname"
                                               placeholder=""
                                               onChange={this.props.handleChange}
                                               onBlur={this.props.handleBlur}
                                               value={streetname}/>
                                        {this.props.touched.streetname &&<FormHelperText>{this.props.errors.streetname}</FormHelperText>}
                                    </div>
                                    </div>
                                </FormControl>
                            </div>
                            <div className="col-sm-3 col-12">
                                <FormControl className="form-group " >
                                    <label  >{<IntlMessages id="contact.street_number" />}</label>
                                    <div>
                                    <div className="heightIP40">
                                        <input type="text"
                                               className="form-control "
                                               name="streetnumber"
                                               placeholder=""
                                               onChange={this.props.handleChange}
                                               value={streetnumber}/>
                                    </div>
                                    </div>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3 col-12">
                                <FormControl className="form-group ">
                                    <label >{<IntlMessages id="contact.city" />}</label>
                                    <div>
                                    <div className="heightIP40">
                                        <input type="text"
                                               className="form-control "
                                               name="city"
                                               onChange={this.props.handleChange}
                                               value={city}/>
                                    </div>
                                    </div>
                                </FormControl>
                            </div>
                            <div className="col-sm-3 col-12">
                                <FormControl className="form-group ">
                                    <label>{<IntlMessages id="contact.country" />}</label>
                                    <div>
                                    <div className="heightIP40 selectCountry">
                                        <SelectCountry
                                            options={this.state.countries}
                                            value={country_id}
                                            onChange={this.handleChange}
                                            placeholder="Search a country"
                                        />

                                        {/*<select*/}
                                            {/*className="form-control"*/}
                                            {/*name="country_id"*/}
                                            {/*onChange={this.props.handleChange}*/}
                                            {/*onBlur={this.props.handleBlur}*/}
                                            {/*value={country_id}*/}
                                        {/*>*/}
                                            {/*<option value="" > Select Country</option>*/}
                                            {/*{countries.map(country => {*/}
                                                {/*return(<option value={country.id} key={country.id}>{country.name}</option>)*/}
                                            {/*})}*/}
                                        {/*</select>*/}
                                    </div>
                                    </div>
                                </FormControl>
                            </div>
                            <div className="col-sm-3 col-12">
                                <FormControl className="form-group">
                                    <label >{<IntlMessages id="contact.zipcode" />}</label>
                                    <div>
                                    <div className="col-6 heightIP40 noPadding">
                                        <input type="text"
                                               className="form-control"
                                               name="zipcode"
                                               onChange={this.props.handleChange}
                                               onBlur={this.props.handleBlur}
                                               value={zipcode}/>
                                    </div>
                                    </div>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="text-right">
                    <button type="button" className="btn btn-secondary" onClick={this.props.handleReset} style={divStyle} >{<IntlMessages id="reset" />}</button>
                    <button type="submit" className="btn btn-primary" style={divStyle} disabled={this.props.isSubmitting}>{<IntlMessages id="submit" />}</button>
                </div>
            </form>
        )
    }

}
const createForm = withFormik({
    enableReinitialize : true,
    mapPropsToValues(datas) { // Init form field
        // console.log('info',datas.contactdetail)
        if(typeof datas.contactdetail != "undefined" ){
            var {contactdetail} = datas;
            console.log(JSON.parse(contactdetail.country_id))
            return {
                id : contactdetail.id || "",
                title:contactdetail.title||"",
                company: contactdetail.company||"",
                firstname : contactdetail.firstname||"",
                lastname : contactdetail.lastname||"",
                type : contactdetail.type||"",
                unit : contactdetail.unit||"",
                streetname : contactdetail.streetname||"",
                streetnumber : contactdetail.streetnumber||"",
                country_id : JSON.parse(contactdetail.country_id)||{},
                zipcode : contactdetail.zipcode||"",
                telephone :contactdetail.telephone||"",
                mobile : contactdetail.mobile||"",
                email : contactdetail.email||"",
                city : contactdetail.city||"",
                params : contactdetail.params||[],
            }
        }
        return{
            title:"",
            company:"",
            firstname : "",
            lastname :"",
            type : "",
            unit : "",
            streetname : "",
            streetnumber : "",
            country_id : {},
            zipcode : "",
            telephone :"",
            mobile : "",
            email : "",
            city : "",
            params : [],
        }
       },
   
    validationSchema: Yup.object().shape({ // Validate form field

        firstname: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        lastname: Yup.string()
            .required((<IntlMessages id='notification.required' />)),
        mobile: Yup.number()
            .typeError((<IntlMessages id='noti.not.phoneNumber' />))
            .positive((<IntlMessages id='noti.phone.minus' />)),
        email: Yup.string()
            .required((<IntlMessages id='notification.required' />))
            .email((<IntlMessages id='noti.enterEmail' />))
    }),
    handleSubmit(values, { props, setSubmitting,resetForm }) {
        setSubmitting(false);
        values.params = JSON.stringify(values.params);
        values.country_id = JSON.stringify(values.country_id);
        if(typeof props.contactdetail !="undefined"){
            props.updateContact(values).then(data =>{
                    props.history.push("/app/dashboard/contact/list")
            }).catch(err=>{
                console.log("error update Contact");
            })

        }
        else {
            props.createContact(values).then(data =>{
                    props.history.push("/app/dashboard/contact/list")
            }).catch(err=>{
                console.log("error add Contact");
            })
        }


    },
})(InforContact);
function mapStateToProps(state) {
    return {
        contacttype : state.contacttype.contacttype,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getContactType: () => dispatch(getContactType()),
        createContact: (data) => {
            return dispatch(createContact(data));
        },
        updateContact: (data) => {
            return dispatch(updateContact(data))
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(createForm));
