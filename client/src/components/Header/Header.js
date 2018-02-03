import React, { Component } from 'react'
import { Button, Navbar, NavItem } from 'react-materialize'
import './Header.css'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'

class Header extends Component {
    render() {
        return (
            <div className="Header">
                {/* <i className="fa fa-cutlery fa-1x" aria-hidden="true"></i> */}
                <Navbar brand='Bon Recipe' right>
                    <NavItem href='get-started.html'>Getting started</NavItem>
                    <NavItem href='components.html'>Components</NavItem>
                </Navbar>
            </div>
        )
    }
}

export default Header