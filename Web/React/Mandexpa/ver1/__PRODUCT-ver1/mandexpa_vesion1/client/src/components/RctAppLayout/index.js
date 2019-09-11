/**
 * App Routes
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import $ from 'jquery';
import { Scrollbars } from 'react-custom-scrollbars';

// Components
import Header from 'Components/Header/Header';
import SidebarContent from 'Components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IntlMessages from "Util/IntlMessages";
import Footer from 'Components/Footer/Footer';
import Tour from 'Components/Tour';
import ThemeOptions from 'Components/ThemeOptions/ThemeOptions';


// preload Components
import PreloadHeader from 'Components/PreloadLayout/PreloadHeader';
import PreloadSidebar from 'Components/PreloadLayout/PreloadSidebar';


import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";


// app config
import AppConfig from 'Constants/AppConfig';


// actions
import { collapsedSidebarAction, startUserTour } from 'Actions';


const styles = () => ({
    root: {
        position:'relative',
        display:'block',

    },
    mandexpa_footer:{
        position: 'sticky',
        bottom: '0',
        width: '100%',
        backgroundColor: 'white',
        boder:'1px black ',
        padding:'5px',
        textAlign: 'center',
        margin:'20px 0px',
        boxShadow:'1px 1px 2.5px 1px grey ',
        borderRadius:'4px',
    }
});

class MainApp extends Component {

    state = {
        loadingHeader: true,
        loadingSidebar: true
    };

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        const { windowWidth } = this.state;
        window.addEventListener("resize", this.updateDimensions);
        if (AppConfig.enableUserTour && windowWidth > 600) {
            setTimeout(() => {
                this.props.startUserTour();
            }, 2000);
        }
        setTimeout(() => {
            this.setState({ loadingHeader: false, loadingSidebar: false });
        }, 114);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    componentWillReceiveProps(nextProps) {
        const { windowWidth } = this.state;
        if (nextProps.location !== this.props.location) {
            if (windowWidth <= 1199) {
                this.props.collapsedSidebarAction(false);
            }
        }
    }

    updateDimensions = () => {
        this.setState({ windowWidth: $(window).width(), windowHeight: $(window).height() });
    };

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    renderPage() {
        const { pathname } = this.props.location;
        const { children,classes } = this.props;
        if (pathname === '/app/chat' || pathname.startsWith('/app/mail') || pathname === '/app/todo') {
            return (
                <div className="rct-page-content p-0">
                    {children}
                </div>
            );
        }
        return (
            <Scrollbars
                className={classNames("rct-scroll")}
                autoHide
                autoHideDuration={100}
                style={this.getScrollBarStyle()}
            >
                <div className={classNames("rct-page-content",classes.root)}>
                    {children}
                    {/*<Footer/>*/}
                    <div className={classNames(classes.mandexpa_footer,"d-flex justify-content-between")}>
                        <span> </span>
                        <span> <img src={require('Assets/img/logo_header.png')} className="mr-15" alt="site logo" width="100" /> </span>
                        <span> <FontAwesomeIcon icon={['fas','life-ring']}/> <IntlMessages id="help"/> </span>
                    </div>
                </div>

            </Scrollbars>
        );
    }

    // render header
    renderHeader() {
        const { loadingHeader } = this.state;
        if (loadingHeader) {
            return <PreloadHeader />;
        }
        return <Header />
    }

    //render Sidebar
    renderSidebar() {
        const { loadingSidebar } = this.state;
        if (loadingSidebar) {
            return <PreloadSidebar />;
        }
        return <SidebarContent />
    }

    //Scrollbar height
    getScrollBarStyle() {
        return {
            height: 'calc(100vh - 50px)'
        }
    }

    render() {
        const { navCollapsed, rtlLayout, miniSidebar } = this.props.settings;
        const {classes} = this.props;
        const { windowWidth } = this.state;
        return (
            <div className="app">
                <div className="app-main-container">
                    {/*<Tour />*/}
                    <Sidebar
                        sidebar={this.renderSidebar()}
                        open={windowWidth <= 1199 ? navCollapsed : false}
                        docked={windowWidth > 1199 ? !navCollapsed : false}
                        pullRight={rtlLayout}
                        onSetOpen={() => this.props.collapsedSidebarAction(false)}
                        styles={{ content: { overflowY: '' } }}
                        contentClassName={classNames({ 'app-conrainer-wrapper': miniSidebar })}
                    >
                        <div className="app-container">
                            <div className="rct-app-content">
                                <div className="app-header">
                                    {this.renderHeader()}
                                </div>
                                <div className="rct-page">
                                    {this.renderPage()}
                                </div>
                            </div>
                        </div>
                    </Sidebar>
                    {/*<ThemeOptions />*/}

                </div>

            </div>
        );
    }
}

// map state to props
const mapStateToProps = ({ settings }) => {
    return { settings }
}

export default withRouter(connect(mapStateToProps, {
    collapsedSidebarAction,
    startUserTour
})(withStyles(styles)(MainApp)));
