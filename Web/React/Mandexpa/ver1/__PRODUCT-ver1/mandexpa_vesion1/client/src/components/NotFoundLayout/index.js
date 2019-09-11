/**
 * App.js Layout Start Here
 */

'use strict'
import React, { Component } from 'react';
import IntlMessages from "Util/IntlMessages";
import {Link} from "react-router-dom";



class NotFoundLayout extends Component {
    render(){
        return(
            <div className="container">
                <div>
                    <div className="text-center page-title">
                        <h1>404 Not Found</h1>
                    </div>
                </div>
            </div>

        )
    }
}

export default NotFoundLayout;
