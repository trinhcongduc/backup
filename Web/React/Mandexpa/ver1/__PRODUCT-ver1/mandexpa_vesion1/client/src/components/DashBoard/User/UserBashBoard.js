import React, { Component } from 'react';
import {connect} from "react-redux";
import ListProperty  from "Components/SiderBarProperty/ListProperty";
import StatisticComponent from "./StatisticComponent";

class UserBashBoardDashboard extends Component {
    render() {
        return (
            <div>
                <StatisticComponent/>
                <div className="row">
                    <div className="col-md-12">
                        <ListProperty/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null,null)(UserBashBoardDashboard);