import React from "react";
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";

const styles = theme  => ({
    wrap_content:{
        backgroundColor:'red',
        minWidth:'200px',
        minHeight:'200px',
    }
});


class Notification extends React.Component{
    render() {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.wrap_content)}>
                    okokokokokokok
            </div>
        );
    }
}

Notification.propTypes ={
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles())(Notification);
