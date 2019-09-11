/**
 * App Redux Action Types
 */
export const COLLAPSED_SIDEBAR = 'COLLAPSED_SIDEBAR';
export const DARK_MODE = 'DARK_MODE';
export const BOXED_LAYOUT = 'BOXED_LAYOUT';
export const RTL_LAYOUT = 'RTL_LAYOUT';
export const MINI_SIDEBAR = 'MINI_SIDEBAR';
export const SEARCH_FORM_ENABLE = 'SEARCH_FORM_ENABLE';
export const CHANGE_THEME_COLOR = 'CHANGE_THEME_COLOR';
export const TOGGLE_SIDEBAR_IMAGE = 'TOGGLE_SIDEBAR_IMAGE';
export const SET_SIDEBAR_IMAGE = 'SET_SIDEBAR_IMAGE';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const START_USER_TOUR = 'START_USER_TOUR';
export const STOP_USER_TOUR = 'STOP_USER_TOUR';
export const TOGGLE_DARK_SIDENAV = 'TOGGLE_DARK_SIDENAV';

// Chat App Actions
export const CHAT_WITH_SELECTED_USER = 'CHAT_WITH_SELECTED_USER';
export const SEND_MESSAGE_TO_USER = 'SEND_MESSAGE_TO_USER';
export const UPDATE_USERS_SEARCH = 'UPDATE_USERS_SEARCH';
export const SEARCH_USERS = 'SEARCH_USERS';
export const GET_RECENT_CHAT_USERS = 'GET_RECENT_CHAT_USERS';

// Agency Sidebar
export const AGENCY_TOGGLE_MENU = 'AGENCY_TOGGLE_MENU';
export const CHANGE_AGENCY_LAYOUT_BG = 'CHANGE_AGENCY_LAYOUT_BG';

// Mail App
export const GET_EMAILS = 'GET_EMAILS';
export const GET_EMAIL_SUCCESS = 'GET_EMAIL_SUCCESS';
export const GET_EMAIL_FAILURE = 'GET_EMAIL_FAILURE';
export const SET_EMAIL_AS_STAR = 'SET_EMAIL_AS_STAR';
export const READ_EMAIL = 'READ_EMAIL';
export const HIDE_LOADING_INDICATOR = 'HIDE_LOADING_INDICATOR';
export const FETCH_EMAILS = 'FETCH_EMAILS';
export const ON_SELECT_EMAIL = 'ON_SELECT_EMAIL';
export const UPDATE_EMAIL_SEARCH = 'UPDATE_EMAIL_SEARCH';
export const SEARCH_EMAIL = 'SEARCH_EMAIL';
export const ON_DELETE_MAIL = 'ON_DELETE_MAIL';
export const ON_BACK_PRESS_NAVIGATE_TO_EMAIL_LISTING = 'ON_BACK_PRESS_NAVIGATE_TO_EMAIL_LISTING';
export const GET_SENT_EMAILS = 'GET_SENT_EMAILS';
export const GET_INBOX = 'GET_INBOX';
export const GET_DRAFTS_EMAILS = 'GET_DRAFTS_EMAILS';
export const GET_SPAM_EMAILS = 'GET_SPAM_EMAILS';
export const GET_TRASH_EMAILS = 'GET_TRASH_EMAILS';
export const ON_EMAIL_MOVE_TO_FOLDER = 'ON_EMAIL_MOVE_TO_FOLDER';
export const SELECT_ALL_EMAILS = 'SELECT_ALL_EMAILS';
export const UNSELECT_ALL_EMAILS = 'UNSELECT_ALL_EMAILS';
export const ON_SEND_EMAIL = 'ON_SEND_EMAIL';
export const EMAIL_SENT_SUCCESSFULLY = 'EMAIL_SENT_SUCCESSFULLY';
export const FILTER_EMAILS_WITH_LABELS = 'FILTER_EMAILS_WITH_LABELS';
export const ADD_LABELS_INTO_EMAILS = 'ADD_LABELS_INTO_EMAILS';

// sidebar
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const UPDATE_SIDER_BAR = 'UPDATE_SIDER_BAR';

// ToDo App
export const GET_TODOS = 'GET_TODOS';
export const FETCH_TODOS = 'FETCH_TODOS';
export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const ON_SELECT_TODO = 'ON_SELECT_TODO';
export const ON_HIDE_LOADER = 'ON_HIDE_LOADER';
export const ON_BACK_TO_TODOS = 'ON_BACK_TO_TODOS';
export const ON_SHOW_LOADER = 'ON_SHOW_LOADER';
export const MARK_AS_STAR_TODO = 'MARK_AS_STAR_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const ADD_LABELS_INTO_THE_TASK = 'ADD_LABELS_INTO_THE_TASK';
export const GET_ALL_TODO = 'GET_ALL_TODO';
export const GET_COMPLETED_TODOS = 'GET_COMPLETED_TODOS';
export const GET_DELETED_TODOS = 'GET_DELETED_TODOS';
export const GET_STARRED_TODOS = 'GET_STARRED_TODOS';
export const GET_FILTER_TODOS = 'GET_FILTER_TODOS';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const UPDATE_TASK_TITLE = 'UPDATE_TASK_TITLE';
export const UPDATE_TASK_DESCRIPTION = 'UPDATE_TASK_DESCRIPTION';
export const CHANGE_TASK_ASSIGNER = 'CHANGE_TASK_ASSIGNER';
export const ON_CHECK_BOX_TOGGLE_TODO_ITEM = 'ON_CHECK_BOX_TOGGLE_TODO_ITEM';
export const SELECT_ALL_TODO = 'SELECT_ALL_TODO';
export const GET_UNSELECTED_ALL_TODO = 'GET_UNSELECTED_ALL_TODO';
export const SELECT_STARRED_TODO = 'SELECT_STARRED_TODO';
export const SELECT_UNSTARRED_TODO = 'SELECT_UNSTARRED_TODO';
export const ON_LABEL_SELECT = 'ON_LABEL_SELECT';
export const ON_LABEL_MENU_ITEM_SELECT = 'ON_LABEL_MENU_ITEM_SELECT';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const SEARCH_TODO = 'SEARCH_TODO';

// Auth Actions
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';

// Feedbacks
export const GET_FEEDBACKS = 'GET_FEEDBACKS';
export const GET_FEEDBACKS_SUCCESS = 'GET_FEEDBACKS_SUCCESS';
export const GET_ALL_FEEDBACKS = 'GET_ALL_FEEDBACKS';
export const ON_CHANGE_FEEDBACK_PAGE_TABS = 'ON_CHANGE_FEEDBACK_PAGE_TABS';
export const MAKE_FAVORITE_FEEDBACK = 'MAKE_FAVORITE_FEEDBACK';
export const ON_DELETE_FEEDBACK = 'ON_DELETE_FEEDBACK';
export const VIEW_FEEDBACK_DETAILS = 'VIEW_FEEDBACK_DETAILS';
export const ADD_NEW_FEEDBACK = 'ADD_NEW_FEEDBACK';
export const SHOW_FEEDBACK_LOADING_INDICATOR = 'SHOW_FEEDBACK_LOADING_INDICATOR';
export const HIDE_FEEDBACK_LOADING_INDICATOR = 'HIDE_FEEDBACK_LOADING_INDICATOR';
export const NAVIGATE_TO_BACK = 'NAVIGATE_TO_BACK';
export const REPLY_FEEDBACK = 'REPLY_FEEDBACK';
export const SEND_REPLY = 'SEND_REPLY';
export const UPDATE_SEARCH_IDEA = 'UPDATE_SEARCH_IDEA';
export const ON_SEARCH_IDEA = 'ON_SEARCH_IDEA';
export const ON_COMMENT_FEEDBACK = 'ON_COMMENT_FEEDBACK';

// ecommerce
export const ON_DELETE_ITEM_FROM_CART = 'ON_DELETE_ITEM_FROM_CART';
export const ON_QUANTITY_CHANGE = 'ON_QUANTITY_CHANGE';
export const ON_ADD_ITEM_TO_CART = 'ON_ADD_ITEM_TO_CART';

// users
export const CREATE_NEW_USER = 'CREATE_NEW_USER';
export const GET_ACCOUNT_BYID = 'GET_ACCOUNT_BYID';
export const GET_ACCOUNTS = 'GET_ACCOUNTS';
export const GET_ACCOUNTS_BY_CONDITIONS = 'GET_ACCOUNTS_BY_CONDITIONS';
export const GET_LIST_ACCOUNTS_BY_CONDITIONS = 'GET_LIST_ACCOUNTS_BY_CONDITIONS';
export const GET_CURRENT_ACCOUNT = 'GET_CURRENT_ACCOUNT';
export const GET_ORDER_INVOICES = 'GET_ORDER_INVOICES';
export const GET_AGENCYS = 'GET_AGENCYS';
export const GET_STAFFS = 'GET_STAFFS';
export const CURRENT_ACCOUNT_LOGGIN = 'CURRENT_ACCOUNT_LOGGIN';
export const GET_AUTHENTICATION = 'GET_AUTHENTICATION';
export const GET_LOGIN = 'GET_LOGIN';

//contact
export const CREATE_NEW_CONTACT = "CREATE_NEW_CONTACT";
export const GET_LIST_CONTACT = "GET_LIST_CONTACT";
export const GET_CONTACT_DETAIL = "GET_CONTACT_DETAIL";
export const UPDATE_A_CONTACT = "UPDATE_A_CONTACT";
export const GET_CONTACT_TYPE = "GET_CONTACT_TYPE";
//locations
export const GET_ALL_COUNTRY ="GET_ALL_COUNTRY";
export const GET_ALL_CITY ="GET_ALL_CITY";


//Property action
export const UPDATE_FIELD ="UPDATE_FIELD";
export const UPDATE_FAC_PARENT ="UPDATE_FAC_PARENT";
export const UPDATE_FAC_CHILD ="UPDATE_FAC_CHILD";
export const UPDATE_TYPE_PROPERTY_PARENT ="UPDATE_TYPE_PROPERTY_PARENT";
export const UPDATE_TYPE_PROPERTY_CHILD ="UPDATE_TYPE_PROPERTY_CHILD";
export const UPDATE_CAT_PROPERTY ="UPDATE_CAT_PROPERTY";
export const CLEAR_DATA_PROPERTY_DETAILS ="CLEAR_DATA_PROPERTY_DETAILS";
export const UPDATE_ROOM_TYPE ="UPDATE_ROOM_TYPE";
export const SET_SALE_PLAN = "SET_SALE_PLAN";
export const UPDATE_TAB_MAIN_FIELDS = "UPDATE_TAB_MAIN_FIELD";
export const UPDATE_TAB_LOCATION_FIELDS = "UPDATE_TAB_LOCATION_FIELD";
export const UPDATE_TAB_DESCRIPTION_FIELDS = "UPDATE_TAB_DESCRIPTION_FIELD";
export const UPDATE_TAB_CHARACTERISTIC_FIELDS = "UPDATE_TAB_CHARACTERISTIC_FIELD";
export const UPDATE_TAB_MEDIA_FIELDS = "UPDATE_TAB_MEDIA_FIELDS";
export const UPDATE_TAB_DOCUMENT_FIELDS = "UPDATE_TAB_DOCUMENT_FIELDS";
export const UPDATE_TAB_MARKETING_FIELDS = "UPDATE_TAB_MARKETING_FIELDS";
export const UPDATE_TAB_REORDER_FIELDS = "UPDATE_TAB_REORDER_FIELDS";
export const EDIT_IMAGE_TAB_MEDIA = "EDIT_IMAGE_TAB_MEDIA";
export const UPDATE_TYPEOF_PROPERTY = "UPDATE_TYPEOF_PROPERTY";
export const SAVE_PRETAB_PROPERTY = "SAVE_PRETAB_PROPERTY";
export const CREATE_NEW_HOST = "CREATE_NEW_HOST";
export const CHOOSE_CONTACT = "CHOOSE_CONTACT";
export const GET_LIST_PROPERTY = "GET_LIST_PROPERTY";
export const GET_PROPERTY_DETAIL = "GET_PROPERTY_DETAIL";
export const PROPERTY_UPLOAD_IMAGE = "PROPERTY_UPLOAD_IMAGE";
export const PROPERTY_ADVANCED_FILTER = "PROPERTY_ADVANCED_FILTER";
export const CLEAR_PROPERTY = "CLEAR_PROPERTY";
export const TAB_HAS_FIELD_REQUIRED = "TAB_HAS_FIELD_REQUIRED";
export const CHANGE_TAB = "CHANGE_TAB";
export const DETAIL_HOST = "DETAIL_HOST";


// document
export const UPLOAD_DOCUMENT_BY_ADMIN = "UPLOAD_DOCUMENT_BY_ADMIN";
export const  GET_ALL_FILE = " GET_ALL_FILE";


// Property Match
export const UPDATE_FIELDS_PROPERTY_MATCH = "UPDATE_FIELDS_PROPERTY_MATCH";
export const CLEAR_PROPERTY_MATCHES_DATA_EDIT = "CLEAR_PROPERTY_MATCHES_DATA_EDIT";
export const GET_LIST_PROPERTY_MATCH = "GET_LIST_PROPERTY_MATCH";
export const UPDATE_DATA_PROPERTY_EDIT = "UPDATE_DATA_PROPERTY_EDIT";
export const UPDATE_DATA_MATCHIN_PROPERTY = "UPDATE_DATA_MATCHIN_PROPERTY";


//location
export const GET_CITY = "GET_CITY";
export const GET_REGIONS = "GET_REGIONS";
//Agenda
export const GET_LIST_AGENDA = "GET_LIST_AGENDA";


// Subscriptions

export const GET_LIST_SUBSCRIPTIONS = "GET_LIST_SUBSCRIPTIONS";
export const UPDATE_LIST_SUBSCRIPTIONS = "UPDATE_LIST_SUBSCRIPTIONS";
export const UPDATE_SUBSCRIPTION = "UPDATE_SUBSCRIPTION";
export const GET_DETAIL_SUBSCRIPTION = "GET_DETAIL_SUBSCRIPTION";
export const DELETE_SUBSCRIPTION = "DELETE_SUBSCRIPTION";


// Subscribers

export const GET_LIST_SUBSCRIBERS = "GET_LIST_SUBSCRIBERS";
export const UPDATE_LIST_SUBSCRIBERS = "UPDATE_LIST_SUBSCRIBERS";
export const UPDATE_SUBSCRIBERS = "UPDATE_SUBSCRIBERS";
export const GET_DETAIL_SUBSCRIBERS = "GET_DETAIL_SUBSCRIBERS";
export const DELETE_SUBSCRIBERS = "DELETE_SUBSCRIBERS";
export const UPDATE_SUBSCRIBER_USERS = "UPDATE_SUBSCRIBER_USERS";
export const UPGRADE_SUBSCRIBER_USERS_PACKAGE = "UPGRADE_SUBSCRIBER_USERS_PACKAGE";

