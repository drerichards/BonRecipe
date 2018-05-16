import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Input } from 'react-materialize'
import { createUser, loginUser } from '../../actions/index'
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showError: false,
            hasAccount: false,
            username: '',
            password: '',
            tooltipText: `Don't Have an Account?`,
            headerText: `Welcome Back!`,
            buttonText: `Sign In`
        }
    }

    handleAcctToggle() {
        const { hasAccount } = this.state
        this.setState(() => ({ showError: false }))
        this.setState({ hasAccount: !hasAccount })
        if (!hasAccount) {
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

    loginErrorMsg(status) {
        const errorMsg = `Error: ${status}. Please try again!`

        return errorMsg
    }

    handleLoginClick(e) {
        e.preventDefault()
        const userBody = { username: this.state.username, password: this.state.password }
        this.setState(() => ({ showError: true }))
        this.state.buttonText === 'Register' ? this.props.createUser(userBody) : this.props.loginUser(userBody)
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
                        {this.props.auth.status !== '' && this.state.showError ? <span id='errorBar'>Error: {this.props.auth.status}. Please try again!</span> : ''}
                    </form>
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