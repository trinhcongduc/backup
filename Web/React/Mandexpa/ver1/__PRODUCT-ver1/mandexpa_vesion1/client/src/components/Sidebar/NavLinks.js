// sidebar nav links
import {getAccountCurrent} from 'Helpers/helpers';
import {ACCOUNT_TYPE} from 'Constants/GeneralConfig';
var accountCurrent = getAccountCurrent();
console.log("======>Account currentin LocalStore ",accountCurrent);

export default {
	category1: [
		{
			"menu_title": "sidebar.dashboard",
			"menu_icon": "zmdi zmdi-view-dashboard",
            "path":"/app/dashboard",
            status: true,

		},
        {
            "menu_title": "sidebar.accounts",
            "menu_icon": "zmdi zmdi-account-circle",
            "child_routes": [
                {
                    "menu_title": "sidebar.account.create",
                    "menu_icon": "zmdi zmdi-account-add",
                    "path":"/app/dashboard/account/create",
                },
                {
                    "menu_title": "sidebar.account.list",
                    "path":"/app/dashboard/account/list",
                },
                // {
                //     "menu_title": "sidebar.account.subscriptions",
                //     "path":"/app/dashboard/subscriptions",
                //     permission: [ACCOUNT_TYPE.ADMIN],
                // },
                // {
                //     "menu_title": "sidebar.account.subscribers",
                //     "path":"/app/dashboard/subscribers",
                //     permission: [ACCOUNT_TYPE.ADMIN],
                // },
            ],
            permission: [ACCOUNT_TYPE.ADMIN,ACCOUNT_TYPE.AGENCY,ACCOUNT_TYPE.PROMOTER],
            status: accountCurrent.type !==ACCOUNT_TYPE.STAFF

        },
		{
            "menu_title": "sidebar.lead-contact",
            "menu_icon": "zmdi zmdi-accounts-list",
            "child_routes": [
                {
                    "menu_title": "sidebar.contact.create",
                    "path": "/app/dashboard/contact/create",
                    permission: [ACCOUNT_TYPE.STAFF,ACCOUNT_TYPE.AGENCY,ACCOUNT_TYPE.PROMOTER],
                },
                {
                    "menu_title": "sidebar.contact.list",
                    "path": "/app/dashboard/contact/list",
                }
            ],
            status:true
		},
        {
            "menu_title": "sidebar.property",
            "menu_icon": "zmdi zmdi-home",
            "child_routes": [
                {
                    "menu_title": "sidebar.property.create",
                    "path": "/app/dashboard/property/maintab",
                    permission: [ACCOUNT_TYPE.AGENCY,ACCOUNT_TYPE.PROMOTER,ACCOUNT_TYPE.STAFF],
                },
                {
                    "path": "/app/dashboard/property/list",
                    "menu_title": "sidebar.property.list"
                }
            ],
            status: true
        },
        {
            "menu_title": "sidebar.agenda",
            "menu_icon": "zmdi zmdi-calendar",
            "child_routes": [
                {
                    "menu_title": "sidebar.agenda.list",
                    "path": "/app/dashboard/agenda/list",
                },
            ],
            status: true
        },
        {
            "menu_title": "sidebar.property-matches",
            "menu_icon": "zmdi zmdi-reader",
            permission: [ACCOUNT_TYPE.AGENCY,ACCOUNT_TYPE.PROMOTER,ACCOUNT_TYPE.STAFF],
            "child_routes": [
                {
                    "menu_title": "sidebar.property-matches.create",
                    "path": "/app/dashboard/property-matches/create",
                    permission: [ACCOUNT_TYPE.AGENCY,ACCOUNT_TYPE.PROMOTER,ACCOUNT_TYPE.STAFF],
                },
                {
                    "path": "/app/dashboard/property-matches/list",
                    "menu_title": "sidebar.property-matches.list"
                },
                // {
                //     "path": "/app/dashboard/property-matches/property-matches-search",
                //     "menu_title": "sidebar.property-matches.search"
                // }
            ],
            status: true
        },
        {
            "menu_title": "sidebar.document",
            "menu_icon": "zmdi zmdi-aspect-ratio-alt",
            "child_routes": [
                {
                    "menu_title": "sidebar.document_admin.e-document",
                    "path": "/app/dashboard/document/admin/e-document",
                    permission: [ACCOUNT_TYPE.ADMIN],
                },
                {
                    "menu_title": "sidebar.document_admin.administration",
                    "path": "/app/dashboard/document/admin/administration",
                    permission: [ACCOUNT_TYPE.ADMIN],
                },
                {
                    "menu_title": "sidebar.document_admin.marketing",
                    "path": "/app/dashboard/document/admin/marketing",
                    permission: [ACCOUNT_TYPE.ADMIN],
                },
                // {
                //     "menu_title": "sidebar.document_admin.facturation",
                //     "path": "/app/dashboard/document/admin/facturation",
                //     permission: [ACCOUNT_TYPE.ADMIN],
                // },
                {
                    "menu_title": "sidebar.document_admin.e-document",
                    "path": "/app/dashboard/document/user/e-document",
                    permission: [ACCOUNT_TYPE.AGENCY,ACCOUNT_TYPE.PROMOTER,ACCOUNT_TYPE.STAFF],
                },
                {
                    "menu_title": "sidebar.document_admin.administration",
                    "path": "/app/dashboard/document/user/administration",
                    permission: [ACCOUNT_TYPE.AGENCY,ACCOUNT_TYPE.PROMOTER,ACCOUNT_TYPE.STAFF],
                },
                {
                    "menu_title": "sidebar.document_admin.marketing",
                    "path": "/app/dashboard/document/user/marketing",
                    permission: [ACCOUNT_TYPE.AGENCY,ACCOUNT_TYPE.PROMOTER,ACCOUNT_TYPE.STAFF],
                },
                // {
                //     "menu_title": "sidebar.document_admin.facturation",
                //     "path": "/app/dashboard/document/user/facturation",
                //     permission: [ACCOUNT_TYPE.AGENCY,ACCOUNT_TYPE.PROMOTER,ACCOUNT_TYPE.STAFF],
                // },
                {
                    "menu_title": "sidebar.document_admin.facturation",
                    "path": "/app/dashboard/document/orders/invoices",
                    permission: [ACCOUNT_TYPE.ADMIN,ACCOUNT_TYPE.AGENCY,ACCOUNT_TYPE.PROMOTER,ACCOUNT_TYPE.STAFF],
                },
            ],
            status: true
        }

	]
}
