/**
 * Component  Wrap all component in system
 */



import React, {Component} from 'react';
import PropType from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
import IntlMessages from "Util/IntlMessages";


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    mandexpa_footer:{
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
    },
    space:{
        marginBottom:'3%'
    }
});


class WrapComponent extends Component{
    render() {
        const {children,showTitle,componentTitle,classes} = this.props;
        return (
            <div className={classNames("ecom-dashboard-wrapper")}>
                {
                    showTitle && componentTitle !== undefined &&
                    (
                        componentTitle
                    )
                }
                {children}
                <div className={classes.space}>

                </div>
                {/*<div className={classes.mandexpa_footer}>*/}
                    {/*Mandexpa*/}
                {/*</div>*/}
            </div>
        )
    }
}
WrapComponent.defaultProps = {
    showTitle:true,
};

WrapComponent.propTypes = {
    componentTitle:PropType.any,
    showTitle:PropType.bool,
};



export default withStyles(styles)(WrapComponent) ;