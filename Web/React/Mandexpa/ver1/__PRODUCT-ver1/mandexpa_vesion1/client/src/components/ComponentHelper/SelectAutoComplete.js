/**
 * Component Custom select/option autocomplete
 * @base_on : React Select v2
 * @input : list option
 */


/**
 * List props using
 * ==============> simple select    <==============
 * #listOption   => array object                                     : list options select use
 * #value        => return  value                                    : value of select
 * #name         => string                                           : name of select
 * #getlabel     => boolean                                          : has return label or not
 * #getObject     => boolean                                          : has return object passed or not
 * #isDisabled   => boolean                                          : disable/enable select
 * #isClearable   => boolean                                          : empty input
 * @event:
 * #onChange     => return  {label: ,value: }                        : value selected
 * #
 *
 * ==============> multiple select   <==============
 * #listOption   => array object                                     : list options select use
 * #value        => array object type [ {label: ,value: }]           : value of select
 * #name         => string                                           : name of select
 * #getlabel     => boolean                                          : has return label or not
 * #value_only   => object type  {label: ,value: }                   : if choose this one, no other values ​​will be selected
 * #repeatOption => boolean                                          : the value can be selected duplicate
 * #hideSelectedOptions => boolean                                   : hide/show value selected
 * #maxOption    => number                                           : the number option maximum can be selected: default unlimited
 * @event:
 * #onChange     => return  event {target:{name: ,value: }           : value selected, @name of select ,@value selected
 */

'use strict'
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {withStyles} from '@material-ui/core/styles';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import IntlMessages from "Util/IntlMessages";
import classNames from "classnames";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

class SelectAutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            single: null,
            multi: [],
            listOption: null,
            old_value:null
        };
    }

    _findValueInOptions = (value, Options) => {
        var buf;
        if (typeof value === "object" && value.length) {
            buf = value.map(item => {
                return Options.filter(option => {
                    return option.value == item
                })[0]
            });
            // multi select
            if (buf.length) {
                buf = buf.filter(item=>{
                    return item !== undefined;
                });

                return buf;
            }
        } else {
            buf = Options.filter(item => {
                return  item.value == value
            });

            // simple select
            if (buf.length === 1) {
                return buf[0];
            }
        }
        return null;
    };

    _setValueSelect = (value, listOption, multiple) => {
        const {getlabel,value_props,label_props} = this.props;

        let suggestions = [{value: '', label: ''}];
        if (Array.isArray(listOption) && listOption && listOption.length > 0) {
            suggestions = listOption.map(suggestion => ({
                value: suggestion[value_props],
                label: suggestion[label_props],
            }));
        }
        if (value) {
            if (typeof getlabel === "undefined" || getlabel === "") {
                value = this._findValueInOptions(value, suggestions);

            }
            if (multiple) {
                var buf = null;
                if(Array.isArray(value)){
                    buf =  value.map(item=>{
                        return item.value
                    });
                }
                this.setState({
                    multi: value,
                    old_value : buf
                })
            } else {
                this.setState({
                    single: value
                })
            }
        }

        this.setState({
            listOption: suggestions
        })
    };

    componentWillMount() {
        var {listOption, value, multiple} = this.props;
        this._setValueSelect(value, listOption, multiple);

    }

    componentWillReceiveProps(nextProps, nextContext) {
        var {listOption, value, multiple} = nextProps;
        this._setValueSelect(value, listOption, multiple);
    }


    handleChange = value => {
        const {getlabel,getObject,listOption} = this.props;
        if (getlabel && getlabel !== "") {
            this.props.onChange(value);
        } else {
            if(value){
                if(getObject){
                    value = listOption.filter(item=>{return item.value === value.value})[0];
                    this.props.onChange(value);
                }else{
                    this.props.onChange(value.value);
                }

            }else{
                this.props.onChange('');
            }

        }
        this.setState({
            single: value,
        });
    };

    _handleSetStateMutilOption = (values) => {
        const {getlabel,get_oldData,getObject} = this.props;
        this.setState({
            multi: values,
        }, () => {

            var values = this.state.multi;
            if (getlabel === undefined ) {
                values = this.state.multi.map(item => item.value);
            }
            if(get_oldData){
                this.props.onChange({target: {name: this.props.name, value: values},old_value:this.state.old_value});
            }else{
                this.props.onChange({target: {name: this.props.name, value: values}});
            }

        });
    };

    handleChangeMulti = (values, event) => {
        let {multi} = this.state;
        multi = multi?multi:[];
        var {repeatOption, maxOption, value_only} = this.props;

        if (repeatOption) {
            switch (event.action) {
                case "remove-value" : {
                    var item_remove = event.removedValue;
                    values = multi.filter(item => {
                        return item.value !== item_remove.value
                    });
                    break;
                }
                default: {
                    var data = event.option;
                    var multi_value = multi ? multi.filter(item => {
                        return item.value.search(value_only.value) > -1
                    }):[];
                    if (!multi_value.length) {
                        values = [...multi, data];
                        if (data.value.search(value_only.value) > -1) {
                            values = [];
                            values.push(data)
                        }
                    } else {
                        values = [...multi_value];
                    }
                }
            }
        }
        if (event.action === "remove-value") {
            this._handleSetStateMutilOption(values);
        } else {
            if(maxOption){
                if ( multi.length < maxOption) {
                    this._handleSetStateMutilOption(values);
                }
            }
            else{
                this._handleSetStateMutilOption(values);
            }


        }


    };

    render() {
        var {classes, multiple, hideSelectedOptions, isDisabled,isClearable,className} = this.props;
        const {listOption, single, multi, name} = this.state;

        hideSelectedOptions = typeof hideSelectedOptions !== "undefined" ? hideSelectedOptions : true;
        isDisabled = typeof isDisabled !== "undefined" ? isDisabled : false;
        return (
            <div className={classNames(classes.root,className)}>

                {multiple || multiple === "true" ? (
                    <Select
                        closeMenuOnSelect={false}
                        onChange={this.handleChangeMulti}
                        hideSelectedOptions={hideSelectedOptions}
                        value={multi}
                        name={name}
                        isMulti
                        options={listOption}
                    />

                    ) :
                    (
                    <Select
                        options={listOption}
                        value={single}
                        name={name}
                        placeholder={<IntlMessages id="select"/>}
                        onChange={this.handleChange}
                        isDisabled={isDisabled}
                        isClearable={isClearable}
                    />
                    )
                }
            </div>
        );
    }
}

SelectAutoComplete.defaultProps = {
    value_props:'id',
    label_props:'title',
};

SelectAutoComplete.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    listOption:PropTypes.arrayOf(PropTypes.object).isRequired,
    name:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    value_props:PropTypes.string.isRequired,
    label_props:PropTypes.string.isRequired,
    multiple:PropTypes.bool,
    isClearable:PropTypes.bool,
    isDisabled:PropTypes.bool,
    getlabel:PropTypes.bool,
    getObject:PropTypes.bool,
    className:PropTypes.any,
};

export default withStyles(styles, {withTheme: true})(SelectAutoComplete);
