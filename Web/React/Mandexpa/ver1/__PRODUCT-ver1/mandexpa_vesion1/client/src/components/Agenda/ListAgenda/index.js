import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getListAgenda, changeStatusAgenda} from 'Actions/index'
import IntlMessages from "Util/IntlMessages";
import {displayPriceWithCurrency, getAccountCurrent, numberWithCommas} from "Helpers";
import moment from "moment";
import {URL_SERVER} from "Constants/GeneralConfig";
import {configDateFormat} from "Constants/DateConfig";
import AgendaTableToolbar from "./PropertyTableToolbar";
import AgendaTableHead from "./PropertyTableHead";
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

function createData(id,agency_name,date_visit,date_created,hour_created,hour_visit,created_by,property_created_by,status,price,primaryImage,code,ville,living_space,number_bedroom,type_mandate,logo,href,reason_social,title_property,commission_seller,commission_buyer) {
    counter += 1;
    return { index: counter,id,agency_name,date_visit,date_created,hour_created,hour_visit,created_by,property_created_by,status,price,primaryImage,code,ville,living_space,number_bedroom,type_mandate,logo,href,reason_social,title_property,commission_seller,commission_buyer};
}
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: '100%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    state = {
        order: 'desc',
        orderBy: 'id',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 10,
    };

    componentWillMount() {
        this.props.getListAgenda();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        let {agendas} =  nextProps;
        if(agendas && agendas.length > 0){

            let datas = agendas.map((agenda)=>{
                try{
                    let date = new Date(agenda.agenda_created_at) ;
                    let date_created =  agenda.agenda_created_at!==null?moment(date).format(configDateFormat.sort_date_2):"";
                    let hour_created =  agenda.agenda_created_at!==null?moment(date).format(configDateFormat.time_format):"";
                    let date1 = new Date(agenda.meeting_date) ;
                    let date_visit =  agenda.meeting_date!==null?moment(date1).format(configDateFormat.sort_date_2):"";
                    let date2 = new Date(agenda.meeting_hour) ;
                    let hour_visit =  agenda.meeting_hour!==null?moment(date2).format(configDateFormat.time_format):"";
                    let price = numberWithCommas(agenda.number_pay!==null?agenda.number_pay:"");
                        price = displayPriceWithCurrency(price);
                    let code = agenda.code!==null?agenda.code:"";
                    let primaryImage = agenda.image!==null?agenda.image:"";
                    let ville = agenda.title_town!==null?agenda.title_town:"";
                    let living_space = agenda.living_space!==null?agenda.living_space:"";
                    let number_bedroom = agenda.number_bedroom!==null?agenda.number_bedroom:"";
                    let type_mandate = agenda.sub_type_property!==null?agenda.sub_type_property:"";
                    let reason_social = agenda.reason_social!==null?agenda.reason_social:"";
                    let logo = primaryImage ===null || primaryImage === ""?"":( URL_SERVER + primaryImage);
                    let agency_name  = (agenda.firstname!==null?agenda.firstname:"") +" " +(agenda.lastname!==null?agenda.lastname:"");
                    let path_doc = URL_SERVER + agenda.path_doc;
                    let href = (agenda.path_doc!==""&& agenda.path_doc!==null)?path_doc:null;
                    let title_property = agenda.title_des!==null?agenda.title_des:"";
                    let commission_seller = agenda.commission_seller!==null?agenda.commission_seller:"";
                    let commission_buyer = agenda.commission_buyer!==null?agenda.commission_buyer:"";
                    return createData(agenda.agenda_id,agency_name,date_visit,date_created,hour_created,hour_visit,agenda.agenda_created_by,agenda.property_created_by,agenda.status,price,primaryImage,code,ville,living_space,number_bedroom,type_mandate,logo,href,reason_social,title_property,commission_seller,commission_buyer);
                }
                catch (err) {
                    console.log(err)
                    return;
                }
            });

            this.setState({
                data:datas
            })
        }
    }


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy });
    };

    // handleSelectAllClick = event => {
    //     if (event.target.checked) {
    //         this.setState(state => ({ selected: state.data.map(n => n.id) }));
    //         return;
    //     }
    //     this.setState({ selected: [] });
    // };
    //
    // handleClick = (event, id) => {
    //     const { selected } = this.state;
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected = [];
    //
    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, id);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1),
    //         );
    //     }
    //
    //     this.setState({ selected: newSelected });
    // };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    handleChangeStatus = (id,status,date_visit,hour_visit) => {
        this.props.changeStatusAgenda(id,status,date_visit,hour_visit)
    }
    isSelected = id => this.state.selected.indexOf(id) !== -1;
    showRow = (data) => {
        const isSelected = this.isSelected(data.id);
        let user_id = getAccountCurrent().id;
        if(user_id === data.property_created_by){
            return(
                <TableRow
                    hover
                    // onClick={event => this.handleClick(event, data.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={data.index}
                    selected={isSelected}
                >
                    <TableCell className="text-center">
                        <div className="text-center agenda-icon"><i className="zmdi zmdi-account"></i>{data.agency_name}</div>
                        <div className="text-center">Raison sociale: {data.reason_social}</div>
                        <div className="text-center">le {" " + data.date_created}</div>
                        <div className="text-center">à {" " +  data.hour_created}</div>
                    </TableCell>
                    <TableCell className="text-center"> <img className="card-img-top imgListProperty" src={data.logo} alt="Card image cap" /></TableCell>
                    <TableCell className="text-center" >{data.title_property}</TableCell>
                    <TableCell className="text-center" >
                        <div className="text-center">Prix: <div>{data.price}</div></div>
                        <div className="text-center">Commission vendeur: {data.commission_seller}%</div>
                        <div className="text-center">Commission acheteur: {data.commission_buyer}%</div>
                    </TableCell>
                    <TableCell className="text-center" >
                        <div className="text-center">{" " + data.date_visit + " à " + data.hour_visit}</div>
                        <div className="text-center">{!data.status?<div><div><button className="btn btn-success" onClick={() =>this.handleChangeStatus(data.id,1,data.date_visit,data.hour_visit)}><IntlMessages id="agenda.list.button.accept"/></button></div><div><button className="btn btn-danger mt-1" onClick={() =>this.handleChangeStatus(data.id,2)}><IntlMessages id="agenda.list.button.decline"/></button></div></div>:<div>{data.status===1?<IntlMessages id="agenda.list.status.accept"/>:<IntlMessages id="agenda.list.status.decline"/>}</div>}</div>
                    </TableCell>
                    <TableCell className="text-center">{data.code}</TableCell>
                    <TableCell className="text-center" >{data.type_mandate}</TableCell>
                    <TableCell className="text-center">{data.ville}</TableCell>
                    <TableCell className="text-center">{data.living_space}</TableCell>
                    <TableCell className="text-center" >{data.number_bedroom}</TableCell>
                    <TableCell className="text-center" >  {data.href!== null?<button className="col-sm-3 iconMg"><a href={data.href} target="_blank"><i className="zmdi zmdi-format-valign-bottom zmdi-hc-3x mt-1"></i></a></button>:""}</TableCell>
                </TableRow>
            )
        }
        else if(user_id === data.created_by){
            return(
                <TableRow
                    hover
                    // onClick={event => this.handleClick(event, data.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={data.index}
                    selected={isSelected}
                >
                    <TableCell className="text-center">
                        <div className="text-center agenda-icon"><i className="zmdi zmdi-account"></i>{data.agency_name}</div>
                        <div className="text-center">Agence: {data.reason_social}</div>
                        <div className="text-center">le {" " + data.date_created}</div>
                        <div className="text-center">à {" " +  data.hour_created}</div>
                    </TableCell>
                    <TableCell className="text-center" > <img className="card-img-top imgListProperty" src={data.logo} alt="Card image cap" /></TableCell>
                    <TableCell className="text-center">{data.title_property}</TableCell>
                    <TableCell className="text-center" >
                        <div className="text-center">Prix: <div>{data.price}</div></div>
                        <div className="text-center">Commission vendeur: {data.commission_seller}%</div>
                        <div className="text-center">Commission acheteur: {data.commission_buyer}%</div>
                    </TableCell>
                    <TableCell className="text-center">
                        <div className="text-center">{" " + data.date_visit + " à " + data.hour_visit}</div>
                        <div className="text-center">{!data.status?<div><IntlMessages id="agenda.list.status.wait_confirm"/></div>:<div>{data.status===1?<IntlMessages id="agenda.list.status.accept"/>:<IntlMessages id="agenda.list.status.decline"/>}</div>}</div>
                    </TableCell>
                    <TableCell className="text-center" >{data.code}</TableCell>
                    <TableCell className="text-center">{data.type_mandate}</TableCell>
                    <TableCell className="text-center">{data.ville}</TableCell>
                    <TableCell className="text-center">{data.living_space}</TableCell>
                    <TableCell className="text-center">{data.number_bedroom}</TableCell>
                    <TableCell className="text-center">
                        {data.href!== null?<button className="col-sm-3 iconMg"><a href={data.href} target="_blank"><i className="zmdi zmdi-format-valign-bottom zmdi-hc-3x mt-1"></i></a></button>:""}
                    </TableCell>
                </TableRow>
            )
        }


    }
    render() {
        const { classes} = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (
            <Paper className={classes.root}>
                <AgendaTableToolbar numSelected={selected.length} itemsSelected={this.state.selected} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <AgendaTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            // onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((n) => {
                                    return (
                                        this.showRow(n)
                                    );
                                })}
                            {/*{emptyRows > 0 && (*/}
                                {/*<TableRow style={{ height: 49 * emptyRows }}>*/}
                                    {/*<TableCell colSpan={6} />*/}
                                {/*</TableRow>*/}
                            {/*)}*/}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={data.length}
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
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
    return {
        agendas :state.agenda.agendas
    }
};

const  mapDispatchToProps = (dispatch)=>{

    return {
        getListAgenda: () => {
            return dispatch(getListAgenda())
        },
        changeStatusAgenda:(id,status,date_visit,hour_visit)=>{
            return dispatch(changeStatusAgenda(id,status,date_visit,hour_visit))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EnhancedTable));