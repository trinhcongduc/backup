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
    { id: 'fullname', numeric: false, disablePadding: 'checkbox', hasSort: true , label: <IntlMessages id="subscriber.user.fullname"/> },
    { id: 'title', numeric: true, disablePadding: 'default', hasSort: true , label: <IntlMessages id="subscriber.subscription.title"/> },
    { id: 'main_price', numeric: true, disablePadding: 'default', hasSort: true , label:  <IntlMessages id="subscriptions.main_price"/>},
    { id: 'second_price', numeric: true, disablePadding: 'default', hasSort: true , label: <IntlMessages id="subscriptions.second_price"/>},
    { id: 'start_date', numeric: true, disablePadding: 'default', hasSort: true , label: <IntlMessages id="subscriber.startdate"/>},
    { id: 'end_date', numeric: true, disablePadding: 'default', hasSort: true , label: <IntlMessages id="subscriber.enddate"/>},
    { id: 'action', numeric: false, disablePadding: 'default', hasSort: false , label: <IntlMessages id="actions"/>},
    { id: '', numeric: false, disablePadding: 'none', hasSort: false ,  label: <IntlMessages id="more"/>},
];

class SubscribersTableHead extends React.Component {
    createSortHandler = (property,hasSort) => event => {
        if(hasSort){
            this.props.onRequestSort(event, property);
        }
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
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
                                align={row.numeric ? 'right' : 'center'}
                                padding={row.disablePadding}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title={row.hasSort?"Sort":""}
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={100}
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
SubscribersTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default SubscribersTableHead;