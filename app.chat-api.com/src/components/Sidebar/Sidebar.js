import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem, NavLink as RsNavLink} from 'reactstrap';
import classNames from 'classnames';
import SidebarFooter from './../SidebarFooter';
import SidebarForm from './../SidebarForm';
import SidebarHeader from './../SidebarHeader';
import SidebarMinimizer from './../SidebarMinimizer';
import instanceList from '../../database/instanceList';
import T from 'i18n-react';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instances: [],
        };
    }

    handleClick(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    }

    activeRoute(routeName, props) {
        return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    }

    componentDidMount() {
        instanceList.onChange(instances => {
            this.setState({instances: Object.values(instances)});
        });
    }

    getMenuItems() {
        const menuItems = [];
        menuItems.push({
            title: true,
            name: T.translate('apiGateways'),
        });
        this.state.instances.map(instance => {
            menuItems.push({
                name: 'WhatsApp #' + instance.id,
                url: '/instance/' + instance.id,
                icon: 'fa fa-whatsapp',
            });
        });
        menuItems.push({
            name: T.translate('payment'),
            url: '/pay',
            icon: 'fa fa-credit-card',
        });
        return menuItems;
    }

    renderMenu(items) {
        // badge addon to NavItem
        const badge = (badge) => {
            if (badge) {
                const classes = classNames(badge.class);
                return (<Badge className={classes} color={badge.variant}>{badge.text}</Badge>)
            }
        };

        // simple wrapper for nav-title item
        const wrapper = item => {
            return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name )
        };

        // nav list section title
        const title = (title, key) => {
            const classes = classNames("nav-title", title.class);
            return (<li key={key} className={classes}>{wrapper(title)} </li>);
        };

        // nav list divider
        const divider = (divider, key) => (<li key={key} className="divider"></li>);

        // nav item with nav link
        const navItem = (item, key) => {
            const classes = classNames(item.class)
            const isExternal = (url) => {
                return url.substring(0, 4) === 'http' ? true : false
            }
            const variant = classNames("nav-link", item.variant ? `nav-link-${item.variant}` : "");
            return (
                <NavItem key={key} className={classes}>
                    {isExternal(item.url) ?
                        <RsNavLink href={item.url} className={variant} active>
                            <i className={item.icon}></i>{item.name}{badge(item.badge)}
                        </RsNavLink>
                        :
                        <NavLink to={item.url} className={variant} activeClassName="active">
                            <i className={item.icon}></i>{item.name}{badge(item.badge)}
                        </NavLink>
                    }
                </NavItem>
            )
        };

        // nav dropdown
        const navDropdown = (item, key) => {
            return (
                <li key={key} className={this.activeRoute(item.url, this.props)}>
                    <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i
                        className={item.icon}></i>{item.name}</a>
                    <ul className="nav-dropdown-items">
                        {this.renderMenu(item.children)}
                    </ul>
                </li>)
        };

        // nav link
        const navLink = (item, idx) =>
            item.title ? title(item, idx) :
                item.divider ? divider(item, idx) :
                    item.children ? navDropdown(item, idx)
                        : navItem(item, idx);


        return items.map((item, index) => navLink(item, index));
    }

    render() {
        // sidebar-nav root
        return (
            <div className="sidebar">
                <SidebarHeader/>
                <SidebarForm/>
                <nav className="sidebar-nav">
                    <Nav>
                        {this.renderMenu(this.getMenuItems())}
                    </Nav>
                </nav>
                <SidebarFooter/>
                <SidebarMinimizer/>
            </div>
        )
    }
}

export default Sidebar;
