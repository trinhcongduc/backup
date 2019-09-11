import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography/Typography";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import React,{Component} from "react";
import {lighten} from "@material-ui/core/styles/colorManipulator";
import IntlMessages from "Util/IntlMessages";

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});


class SubscribersTableToolbar extends Component{

    render(){
        const { numSelected, classes,itemsSelected } = this.props;
        // console.log(itemsSelected);
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subtitle1">
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography variant="h6" id="tableTitle">
                            <IntlMessages id="subscribers.table.title" />
                        </Typography>
                    )}
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        );
    }
};

SubscribersTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

export default  withStyles(toolbarStyles)(SubscribersTableToolbar);