import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getDeletePropertyByID, getListProperty,addListPropertySeen,CancellationRequest} from 'Actions/index'
import ContactTableToolbar from "./PropertyTableToolbar";
import ContactTableHead from "./PropertyTableHead";
import {Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SearchProperty from './SearchProperty';
import {URL_SERVER,LINK_CCGU_CGPS} from "Constants/GeneralConfig";
import {getAccountCurrent,numberWithCommas,displayPriceWithCurrency} from "Helpers";
import moment from "moment";
import {status_property, PROPERTY_TYPE} from "Constants/ComponentConfigs/PropertyConfig"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownUpload from "./DropdownUpload"
import classNames from 'classnames';
import {property_public_marketing} from "Constants/ComponentConfigs";
import ModalHOCs from "Components/ComponentHelper/HOCs/ModalComponent";
import AutoCropImage from "Components/ComponentHelper/ComponentBase(building...)/AutoCropImage";
import IntlMessages from "Util/IntlMessages";
import MarketingUrl from "./MarketingUrl";

let counter = 0;
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function createData(id,code,price,textmoney,primaryImage,logo,user_create,ville,number_bedroom,type_mandate,host_name,living_space,update_at,created_by,status_mandate,color,title_property,marketing_data,doc_offer) {
    counter += 1;
    return { index: counter,id,code,price,textmoney,primaryImage,logo,user_create,ville,number_bedroom,type_mandate,host_name,living_space,update_at,created_by,status_mandate,color,title_property,marketing_data,doc_offer};
}
const styles = theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#07c1bb',
            outline: '1px solid slategrey',
            borderRadius:'2px'
        },
        '*::-webkit-scrollbar-corner ':{
            background: 'rgba(0,0,0,0.5)'
        }
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth:" 100%",
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    logo:{
        '&:hover':{
            border:'1px solid #614194'
        }
    },
    image_agent:{
        float:'left',
        width: '4em',
        margin: '0px 20%',
    },
    agent_infor:{
        clear:'both',
        fontSize:'10px',
        float:'left'
    },
    pd_5:{
        padding:"5px"
    },
    wd5_percent:{
        width:'5%'
    },
    wd7_percent:{
        width:'7%'
    },
    wd8_percent:{
        width:'8%'
    },
    wd10_percent:{
        width:'10%'
    },
    table_content:{
        // height: "200px",
        // overflowY: "scroll"
    },
    scroll_action:{
        overflowY: 'scroll',
        height: '5em',
        margin:'0px'
    },
    public_action:{
        width: '10em',
        padding: '0px 13px',
        fontSize: '10px',
        fontWeight:'bold',
        color:'#fff',
        margin: '4px',
        borderRadius: '5px',
        cursor:'pointer',
        border:'1px'
    }
});

class ListProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'desc',
            orderBy: 'property.id',
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 5,
            open: false,
            id_property : null,
            id_property_cgu : null,
            open_cgu : false,
            toggleFilter:false,
            toggleUpload:null,
            toggleUrlPublic:false,
            marketing_pid:null,
            marketing_type:null,
            marketing_input:null,
        };
    }


    componentDidMount() {
        this.updateListData();
    }

    componentWillUnmount() {
        this.props.CancellationRequest("Cancel get list");
    }

    updateListData = () =>{
        let {properties} =  this.props;
        let pagination = {
            page:1,
            rowsPerPage:5,
            orderBy:'property.id',
            order:'asc'};
        if(properties !== undefined && properties.condition_listing !== undefined){
            pagination = properties.condition_listing
        }
        this.props.getListProperty(null,pagination)
            .then(res=>{
                // console.log("resLIST-==>",res.data);
            }).catch(err=>{
                // console.log("Cancelled");
            });
    };
    
    updateListbyPagination = () =>{
        const {order,orderBy,page,rowsPerPage} = this.state;
        this.props.getListProperty(null,{order,orderBy,page:page+1,rowsPerPage});
    };
    
    
    componentWillReceiveProps(nextProps, nextContext) {
        let {properties} =  nextProps;
        if(properties !== undefined && properties.list_property !== undefined && properties.list_property.data !== undefined ){
            const {data} = properties.list_property;
            let datas = data.map((property) => {
                try {
                    let currency =  property.currency?JSON.parse(property.currency) : null;
                    let money = "";
                    if(currency===null){
                    }
                    else {
                        money = currency.label;
                    }
                    let date = property.updated_at!==null?new Date(property.updated_at):"";
                    let date_update = property.updated_at!==null?moment(date).format('DD/MM/YYYY'):"";
                    let id = property.property_id!==null?property.property_id:"";
                    let code = property.code!==null?property.code:"";
                    let price = numberWithCommas(property.number_pay!==null?property.number_pay:"");
                    price = displayPriceWithCurrency(price);

                    let update_at = date_update;
                    let textmoney = money;
                    let primaryImage = property.image!==null?property.image:"";
                    let ville = property.title_town!==null?property.title_town:"";
                    let living_space = property.living_space!==null?property.living_space+" m²":"m²";
                    let number_bedroom = property.number_bedroom!==null?property.number_bedroom:"";
                    let type_mandate = property.sub_type_property!==null?property.sub_type_property:"";
                    let host_name = property.host_1!==null?(JSON.parse(property.host_1)).name:"";
                    let logo = primaryImage ===null || primaryImage === ""?"":( URL_SERVER + primaryImage);
                    let status_mandate = property.status_mandate!==null?property.status_mandate:"";
                    let status = "";
                    let color = "";
                    let user_create = {
                        logo:URL_SERVER + property.logo,
                        firstname:property.firstname,
                        lastname:property.lastname,
                    };

                    let doc_offer = {
                        doc_visit:property.doc_visit,
                        doc_purchase:property.doc_purchase,
                    }
                    if(property.type === PROPERTY_TYPE.type.SALE){
                        status_property.sale.map((item)=>{
                            if(item.value === status_mandate){
                                status = item.label;
                                color = item.color
                            }
                        })
                    }
                    if(property.type === PROPERTY_TYPE.type.RENT){
                        status_property.rent.map((item)=>{
                            if(item.value === status_mandate){
                                status = item.label;
                                color = item.color
                            }
                        })
                    }
                    let title_property = property.title_des!==null?property.title_des:"";
                    let marketing_data =  property.marketing_data;
                    return createData(id,code,price,textmoney,primaryImage,logo,user_create,ville,number_bedroom,type_mandate,host_name,living_space,update_at,property.created_by,status,color,title_property,marketing_data,doc_offer);
                }
                catch (e) {
                    console.log('--------------',e)
                }

            });
            this.setState({
                data:datas
            })
        }
    }

    toggleFilter =() =>{
        this.setState({
            toggleFilter:!this.state.toggleFilter,
        })
    };


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy },()=>{
            this.updateListbyPagination();
        });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page },()=>{
            this.updateListbyPagination();
        });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value },()=>{
            this.updateListbyPagination();
        });
    };
    handleClickOpen(id) {
        this.setState({ open: true,id_property : id });
    }

    handleClose() {
        this.setState({ open: false,id_property : null });
    }
    handleClickOpenCGU(id) {

        let properties_seen = (getAccountCurrent().properties_seen!==null && getAccountCurrent().properties_seen!=="")?JSON.parse(getAccountCurrent().properties_seen):[];
        let check = false;
        if(properties_seen.length > 0){
            properties_seen.map(item => {
                if(item===id){
                    check = true
                }
            })
        }
        if(check){
            this.setState({ open_cgu: false,id_property_cgu : null });

            this.props.history.push('/app/dashboard/property/edit/'+ id)
        }
        else {
            this.setState({ open_cgu: true,id_property_cgu : id })
        }

    }

    handleCloseCGU() {
        this.setState({ open_cgu: false,id_property_cgu : null });
    }
    chooseYes = (id) => {
        this.props.addListPropertySeen(id).then(
            this.props.history.push('/app/dashboard/property/edit/'+ id)
        )
    };
    deleteProperty = (id) => {
        this.props.getDeletePropertyByID(id).then(
            // this.props.getListProperty()
            this.updateListData()
        ).then(
            this.handleClose()
        )
    };

    propertyToggleUpload = (value) =>{
        const {toggleUpload} = this.state;
        if(toggleUpload === value){
            this.setState({
                toggleUpload:null
            })
        }
        else{
            this.setState({
                toggleUpload:value
            })
        }
    };
    toggleModalUrlPublic = (id,type,input) =>{
        let marketing_pid = this.state.toggleUrlPublic === true?null:id;
        let marketing_type = this.state.toggleUrlPublic === true?null:type;
        let marketing_input = this.state.toggleUrlPublic === true?null:input;
        this.setState({
            toggleUrlPublic:!this.state.toggleUrlPublic,
            marketing_pid:marketing_pid,
            marketing_type:marketing_type,
            marketing_input:marketing_input,

        })
    };



    closeModal = () =>{
        this.toggleModalUrlPublic();
        this.updateListData();
    };

    handleShowProperty = (id) =>{
        this.props.history.push("/app/dashboard/property/edit/"+id)
    };

    conditionShowMarketingAction = (data_item,creator_id) =>{
        const user_id = getAccountCurrent().id;
        if(data_item.url  === "http://" || data_item.url ===null){
            if(data_item.value === 1){
                return true;
            }
            if(data_item.value === 2 && (data_item.agency === user_id || creator_id === user_id   )  ){
                return true;
            }
            if(data_item.value === 4){
                return true;
            }
        }
        return false;
    };

    renderListMarketing = (id,marketing_data,creator_id) =>{
        const { classes} = this.props;

        let dom = [];
        let keys_data = Object.keys(marketing_data);

        keys_data.map((item,index) => {
           if(this.conditionShowMarketingAction( marketing_data[item],creator_id)){
               dom.push(<li key={index}>
                   <button className={classNames("d-flex justify-content-between",classes.public_action)}
                           style={{backgroundColor:property_public_marketing[item].color}}
                           onClick={()=>this.toggleModalUrlPublic(id,item,marketing_data[item].url_input)}
                   >
                       <span> </span>
                       <span>{property_public_marketing[item].label} </span>
                       <span><FontAwesomeIcon icon={['fas','chevron-right']}/></span>
                   </button>
               </li>)
           }
           return null;
        });
        return dom;
    };
    
    
    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes,properties} = this.props;
        const { data, order,
            orderBy, selected,
            rowsPerPage, page,
            toggleFilter,toggleUpload,
            toggleUrlPublic,
            marketing_pid ,
            marketing_type ,
            marketing_input ,
        } = this.state;
        let counter_data =  (properties !== undefined && properties.list_property !== undefined && properties.list_property.count !== undefined) ? properties.list_property.count : 0;
        let user_id = getAccountCurrent().id;
        return (

            <div>

                {/*The confirmation dialog displays the property details.*/}
                <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"CONFIRMER LA SUPPRESSION"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Content : Êtes-vous sûr de vouloir supprimer ce bien ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button raised="true" onClick={() => this.deleteProperty(this.state.id_property)} className="btn-primary text-white" autoFocus> J’accepte </Button>
                        <Button raised="true" onClick={() => this.handleClose()} className="btn-danger text-white"> Je refuse  </Button>
                    </DialogActions>
                </Dialog>

                {/*The CGU license confirmation dialog box. */}
                <Dialog open={this.state.open_cgu} onClose={() => this.handleCloseCGU()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Vous devez accepter les conditions générales d’utilisation
                            Mandexpa pour accéder au détail de ce bien.
                            <br/>
                            <br/>
                            <a href={LINK_CCGU_CGPS} target="_blank">Lire les conditions générales d’utilisation</a>
                            <br/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button raised="true" onClick={() => this.chooseYes(this.state.id_property_cgu)} className="btn-primary text-white" autoFocus> J’accepte  </Button>
                        <Button raised="true" onClick={() => this.handleCloseCGU()} className="btn-danger text-white"> Je refuse  </Button>
                    </DialogActions>
                </Dialog>

                {/*Toggle advanced filter search*/}
                {toggleFilter && (<SearchProperty />) }

                {/*Dialog enter Agency's url marketing */}
                <ModalHOCs openDialog={toggleUrlPublic}
                           maxWidth='sm'
                           onClose={this.toggleModalUrlPublic}
                           title={<IntlMessages id={"property.list.modal.marketing_title"} />}
                >
                    {toggleUrlPublic && (
                        <MarketingUrl
                            id={marketing_pid}
                            type={marketing_input}
                            name={marketing_type}
                            onClose={ this.closeModal}
                        />)}

                </ModalHOCs>

                {/*Table list properties*/}
                <Paper className={classes.root}>
                    <ContactTableToolbar  counter_data={counter_data} onFilter={this.toggleFilter}/>
                    <div className={classNames(classes.tableWrapper,classes.table_content)}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <ContactTableHead
                                order={order}
                                orderBy={orderBy}
                                numSelected={selected.length}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {data.map((item) => {
                                        const isSelected = this.isSelected(item.id);
                                        return (
                                            <TableRow
                                                hover
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={item.index}
                                                selected={isSelected}
                                                className="borderList list_row"
                                            >
                                                <TableCell align="right" className={classNames("border0",classes.pd_5,classes.wd5_percent)}>{item.update_at}</TableCell>
                                                <TableCell align="right" className={classNames("border0",classes.pd_5,classes.wd10_percent)}>

                                                    <img className={classNames("card-img-top imgListProperty",classes.logo)}
                                                         src={item.logo}
                                                         onClick={()=>this.handleShowProperty(item.id)}
                                                         alt="Card image cap" />
                                                </TableCell>
                                                <TableCell align="right" className={classNames("border0",classes.pd_5,classes.wd7_percent)}>{item.title_property}</TableCell>
                                                <TableCell align="right" className={classNames("border0",classes.pd_5,classes.wd10_percent)}>{item.code}</TableCell>
                                                <TableCell align="center" className={classNames("border0",classes.pd_5,classes.wd8_percent)}>
                                                    <AutoCropImage
                                                        src={item.user_create.logo}
                                                        imageSize={{height:'40px',width:'40px'}}
                                                    />
                                                    <p className={classNames(classes.agent_infor)}>{item.user_create.firstname + " " + item.user_create.lastname}</p>
                                                </TableCell>
                                                <TableCell align="right" className={classNames("border0",classes.pd_5,classes.wd10_percent)}><div style={{color : item.color}}>{item.status_mandate}</div></TableCell>
                                                <TableCell align="center" className={classNames("border0",classes.pd_5,classes.wd8_percent)}>{item.type_mandate}</TableCell>
                                                <TableCell align="right" className={classNames("border0",classes.pd_5,classes.wd8_percent)}>{item.ville}</TableCell>
                                                <TableCell align="right" className={classNames("border0",classes.pd_5,classes.wd7_percent)}>{item.price}</TableCell>
                                                <TableCell align="right" className={classNames("border0",classes.pd_5,classes.wd5_percent)}>{item.living_space}</TableCell>
                                                <TableCell align="right" className={classNames("border0",classes.pd_5,classes.wd5_percent)}>{item.living_space}</TableCell>
                                                <TableCell align="center" className={classNames("border0",classes.pd_5,classes.wd7_percent)}>{item.number_bedroom}</TableCell>
                                                <TableCell align="right" className={classNames("action_cell",classes.pd_5,classes.wd10_percent)}>
                                                    <div className="  d-flex justify-content-between">
                                                        <span> </span>
                                                        {/*<div>*/}
                                                            {/*{user_id === item.created_by ?*/}
                                                                {/*<button className="btn-default iconMg">*/}
                                                                    {/*<Link  to={{*/}
                                                                        {/*pathname:'/app/dashboard/property/edit/'+item.id,*/}
                                                                    {/*}}*/}
                                                                    {/*>*/}
                                                                        {/*<FontAwesomeIcon icon={['fas','edit']}/>*/}
                                                                    {/*</Link>*/}
                                                                {/*</button>:*/}
                                                                {/*<button className="btn-default iconMg" onClick={() => this.handleClickOpenCGU(item.id)}>*/}
                                                                    {/*<FontAwesomeIcon icon={['fas','eye']}/>*/}
                                                                {/*</button>*/}
                                                            {/*}*/}
                                                            {/*<button className="btn-default iconMg">*/}
                                                                {/*<FontAwesomeIcon icon={['fas','download']}/>*/}
                                                            {/*</button>*/}
                                                            {/*{user_id === item.created_by ?*/}
                                                                {/*<button className="btn-default iconMg" onClick={() => this.handleClickOpen(item.id)}>*/}
                                                                    {/*<FontAwesomeIcon icon={['fas','trash-alt']}/>*/}
                                                                {/*</button> : ""*/}
                                                            {/*}*/}
                                                        {/*</div>*/}
                                                        <div>
                                                            <ul className={classNames("list-unstyled",classes.scroll_action)}>
                                                                {this.renderListMarketing(item.id,item.marketing_data,item.created_by)}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <DropdownUpload
                                                                id={item.id}
                                                                docs={item.doc_offer}
                                                                onToggle={this.propertyToggleUpload}
                                                                open={toggleUpload === item.id}
                                                            />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5,10, 20, 30]}
                        component="div"
                        count={counter_data}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );
    }
}


ListProperty.defaultProps = {
    // toggleFilter: true
};

ListProperty.propTypes = {
    classes: PropTypes.object.isRequired,
    // toggleFilter:PropTypes.bool
};

const mapStateToProps = (state)=>{
    return {
        properties : state.propertyDatas
    }
};

const  mapDispatchToProps = (dispatch)=>{
    return {
        getListProperty:(filter,pagination)=>{
            return dispatch( getListProperty(filter,pagination))
        },
        getDeletePropertyByID:(id)=>{
            return dispatch(getDeletePropertyByID(id))
        },
        addListPropertySeen:(id)=>{
            return dispatch(addListPropertySeen(id))
        },
        CancellationRequest:(mess)=>{
            dispatch(CancellationRequest(mess))
        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withRouter(ListProperty)));