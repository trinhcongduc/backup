/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {withFormik} from "formik";
import DialogHostProperty from "Components/SiderBarProperty/MainTabPropertyComponent/DialogHostProperty";


class OwnerInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_name: ""
        }

    }

    render() {
        var {title, name, valueInput} = this.props;
        const divStyle = {
            cursor: 'pointer',
            color: '#614194',
        };
        return (
            <div className="form-group ">
                <label>{title}</label>
                <div className="row">
                    <div className="col-xs-3 col-sm-3 col-ms-3 col-lg-3 ">
                        <DialogHostProperty name={name}/>
                     </div>
                    <div className="col-xs-9 col-sm-9 col-ms-9 col-lg-9 height40px">
                        <input type="text"
                               className="form-control"
                               name={name}
                               placeholder="Nom du propriétaire"
                               value={valueInput}
                               readOnly={true}
                        />
                    </div>


                </div>

            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return ({})
};
export default connect(mapStatetoProps)(OwnerInput);
