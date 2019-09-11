import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncLoginComponent,
} from 'Components/AsyncComponent/AsyncComponent';

const Auth = ({ match }) => (
    <div className="auth-wrapper">
        <Switch>
            <Route path={`${match.url}`} component={AsyncLoginComponent} />
        </Switch>
    </div>
);

export default Auth;
