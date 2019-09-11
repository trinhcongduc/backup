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
    { id: 'property_title', numeric: false, disablePadding: true, label: <IntlMessages id="document.order_invoice.property_title" /> },
    { id: 'seller_name', numeric: true, disablePadding: false, label: <IntlMessages id="document.order_invoice.seller_name" />},
    { id: 'seller_invoice', numeric: true, disablePadding: false, label: <IntlMessages id="document.order_invoice.seller_invoice" />},
    { id: 'buyer_name', numeric: true, disablePadding: false, label: <IntlMessages id="document.order_invoice.buyer_name" />},
    { id: 'buyer_invoice', numeric: true, disablePadding: false, label: <IntlMessages id="document.order_invoice.buyer_invoice" />},
    { id: 'created_date', numeric: true, disablePadding: false, label: <IntlMessages id="document.order_invoice.created_date" />},
    { id: '', numeric: true, disablePadding: false, label: <IntlMessages id="document.order_invoice.action" />},
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
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'center' : 'left'}
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