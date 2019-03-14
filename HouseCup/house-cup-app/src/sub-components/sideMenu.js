import React from 'react';
import { NavLink } from "react-router-dom";

class sideMenu extends React.Component {
    render() {
        return (
            <div className='side-menu'>
                <header>
                    <h1>House Cup Tracker</h1>
                </header>
                <NavLink to="/admin" activeClassName="activeMenu" style={{ textDecoration: "none", color: "inherit" }}>
                    <h2>Dashboard</h2>
                </NavLink>

                <NavLink to="/schools" activeClassName="activeMenu" style={{ textDecoration: "none", color: "inherit" }}>
                    <h2>Schools</h2>
                </NavLink>

                <NavLink to="/admin/billing" activeClassName="activeMenu" style={{ textDecoration: "none", color: "inherit" }}>
                    <h2>Billings</h2>
                </NavLink>

                <NavLink to="/admin/settings" activeClassName="activeMenu" style={{ textDecoration: "none", color: "inherit" }}>
                    <h2>Settings</h2>
                </NavLink>

                <NavLink to='/' style={{ textDecoration: "none", color: "inherit" }}>
                    <h2>Sign Out</h2>
                </NavLink>
            </div>);
    }
}

export default sideMenu;