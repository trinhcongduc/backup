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
    { id: 'name', numeric: true, disablePadding: false, label: <IntlMessages id="contact.fullname"/> },
    { id: 'mobile', numeric: true, disablePadding: false, label: <IntlMessages id="contact.list.mobile"/> },
    { id: 'telephone', numeric: true, disablePadding: false, label: <IntlMessages id="contact.list.telephone"/> },
    { id: 'email', numeric: true, disablePadding: false, label:<IntlMessages id="contact.list.email"/>},
    { id: 'address', numeric: true, disablePadding: false, label: <IntlMessages id="contact.list.address"/> },
    { id: 'city', numeric: true, disablePadding: false, label: <IntlMessages id="contact.list.city"/> },
    { id: 'country', numeric: true, disablePadding: false, label: <IntlMessages id="contact.list.country"/>},
    { id: 'zipcode', numeric: true, disablePadding: false, label: <IntlMessages id="contact.list.zipcode"/> },
    { id: 'delete', numeric: false, disablePadding: false, label: <IntlMessages id="contact.actions" />},
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