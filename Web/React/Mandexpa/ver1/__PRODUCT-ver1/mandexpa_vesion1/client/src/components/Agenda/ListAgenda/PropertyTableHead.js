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
    { id: 'Agency', numeric: true, disablePadding: false, label:  <IntlMessages id="agenda.list.agency"/> },
    { id: 'Photo', numeric:true, disablePadding: false, label:  <IntlMessages id="agenda.list.photo"/> },
    { id: 'title_property', numeric: true, disablePadding: false, label:  <IntlMessages id="agenda.list.title_property"/> },
    { id: 'price', numeric: true, disablePadding: false, label:  <IntlMessages id="agenda.list.price"/> },
    { id: 'Action', numeric: true, disablePadding: false, label:  <IntlMessages id="agenda.list.action"/> },
    { id: 'code', numeric: true, disablePadding: false, label:  <IntlMessages id="agenda.list.code"/> },
    { id: 'type_mandate', numeric: true, disablePadding: false, label:  <IntlMessages id="agenda.list.type_mandate"/> },
    { id: 'ville', numeric:true, disablePadding: false, label:  <IntlMessages id="agenda.list.ville"/> },
    { id: 'living_space', numeric:true, disablePadding: false, label:  <IntlMessages id="agenda.list.living_space"/> },
    { id: 'number_bedroom', numeric: true, disablePadding: false, label:  <IntlMessages id="agenda.list.number_bedroom"/> },
    { id: 'pat_doc', numeric: false, disablePadding: false, label:  <IntlMessages id="agenda.list.pat_doc"/> },
];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {/*<TableCell padding="checkbox">*/}
                        {/*<Checkbox*/}
                            {/*indeterminate={numSelected > 0 && numSelected < rowCount}*/}
                            {/*checked={numSelected === rowCount}*/}
                            {/*onChange={onSelectAllClick}*/}
                        {/*/>*/}
                    {/*</TableCell>*/}
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                className="text-center"
                                // align={row.numeric ? 'right' : 'left'}
                                // padding={row.disablePadding ? 'none' : 'default'}
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
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;