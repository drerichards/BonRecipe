import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'react-materialize'
import { logoutUser, fetchAccountRecipes } from '../../actions/index'
import './Header.css'

class Header extends Component {
    componentWillMount(){
        this.props.fetchRecipes(this.props.auth.username)
    }
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
                            <Link to='/account'><Button className='acctBtn' waves='light'><i className="fa fa-list fa-1x" aria-hidden="true"></i> Account <span className="badge">{this.props.accountRecipes[0].length}</span></Button></Link>
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

const mapStateToProps = ({ auth, accountRecipes }) => { return { auth, accountRecipes } }
const mapDispatchToProps = dispatch => {
    return { 
        fetchRecipes: username => fetchAccountRecipes(dispatch, username),        
        logoutUser: () => logoutUser(dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)