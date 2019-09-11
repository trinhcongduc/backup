import React from "react";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";
import PropTypes from "prop-types";
import IntlMessages from "Util/IntlMessages";

const rows = [
    { id: 'Actions', numeric: false, disablePadding: false, label: <IntlMessages id="property.list.actions" /> },
    { id: 'Photo', numeric:true, disablePadding: false, label: <IntlMessages id="property.list.photo" /> },
    { id: 'title_property', numeric: true, disablePadding: false, label: <IntlMessages id="property.list.title_property"/> },
    { id: 'update_at', numeric: true, disablePadding: false, label: <IntlMessages id="property.list.update_at" /> },
    { id: 'code', numeric: true, disablePadding: false, label: <IntlMessages id="property.list.code" /> },
    { id: 'status_mandate', numeric: true, disablePadding: false, label: <IntlMessages id="property.list.status_mandate" /> },
    { id: 'type_mandate', numeric: true, disablePadding: false, label: <IntlMessages id="property.list.type_mandate" />},
    { id: 'ville', numeric:true, disablePadding: false, label: <IntlMessages id="property.list.ville" /> },
    { id: 'price', numeric: true, disablePadding: false, label: <IntlMessages id="property.list.price" /> },
    { id: 'living_space', numeric:true, disablePadding: false, label: <IntlMessages id="property.list.living_space" /> },
    { id: 'number_bedroom', numeric: true, disablePadding: false, label: <IntlMessages id="property.list.number_bedroom" /> },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
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
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;