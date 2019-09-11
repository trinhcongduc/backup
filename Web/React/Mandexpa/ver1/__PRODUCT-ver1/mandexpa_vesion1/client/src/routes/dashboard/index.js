/**
 * Dasboard Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

// async components
import {
    AsyncEcommerceDashboardComponent,
    AsyncMainTabPropertyComponent,
    AsyncMainTabContactComponent,
    AsyncListContactComponent,
    AsyncCreateAccountComponent,
    AsyncListAccountComponent,
    AsyncEditAccountComponent,
    AsynContactDetailComponent,
    AsyncEditAccountProfile,
    AsyncListPropertyComponent,
    AsynPropertyDetailComponent,
    AsynCreatePropertyMatchComponent,
    AsynListPropertyMatchComponent,
    AsynDocumentAdminAdministrationComponent,
    AsynDocumentAdminEDocumentComponent,
    AsynDocumentAdminMarketingComponent,
    AsynDocumentAdminFacturationComponent,
    AsynDocumentUserAdministrationComponent,
    AsynDocumentUserEDocumentComponent,
    AsynDocumentUserMarketingComponent,
    AsynDocumentUserFacturationComponent,
    AsynListPropertyMatchSearchComponent,
    AsynListPropertyMatchEditComponent,
    AsynListAgendaComponent,
    AsynOrderInvoicesComponent,
    AsyncSubscriptions,
    AsyncSubscribers,
} from 'Components/AsyncComponent/AsyncComponent';
import NotFound from 'Components/NotFoundLayout/index';

const Dashboard = ({ match }) => (

   <div className="dashboard-wrapper">
      <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/main`} />
          <Route path={`${match.url}/main`} component={AsyncEcommerceDashboardComponent} />
          <Redirect exact from={`${match.url}/account/`} to={`${match.url}/account/list`} />
          <Route path={`${match.url}/property/maintab`} component={AsyncMainTabPropertyComponent} />
          <Route path={`${match.url}/property/list`} component={AsyncListPropertyComponent} />
          <Route path={`${match.url}/property/edit/:id(\\d+)`} component={AsynPropertyDetailComponent} />
          <Route path={`${match.url}/contact/create`} component={AsyncMainTabContactComponent} />
          <Route path={`${match.url}/contact/edit`} component={AsynContactDetailComponent} />
          <Route path={`${match.url}/contact/list`} component={AsyncListContactComponent} />
          <Route exact path={`${match.url}/account/create`} component={AsyncCreateAccountComponent} />
          <Route exact path={`${match.url}/account/list`} component={AsyncListAccountComponent} />
          <Route path={`${match.url}/account/edit/:id(\\d+)`} component={AsyncEditAccountComponent} />
          <Route path={`${match.url}/account/my-profile`} component={AsyncEditAccountProfile} />

          {/*Property Match Routers*/}
          <Route path={`${match.url}/property-matches/create`} component={AsynCreatePropertyMatchComponent} />
          <Route path={`${match.url}/property-matches/list`} component={AsynListPropertyMatchComponent} />
          <Route path={`${match.url}/property-matches/property-matches-search/:id(\\d+)`} component={AsynListPropertyMatchSearchComponent} />
          <Route path={`${match.url}/property-matches/edit/:id(\\d+)`} component={AsynListPropertyMatchEditComponent} />

          {/*Documents Routers*/}
          <Route path={`${match.url}/document/admin/administration`} component={AsynDocumentAdminAdministrationComponent} />
          <Route path={`${match.url}/document/admin/e-document`} component={AsynDocumentAdminEDocumentComponent} />
          <Route path={`${match.url}/document/admin/facturation`} component={AsynDocumentAdminFacturationComponent} />
          <Route path={`${match.url}/document/admin/marketing`} component={AsynDocumentAdminMarketingComponent} />
          <Route path={`${match.url}/document/user/administration`} component={AsynDocumentUserAdministrationComponent} />
          <Route path={`${match.url}/document/user/e-document`} component={AsynDocumentUserEDocumentComponent} />
          <Route path={`${match.url}/document/user/facturation`} component={AsynDocumentUserFacturationComponent} />
          <Route path={`${match.url}/document/user/marketing`} component={AsynDocumentUserMarketingComponent} />
          <Route path={`${match.url}/document/orders/invoices`} component={AsynOrderInvoicesComponent} />
          {/*Agenda Routers*/}
          <Route path={`${match.url}/agenda/list`} component={AsynListAgendaComponent} />

          {/*Subscriptions Routers*/}
          <Route path={`${match.url}/subscriptions`} component={AsyncSubscriptions} />

          {/*Subscribers Routers*/}
          <Route path={`${match.url}/subscribers`} component={AsyncSubscribers} />

          {/*Not found*/}
          <Route exact path={`${match.url}/not-found`} component={NotFound} />
          <Route component={NotFound} />
      </Switch>
   </div>
);

export default withRouter(Dashboard, { id: Number });
