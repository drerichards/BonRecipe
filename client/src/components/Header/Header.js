import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'react-materialize'
import { logoutUser } from '../../actions/index'
import './Header.css'

class Header extends Component {
    onLogoutClick() {
        this.props.logoutUser()
    }

    render() {
        return (
            <div className="Header">
                {this.props.auth.loggedIn === true ?
                    <div className='nav'>
                        <Link to='/'><h1 className="Header-title">
                            <i className="fa fa-cutlery fa-1x" aria-hidden="true"></i>
                             Bon Recipe</h1></Link>
                        <div>
                            <h6>Logged in as: {this.props.auth.username}</h6>
                            <Link to='/account'><Button waves='light'><i className="fa fa-list fa-1x" aria-hidden="true"></i> Account</Button></Link>
                            <Button className='logoutBtn' waves='light' onClick={() => this.onLogoutClick()}><i className="fa fa-sign-out"></i> Logout</Button>
                        </div>
                    </div> :
                    <div className='nav'>
                        <h1 className="Header-title">
                            <i className="fa fa-cutlery fa-1x" aria-hidden="true"></i>
                            Bon Recipe</h1></div>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => { return { auth } }
const mapDispatchToProps = dispatch => {
    return { logoutUser: () => logoutUser(dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)