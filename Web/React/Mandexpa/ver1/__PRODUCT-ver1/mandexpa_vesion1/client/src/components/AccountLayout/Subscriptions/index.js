/**
 * Component  Subscriptions
 */



import React, {Component} from 'react';
import IntlMessages from "Util/IntlMessages";


import {connect} from "react-redux";
import {GetDetailSubscription,
    EditSubscription,
    ListSubscription,
    DeleteSubscription,
} from "Actions";

import CreateSubscription from "./create/index";
import DeleteSubscriptions from "./delete/index";
import SubscriptionsTable from "./list";
import ModalComponent from "Components/ComponentHelper/HOCs/ModalComponent";
import ModalConfirmComponent from "Components/ComponentHelper/HOCs/ModalConfirmComponent";


const CREATE = 'create';
const EDIT = 'edit';

class Subscriptions extends Component{
    constructor(props){
        super(props);
        this.state = {
            openDialog:false,
            openDialogDelete:false,
            confirmDeleteSubs:false,
            action_modal:CREATE
        }
    }
    onToggleModalCreate = (value) =>{
        value =  typeof  value === "boolean" ?value:true;
        this.setState({
            openDialog: value
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
            this.props.DeleteSubscription({id:this.props.subscriptions.detail.id}).then(res=>{
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
        this.props.GetDetailSubscription(value);
        this.setState({
            action_modal:EDIT
        });
    };

    editSubs = (value) =>{
        if(this.props.subscriptions.list.data.length > 0){
            this.getDetailSub(value);
            this.onToggleModalCreate(true);
        }else{
            let {subscriptions} = this.props;
            let condition_listing;
            if(subscriptions !== undefined && subscriptions.condition_listing){
                condition_listing = subscriptions.condition_listing;
            }else{
                condition_listing = {page:1,rowsPerPage:5}
            }
            this.props.ListSubscription(condition_listing).then(res=>{
                if(res.data.length > 0){
                    this.getDetailSub(value);
                    this.onToggleModalCreate(true);
                }
            })
        }
    };


    deleteSubs = (value) =>{
        if(this.props.subscriptions.list.data.length > 0){
            this.getDetailSub(value);
            this.onToggleModalDelete(true);
        }else{
            let {subscriptions} = this.props;
            let condition_listing;
            if(subscriptions !== undefined && subscriptions.condition_listing){
                condition_listing = subscriptions.condition_listing;
            }else{
                condition_listing = {page:1,rowsPerPage:5}
            }
            this.props.ListSubscription(condition_listing).then(res=>{
                if(res.data.length > 0){
                    this.getDetailSub(value);
                    this.onToggleModalDelete(true);
                }
            })
        }
    };

    render() {
        const {openDialog,openDialogDelete,action_modal} = this.state;
        let modal_title = <IntlMessages id="subscriptions.add"/>;
        if(action_modal === 'edit'){
            modal_title = <IntlMessages id="subscriptions.edit"/>;
        }
        return (
            <div>
                <div className="row">
                    <div className="offset-md-10 col-md-2">
                        <button  className="btn btn-primary" onClick={this.addSubs}>
                            <IntlMessages id="subscriptions.add"/>
                        </button>
                    </div>
                </div>
                <ModalComponent
                    title={modal_title}
                    openDialog={openDialog}
                    onClose={this.onToggleModalCreate}
                >
                    <CreateSubscription action={action_modal}  onClose={this.onToggleModalCreate}  />
                </ModalComponent>

                <ModalConfirmComponent
                    title={<IntlMessages id="subscriptions.deleteOne"/>}
                    openDialog={openDialogDelete}
                    onClose={this.onToggleModalDelete}
                    handleCancel={this.handleCancelDelete}
                    handleConfirm={this.handleConfirmDelete}
                >
                    <DeleteSubscriptions
                        confirm={action_modal}
                        onClose={this.onToggleModalDelete}  />
                </ModalConfirmComponent>

                <div className="row">
                    <SubscriptionsTable
                        editSubs={this.editSubs}
                        deleteSubs={this.deleteSubs}
                    />
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state)=>{
    return {
        subscriptions:state.subscriptions
    };
};

const mapDispatchToProps = (dispatch,props)=>{
    return {
        GetDetailSubscription:(id) =>{
            return dispatch(GetDetailSubscription(id))
        },
        EditSubscription:(data) =>{
            return dispatch(EditSubscription(data))
        },
        ListSubscription:() =>{
            return dispatch(ListSubscription())
        },
        DeleteSubscription:(id) =>{
            return dispatch(DeleteSubscription(id))
        },
    }
};
export default connect(mapStatetoProps,mapDispatchToProps)(Subscriptions);