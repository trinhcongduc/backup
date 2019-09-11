/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// ecommerce dashboard
const AsyncEcommerceDashboardComponent = Loadable({
	loader: () => import("Routes/dashboard/ecommerce"),
	loading: () => <RctPageLoader />,
});

// agency dashboard
const AsyncSaasDashboardComponent = Loadable({
	loader: () => import("Routes/dashboard/saas"),
	loading: () => <RctPageLoader />,
});

// agency dashboard
const AsyncAgencyDashboardComponent = Loadable({
	loader: () => import("Routes/dashboard/agency"),
	loading: () => <RctPageLoader />,
});

// boxed dashboard
const AsyncNewsDashboardComponent = Loadable({
	loader: () => import("Routes/dashboard/news"),
	loading: () => <RctPageLoader />,
});

/*---------------- Session ------------------*/

// Session Login
const AsyncSessionLoginComponent = Loadable({
    loader: () => import("Routes/session/login"),
    loading: () => <RctPageLoader />,
});


/*-------------Users functional----------*/
const AsyncCreateAccountComponent = Loadable({
    loader: () => import("Routes/Account/create/index"),
    loading: () => <RctPageLoader />,
});

const AsyncListAccountComponent = Loadable({
    loader: () => import("Routes/Account/list/index"),
    loading: () => <RctPageLoader />,
});

const AsyncEditAccountComponent = Loadable({
    loader: () => import("Routes/Account/edit/index"),
    loading: () => <RctPageLoader />,
});

const AsyncEditAccountProfile = Loadable({
    loader: () => import("Routes/Account/profile/index"),
    loading: () => <RctPageLoader />,
});

const AsyncSubscriptions = Loadable({
    loader: () => import("Routes/Subscriptions/index"),
    loading: () => <RctPageLoader />,
});

const AsyncSubscribers= Loadable({
    loader: () => import("Routes/Subscribers"),
    loading: () => <RctPageLoader />,
});


/*----------------- ListItem Property in siderbar---------------------*/
const AsyncMainTabPropertyComponent = Loadable({
    loader: () => import("Routes/SiderbarProperty/MainTab"),
    loading: () => <RctPageLoader />,
});
const AsyncListPropertyComponent = Loadable({
    loader: () => import("Routes/SiderbarProperty/List"),
    loading: () => <RctPageLoader />,
});
const AsynPropertyDetailComponent = Loadable({
    loader: () => import("Routes/SiderbarProperty/Edit"),
    loading: () => <RctPageLoader />,
});


/*----------------- Property Match:create,list,edit---------------------*/
const AsynCreatePropertyMatchComponent = Loadable({
    loader: () => import("Routes/SideBarPropertyMatch/create"),
    loading: () => <RctPageLoader />,
});
const AsynListPropertyMatchComponent = Loadable({
    loader: () => import("Routes/SideBarPropertyMatch/list"),
    loading: () => <RctPageLoader />,
});
const AsynListPropertyMatchSearchComponent = Loadable({
    loader: () => import("Routes/SideBarPropertyMatch/property_match_search"),
    loading: () => <RctPageLoader />,
});
const AsynListPropertyMatchEditComponent = Loadable({
    loader: () => import("Routes/SideBarPropertyMatch/edit"),
    loading: () => <RctPageLoader />,
});


/*----------------- Create a contact,List contact---------------------*/
const AsyncMainTabContactComponent = Loadable({
    loader: () => import("Routes/Contact/create"),
    loading: () => <RctPageLoader />,
});
const AsyncListContactComponent = Loadable({
    loader: () => import("Routes/Contact/list"),
    loading: () => <RctPageLoader />,
});
const AsynContactDetailComponent = Loadable({
    loader: () => import("Routes/Contact/edit"),
    loading: () => <RctPageLoader />,
});
/*----------------- Doc for admin,user---------------------*/
const AsynDocumentUserComponent = Loadable({
    loader: () => import("Routes/Documents/DocUser"),
    loading: () => <RctPageLoader />,
});
const AsynDocumentAdminAdministrationComponent = Loadable({
    loader: () => import("Routes/Documents/DocAdmin/Administration"),
    loading: () => <RctPageLoader />,
});
const AsynDocumentAdminEDocumentComponent = Loadable({
    loader: () => import("Routes/Documents/DocAdmin/E-document"),
    loading: () => <RctPageLoader />,
});
const AsynDocumentAdminMarketingComponent = Loadable({
    loader: () => import("Routes/Documents/DocAdmin/Marketing"),
    loading: () => <RctPageLoader />,
});
const AsynDocumentAdminFacturationComponent = Loadable({
    loader: () => import("Routes/Documents/DocAdmin/Facturation"),
    loading: () => <RctPageLoader />,
});
const AsynDocumentUserAdministrationComponent = Loadable({
    loader: () => import("Routes/Documents/DocUser/Administration"),
    loading: () => <RctPageLoader />,
});
const AsynDocumentUserEDocumentComponent = Loadable({
    loader: () => import("Routes/Documents/DocUser/E-document"),
    loading: () => <RctPageLoader />,
});
const AsynOrderInvoicesComponent = Loadable({
    loader: () => import("Routes/Documents/DocUser/OrderInvoices"),
    loading: () => <RctPageLoader />,
});
const AsynDocumentUserMarketingComponent = Loadable({
    loader: () => import("Routes/Documents/DocUser/Marketing"),
    loading: () => <RctPageLoader />,
});
const AsynDocumentUserFacturationComponent = Loadable({
    loader: () => import("Routes/Documents/DocUser/Facturation"),
    loading: () => <RctPageLoader />,
});
//agenda
const AsynListAgendaComponent = Loadable({
    loader: () => import("Routes/Agenda/list/index"),
    loading: () => <RctPageLoader />,
});


export {
	AsyncEcommerceDashboardComponent,
    AsyncMainTabPropertyComponent,
    AsyncCreateAccountComponent,
    AsyncMainTabContactComponent,
    AsyncListContactComponent,
    AsyncListAccountComponent,
    AsyncEditAccountComponent,
    AsynContactDetailComponent,
    AsyncEditAccountProfile,
    AsyncListPropertyComponent,
    AsynPropertyDetailComponent,
    AsynCreatePropertyMatchComponent,
    AsynDocumentUserComponent,
    AsynDocumentAdminAdministrationComponent,
    AsynDocumentAdminEDocumentComponent,
    AsynDocumentAdminMarketingComponent,
    AsynDocumentAdminFacturationComponent,
    AsynListPropertyMatchComponent,
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
};
