/**
 * Component  Subscriptions
 */



import React, {Component} from 'react';
import IntlMessages from "Util/IntlMessages";


import {connect} from "react-redux";
import {getDetailSubscriber,
    editSubscriptionAPI,
    listSubscriberAPI,
    deleteSubscriberAPI,
} from "Actions";

import CreateSubscribers from "./create";
import DeleteSubscriber from "./delete";
import UpgradeSubscribers from "./upgrade";
import SubscriberHistory from "./history";
import SubscribersTable from "./list";
import ModalComponent from "Components/ComponentHelper/HOCs/ModalComponent";
import ModalConfirmComponent from "Components/ComponentHelper/HOCs/ModalConfirmComponent";


const CREATE = 'create';
const EDIT = 'edit';
const UPDATE = 'update';

class Subscribers extends Component{
    constructor(props){
        super(props);
        this.state = {
            openDialog:false,
            openDialogDelete:false,
            openDialogHistory:false,
            confirmDeleteSubs:false,
            action_modal:CREATE,
            userHistory_id:null
        }
    }
    onToggleModalCreate = (value) =>{
        value =  typeof  value === "boolean" ?value:true;
        this.setState({
            openDialog: value
        })
    };

    onToggleModalHistory = (value) =>{
        value =  typeof  value === "boolean" ?value:true;
        this.setState({
            openDialogHistory: value
        })
    };

    onToggleModalDelete = (value) =>{
        value =  typeof  value === "boolean" ?value:true;
        this.setState({
            openDialogDelete: value
        })
    };


    handleConfirmDelete = () =>{
        return ()=>{
            this.props.deleteSubscriberAPI(this.props.subscribers.detail.id).then(res=>{
                this.onToggleModalDelete(false);
            });
        }
    };

    handleCancelDelete = () =>{
        return ()=>{
            this.onToggleModalDelete(false);
        }
    };

    addSubs =() =>{
        this.setState({
            openDialog: true,
            action_modal:CREATE
        })
    };


    getDetailSub = (value) =>{
        this.props.getDetailSubscriber(value);
        this.setState({
            action_modal:UPDATE
        });
    };

    editSubs = (value) =>{
        let {subscribers} = this.props;
        if( subscribers !== undefined && subscribers.list !== undefined &&  subscribers.list.data.length > 0){
            this.getDetailSub(value);
            this.onToggleModalCreate(true);
        }else{
            let {subscribers} = this.props;
            let condition_listing;
            if(subscribers !== undefined && subscribers.condition_listing){
                condition_listing = subscribers.condition_listing;
            }else{
                condition_listing = {page:1,rowsPerPage:5,order:'asc',orderBy:'id'}
            }
            this.props.listSubscriberAPI(condition_listing).then(res=>{
                if(res.data.data.length > 0){
                    this.getDetailSub(value);
                    this.onToggleModalCreate(true);
                }
            })
        }
    };

    showHistory = (value)=>{
        this.onToggleModalHistory(true);
        this.setState({
            userHistory_id:value
        })
    };


    deleteSubs = (value) =>{
        if(this.props.subscribers.list.data.length > 0){
            this.getDetailSub(value);
            this.onToggleModalDelete(true);
        }else{
            let {subscribers} = this.props;
            let condition_listing;
            if(subscribers !== undefined && subscribers.condition_listing){
                condition_listing = subscribers.condition_listing;
            }else{
                condition_listing = {page:1,rowsPerPage:5,order:'asc',orderBy:'id'}
            }
            this.props.ListSubscription(condition_listing).then(res=>{
                if(res.data.data.length > 0){
                    this.getDetailSub(value);
                    this.onToggleModalDelete(true);
                }
            })
        }
    };

    render() {
        const {openDialog,
            openDialogDelete,
            action_modal,
            openDialogHistory,
            userHistory_id,
        } = this.state;
        let modal_title = <IntlMessages id="subscribers.add"/>;
        if(action_modal === 'update'){
            modal_title = <IntlMessages id="subscribers.update"/>;
        }
        return (
            <div>
                <div className="row">
                    <div className="offset-md-10 col-md-2">
                        <button  className="btn btn-primary" onClick={this.addSubs}>
                            <IntlMessages id="subscribers.add"/>
                        </button>
                    </div>
                </div>
                <ModalComponent
                    title={modal_title}
                    openDialog={openDialog}
                    onClose={this.onToggleModalCreate}
                >
                    {
                        action_modal === CREATE && (<CreateSubscribers action={action_modal}  onClose={this.onToggleModalCreate}  />)
                    }
                    {
                        action_modal === UPDATE && (<UpgradeSubscribers action={action_modal}  onClose={this.onToggleModalCreate}  />)
                    }
                    
                </ModalComponent>

                <ModalComponent
                    title={<IntlMessages id="subscribers.subscriber.history"/>}
                    openDialog={openDialogHistory}
                    maxWidth="sm"
                    onClose={this.onToggleModalHistory}
                >
                    <SubscriberHistory user_id={userHistory_id}  onClose={this.onToggleModalHistory}  />
                </ModalComponent>


                <ModalConfirmComponent
                    title={<IntlMessages id="subscribers.deleteOne"/>}
                    openDialog={openDialogDelete}
                    onClose={this.onToggleModalDelete}
                    handleCancel={this.handleCancelDelete}
                    handleConfirm={this.handleConfirmDelete}
                >
                    <DeleteSubscriber
                        confirm={action_modal}
                        onClose={this.onToggleModalDelete}  />
                </ModalConfirmComponent>

                <div className="row">
                    <SubscribersTable
                        editSubs={this.editSubs}
                        deleteSubs={this.deleteSubs}
                        showHistory={this.showHistory}
                    />
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state)=>{
    return {
        subscribers:state.subscribers
    };
};

const mapDispatchToProps = (dispatch,props)=>{
    return {
        getDetailSubscriber:(id) =>{
            return dispatch(getDetailSubscriber(id))
        },
        editSubscriptionAPI:(data) =>{
            return dispatch(editSubscriptionAPI(data))
        },
        listSubscriberAPI:(pagination) =>{
            return dispatch(listSubscriberAPI(pagination))
        },
        deleteSubscriberAPI:(id) =>{
            return dispatch(deleteSubscriberAPI(id))
        },
    }
};
export default connect(mapStatetoProps,mapDispatchToProps)(Subscribers);