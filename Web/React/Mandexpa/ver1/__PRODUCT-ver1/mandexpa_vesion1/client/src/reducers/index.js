/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import settings from './settings';
import chatAppReducer from './ChatAppReducer';
import emailAppReducer from './EmailAppReducer';
import sidebarReducer from './SidebarReducer';
import todoAppReducer from './TodoAppReducer';
import authUserReducer from './AuthUserReducer';
import feedbacksReducer from './FeedbacksReducer';
import ecommerceReducer from './EcommerceReducer';
import ConfigDataReducers from './ConfigDataReducers';
import contactReducer from './ContactReducer';
import countryReducer from './CountryReducer';
import citiesReducer from './CityReducer';
import AccountsReducer from './AccountsReducer';
import authLogin from './AuthLoginReducer';
import contacttype from './ContactTypeReducer';
import propertyDatas from './PropertyAPIReducer';
import propertyFields from './PropertyFieldsReducer';
import upLoadDocument from './UploadDocumentReducer';
import documents from './DocumentReducer';
import property_matches  from './PropertyMatchReducer';
import agenda  from './AgendaReducer';
import subscriptions  from './SubscriptionsReducer';
import subscribers  from './SubscribersReducer';

const reducers = combineReducers({
    settings,
    chatAppReducer,
    emailApp: emailAppReducer,
    sidebar: sidebarReducer,
    todoApp: todoAppReducer,
    authUser: authUserReducer,
    feedback: feedbacksReducer,
    ecommerce: ecommerceReducer,
    configdata:ConfigDataReducers,
    contacttype : contacttype,
    contact : contactReducer,
    country : countryReducer,
    cities : citiesReducer,
    uploadDocument : upLoadDocument,
    authLogin,
    accounts:AccountsReducer,
    propertyDatas,
    propertyFields,
    documents,
    property_matches,
    agenda,
    subscriptions,
    subscribers,
});

export default reducers;
