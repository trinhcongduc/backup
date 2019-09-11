import React from "react";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";
import PropTypes from "prop-types";
import IntlMessages from "Util/IntlMessages";



class TableHeadBase extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    renderCols = () => {
        let {listCol,prefix_lang} = this.props;
        let res = [];
        if(listCol.indexOf('id')>-1){
            listCol.splice(listCol.indexOf('id'),1);
        }
        if(listCol.length > 0){
            res = listCol.map(item=>{
                let label =  typeof item === "object" ? item.key : item;
                return {
                    id: label,
                    numeric: false,
                    disablePadding: true,
                    label: <IntlMessages id={prefix_lang+"."+label}/>
                }
            });
        }

        return res;
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount,selectAll,checkboxRow } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {
                        checkboxRow && (
                            <TableCell padding="none">
                                {
                                    selectAll  && (
                                        <Checkbox
                                            indeterminate={numSelected > 0 && numSelected < rowCount}
                                            checked={numSelected === rowCount}
                                            onChange={onSelectAllClick}
                                        />
                                    )
                                }

                            </TableCell>
                        )
                    }

                    {this.renderCols().map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                align="justify"
                                size="small"
                                padding="default"
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
TableHeadBase.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default TableHeadBase;