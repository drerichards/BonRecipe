import React, { Component } from 'react'
import {Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Input } from 'react-materialize'
import { createUser, loginUser } from '../../actions/index'
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasAccount: false,
            username: '',
            password: '',
            tooltipText: `Don't Have an Account?`,
            headerText: `Welcome Back!`,
            buttonText: `Sign In`
        }
    }
    componentDidUpdate() {
        this.loginErrorMsg()
    }

    handleAcctToggle() {
        this.setState({ hasAccount: !this.state.hasAccount })
        if (this.state.hasAccount === true) {
            return this.setState({
                tooltipText: `Have an Account?`,
                headerText: `Create An Account`,
                buttonText: `Register`
            })
        } else {
            return this.setState({
                tooltipText: `Don't Have an Account?`,
                headerText: `Welcome Back!`,
                buttonText: `Sign In`
            })
        }
    }

    handleUNChange(e) {
        this.setState({ username: e.target.value })
    }

    handlePWChange(e) {
        this.setState({ password: e.target.value })
    }

    loginErrorMsg() {
        if (this.props.auth.status) {
            const errorBar = document.getElementById('errorBar')
            errorBar.innerHTML = `Error: ${this.props.auth.status}. Please try again!`
            errorBar.style.display = 'block'
            errorBar.style.opacity = '1'
            setTimeout(() => { errorBar.style.display = 'none' }, 3000)
        }
    }

    handleLoginClick(e) {
        e.preventDefault()
        const userBody = { username: this.state.username, password: this.state.password }
        this.state.buttonText === 'Register' ? this.props.createUser(userBody) : this.props.loginUser(userBody)
        this.loginErrorMsg()
    }

    render() {
        if (this.props.auth.loggedIn === true) {
            return <Redirect to="/" />
        }
        return (
            <div className="Login">
                <section className="card form-module">
                    <div className="toggle" onClick={() => this.handleAcctToggle()}><i className="fa fa-times fa-key"></i>
                        <div className="tooltip">{this.state.tooltipText}</div>
                    </div>
                    <h2>{this.state.headerText}</h2>
                    <form>
                        <Input type="text" autoComplete='true' required label="Username" defaultValue={this.state.username} onChange={e => this.handleUNChange(e)} />
                        <Input type="password" autoComplete='true' required label="Password" defaultValue={this.state.password} onChange={e => this.handlePWChange(e)} />
                        <Button className='button' waves='light' onClick={e => this.handleLoginClick(e)}>{this.state.buttonText}</Button>
                    </form>
                    <span id='errorBar'></span>
                </section>
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => { return { auth } }
const mapDispatchToProps = dispatch => {
    return {
        createUser: (userBody) => createUser(dispatch, userBody),
        loginUser: (userBody) => loginUser(dispatch, userBody)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)