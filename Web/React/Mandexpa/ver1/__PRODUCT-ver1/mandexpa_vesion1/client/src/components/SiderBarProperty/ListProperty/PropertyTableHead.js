import React from "react";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";
import PropTypes from "prop-types";
import IntlMessages from "Util/IntlMessages";
import { withStyles } from '@material-ui/core/styles';
import className from "classnames";

const styles = () =>({
    pd_5:{
        padding:"5px"
    },
    header_fix:{
        position: "sticky",
        top: "0",
        backgroundColor: "#eee"
    }
});

const rows = [
    { id: 'property.updated_at', numeric: "right",className:"pd_5",  hasSort: true , label: <IntlMessages id="property.list.update_at" /> },
    { id: 'property_media.image', numeric:"center",className:"pd_5",  hasSort: true , label: <IntlMessages id="property.list.photo" /> },
    { id: 'property.title_des', numeric: "center",className:"pd_5",  hasSort: true , label: <IntlMessages id="property.list.title_property"/> },
    { id: 'property.code', numeric: "center",className:"pd_5",  hasSort: true , label: <IntlMessages id="property.list.code" /> },
    { id: 'account.lastname', numeric: "center",className:"pd_5",  hasSort: true , label: <IntlMessages id="property.list.agent" /> },
    { id: 'property.status_mandate', numeric: "center",className:"pd_5",  hasSort: true , label: <IntlMessages id="property.list.status_mandate" /> },
    { id: 'property.sub_type_property', numeric: "center",className:"pd_5",  hasSort: true , label: <IntlMessages id="property.list.type_mandate" />},
    { id: 'property_location.town', numeric:"right",className:"pd_5",  hasSort: true , label: <IntlMessages id="property.list.ville" /> },
    { id: 'property.price', numeric: "center",className:"pd_5",  hasSort: true , label: <IntlMessages id="property.list.price" /> },
    { id: 'property.prices', numeric: "center",className:"pd_5",  hasSort: true , label: <IntlMessages id="property.list.price" /> },
    { id: 'property.living_space', numeric:"right",className:"pd_5",  hasSort: true , label: <IntlMessages id="property.list.living_space" /> },
    { id: 'property.number_bedroom', numeric: "center",className:"pd_5",  hasSort: true , label: <IntlMessages id="property.list.number_bedroom" /> },
    { id: 'Actions', numeric: "center",className:"pd_5",  hasSort: false , label: <IntlMessages id="property.list.actions" /> },
];

class PropertyTableHead extends React.Component {
    createSortHandler = (property,hasSort) => event => {
        if(hasSort){
            this.props.onRequestSort(event, property);
        }
    };

    render() {
        const { order, orderBy, classes } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                align={row.numeric}
                                padding='none'
                                sortDirection={orderBy === row.id ? order : false}
                                className={className(classes[row.className],classes.header_fix)}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id,row.hasSort)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}
PropertyTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default withStyles(styles)(PropertyTableHead) ;