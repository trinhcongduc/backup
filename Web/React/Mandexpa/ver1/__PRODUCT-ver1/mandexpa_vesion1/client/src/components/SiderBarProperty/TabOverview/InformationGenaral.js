import React, {Component} from 'react';
import {URL_SERVER} from "Constants/GeneralConfig";
import {displayPriceWithCurrency, findDataOptionSelector, numberWithCommas} from "Helpers";
import {status_property,types_property} from "Constants/ComponentConfigs/PropertyConfig";
const image_default = require("Assets/img/about-2.png");


class InformationGenaral extends Component {
    render() {
        var logo = image_default;
        this.props.propertyDetail.media.length > 0 ? this.props.propertyDetail.media.map((item) => {
            if (item.primaryImage === "1") {
                try{
                    if (item.image.search("http") > -1) {
                        logo = item.image === null || item.image === "" ? image_default : (item.image);
                    } else {
                        logo = item.image === null || item.image === "" ? image_default : (URL_SERVER + item.image);
                    }
                }
               catch (err) {
                   console.log(err)
                   logo = image_default;
               }
            }
        }) : "";


        var {property, location, character, year_construction} = this.props.propertyDetail;
        // console.log("------------>",this.props.propertyDetail);
        // property.status_mandate =  findDataOptionSelector(property.status_mandate,status_property[property.type]);
        // property.type_property =  findDataOptionSelector(property.type_property,types_property);

        return (
            <div>
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <div className="card abc" >
                            <img className="card-img-top" src={logo} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title text-right">{numberWithCommas(property.number_pay!==null?displayPriceWithCurrency(property.number_pay):"")} </h5>
                            </div>
                        </div>

                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        
                        <p><strong>Adresse : </strong>{location[0].street_name !== null ? location[0].street_name : ""}</p>
                        <p><strong>Informations:</strong></p>
                        <p>Nombre de salles: {character[0].number_bathroom}</p>
                        <p>Nombre de chambres:{character[0].number_bedroom !== null ? character[0].number_bedroom : ""}</p>
                        <p>Nombre de salles de bain:{character[0].number_room !== null ? character[0].number_room : ""}</p>
                        <p><strong>Nombre WC:</strong>{character[0].number_wc !== null ? character[0].number_wc : ""}</p>
                        
                        <p><strong>Propriétaire:</strong>{JSON.parse(property.host_1).name}</p>

                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        <p><strong><i className="zmdi zmdi-account agenda-icon"></i> {property.firstname!==null?property.firstname:""} {property.lastname!==null?property.lastname:""}</strong></p>
                        <p><strong>Raison sociale: {property.reason_social!==null?property.reason_social:""} </strong></p>
                        {/* <p>{
                            property.status_mandate !== null ? JSON.parse(property.status_mandate).label : ""
                        }
                        </p> */}
                        {/*<p>{property.type_property !== null ? JSON.parse(property.type_property).label : ""}</p>*/}
                        <p><strong>Surface
                            habitable: </strong>{property.living_space !== null ? property.living_space : ""}</p>
                        <p><strong>Surface Terrain
                            (m²):</strong> {property.total_area !== null ? property.total_area : ""}</p>
                        <p><strong>Année de construction</strong>
                            : {year_construction !== null ? year_construction : ""}</p>
                            <p></p>
                            <p></p>
                            <p></p>
                        
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3">
                        {/*<p><strong>Nombre de jours sur le marché:</strong> 0</p>*/}
                        {/* <p><strong>Acheteurs potentiels:</strong> 0</p> */}
                        <p><strong>Nombre de clics:</strong> {property.quantity_account_seen}</p>
                        <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                    </div>
                </div>
            </div>

        )
    }
}

export default InformationGenaral;