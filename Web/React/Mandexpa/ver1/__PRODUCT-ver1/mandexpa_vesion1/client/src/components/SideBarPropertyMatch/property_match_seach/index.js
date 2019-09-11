import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {getMatchingPropsResults, getListProperty, addListPropertySeen} from 'Actions/index'
import ContactTableToolbar from "./PropertyTableToolbar";
import ContactTableHead from "./PropertyTableHead";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {LINK_CCGU_CGPS, URL_SERVER} from "Constants/GeneralConfig";
import moment from "moment";
import {Link, withRouter} from "react-router-dom";
import {status_property, PROPERTY_TYPE} from "Constants/ComponentConfigs/PropertyConfig"
import {getAccountCurrent,numberWithCommas,displayPriceWithCurrency} from "Helpers";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
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

function createData(id,code,price,textmoney,primaryImage,logo,ville,number_bedroom,type_mandate,host_name,living_space,update_at,created_by,status_mandate,color,title_property) {
    counter += 1;
    return { index: counter,id,code,price,textmoney,primaryImage,logo,ville,number_bedroom,type_mandate,host_name,living_space,update_at,created_by,status_mandate,color,title_property};
}
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
    state = {
        order: 'desc',
        orderBy: 'code',
        selected: [],
        data: [],
        page: 0,
        rowsPerPage: 10,
        id_property : null,
        id_property_cgu : null,
        open_cgu : false,
    };

    componentWillMount() {

        const {match} = this.props;
        var id;
        id =  match.params.id;
        if(!isNaN(id)){
            this.props.getMatchingPropsResults(id)
                .catch((err)=>{
                    this.props.history.push('app/dashboard/not-found')
                });
        }
        this.props.getListProperty(null);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        var {propertys} =  nextProps;
        var datas = propertys.map((property) => {
            // console.log(property)
            try {
                var currency =  property.currency?JSON.parse(property.currency) : null;
                var money = "";
                if(currency===null){
                }
                else {
                    money = currency.label;
                }
                var date = property.updated_at!==null?new Date(property.updated_at):"";
                var date_update = property.updated_at!==null?moment(date).format('DD/MM/YYYY'):"";
                var id = property._id!==null?property._id:"";
                var code = property.code!==null?property.code:"";
                var price = numberWithCommas(property.number_pay!==null?property.number_pay:"");
                price = displayPriceWithCurrency(price);
                var update_at = date_update;
                var textmoney = money;
                var primaryImage = property.image!==null?property.image:"";
                var ville = property.title_town!==null?property.title_town:"";
                var living_space = property.living_space!==null?property.living_space+" m²":"m²";
                var number_bedroom = property.number_bedroom!==null?property.number_bedroom:"";
                var type_mandate = property.sub_type_property!==null?property.sub_type_property:"";
                var host_name = property.host_1!==null?(JSON.parse(property.host_1)).name:"";
                var logo = primaryImage ===null || primaryImage === ""?"":( URL_SERVER+ primaryImage);
                var status_mandate = property.status_mandate!==null?property.status_mandate:"";
                var status = "";
                var color = "";
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
                var title_property = property.title_des!==null?property.title_des:"";
                return createData(id,code,price,textmoney,primaryImage,logo,ville,number_bedroom,type_mandate,host_name,living_space,update_at,property.created_by,status,color,title_property);
            }
            catch (e) {
                console.log('--------------',e)
            }

        });
        this.setState({
            data:datas
        })

    }


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        this.setState({ order, orderBy });
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
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    handleClickOpenCGU(id) {

        var properties_seen = (getAccountCurrent().properties_seen!==null && getAccountCurrent().properties_seen!=="")?JSON.parse(getAccountCurrent().properties_seen):[];
        var check = false;
        if(properties_seen.length > 0){
            properties_seen.map(item=>{
                if(item===id){
                    check = true
                }
            })
        }
        if(check){
            this.setState({ open_cgu: false,id_property_cgu : null })

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
    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes} = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (

            <div>
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
                        <Button raised="true" onClick={() => this.chooseYes(this.state.id_property_cgu)} className="btn-primary text-white" autoFocus> J’accepte </Button>
                        <Button raised="true" onClick={() => this.handleCloseCGU()} className="btn-danger text-white"> Je refuse </Button>
                    </DialogActions>
                </Dialog>
                <Paper className={classes.root}>
                    <ContactTableToolbar numSelected={selected.length} itemsSelected={this.state.selected} />
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <ContactTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {stableSort(data, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((n) => {
                                        const isSelected = this.isSelected(n.id);
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.index}
                                                selected={isSelected}
                                                className="borderList"
                                            >
                                                <TableCell align="right" className="row iconListProperty border0">
                                                    <button className="col-sm-3 iconMg">
                                                        {/*<Link  to={{*/}
                                                        {/*pathname:'/app/dashboard/property/edit/'+n.id,*/}
                                                        {/*}}*/}
                                                        {/*> <i className="zmdi zmdi-eye zmdi-hc-1x mt-1"></i></Link>*/}
                                                        <i className="zmdi zmdi-eye zmdi-hc-1x mt-1"  onClick={() => this.handleClickOpenCGU(n.id)}></i>
                                                    </button>
                                                    <button className="col-sm-3 iconMg">
                                                        {/*<Link  to={{*/}
                                                        {/*pathname:'/app/dashboard/property/edit/'+n.id,*/}
                                                        {/*}}*/}
                                                        {/*>*/}
                                                        <i className="zmdi zmdi-format-valign-bottom zmdi-hc-1x mt-1"></i>
                                                        {/*</Link>*/}
                                                    </button>
                                                </TableCell>
                                                <TableCell align="right" className="border0"> <img className="card-img-top imgListProperty" src={n.logo} alt="Card image cap" /></TableCell>
                                                <TableCell align="right" className="border0">{n.title_property}</TableCell>
                                                <TableCell align="right" className="border0">{n.update_at}</TableCell>
                                                <TableCell align="right" className="border0">{n.code}</TableCell>
                                                <TableCell align="right" className="border0"><div style={{color : n.color}}>{n.status_mandate}</div></TableCell>
                                                <TableCell align="right" className="border0">{n.type_mandate}</TableCell>
                                                <TableCell align="right" className="border0">{n.ville}</TableCell>
                                                <TableCell align="right" className="border0">{n.price}</TableCell>
                                                <TableCell align="right" className="border0">{n.living_space}</TableCell>
                                                <TableCell align="right" className="border0">{n.number_bedroom}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
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
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state)=>{
    return {
        propertys : state.property_matches.list_matching_property
    }
};

const  mapDispatchToProps = (dispatch)=>{
    return {
        getListProperty: (filter) => dispatch(getListProperty(filter)),
        getMatchingPropsResults:(id)=>{
            return dispatch(getMatchingPropsResults(id))
        },
        addListPropertySeen:(id)=>{
            return dispatch(addListPropertySeen(id))
        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withRouter(EnhancedTable)));