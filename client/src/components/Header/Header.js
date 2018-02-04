import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Navbar, NavItem } from 'react-materialize'
import { logoutUser } from '../../actions/index'
import './Header.css'

class Header extends Component {
    onLogoutClick() {
        this.props.logoutUser()
    }

    render() {
        console.log(this.props.auth)
        return (
            <div className="Header">
                <Navbar brand='Bon Recipe' right>
                    <Link to='/account'>My Account</Link>
                    <NavItem onClick={() => this.onLogoutClick()}><Button waves='light' ><i className="fa fa-sign-out"></i> Logout</Button></NavItem>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => { return { auth } }
const mapDispatchToProps = dispatch => {
    return { logoutUser: () => logoutUser(dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)