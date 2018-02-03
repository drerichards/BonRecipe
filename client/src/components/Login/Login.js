import React, { Component } from 'react'
import { Button, Input } from 'react-materialize'
import './Login.css'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasAccount: true,
            username: '',
            password: '',
            tooltipText: `Have an Account?`,
            headerText: `Create An Account`,
            buttonText: `Register`,
        }
    }

    handleAcctToggle() {
        this.setState({ hasAccount: !this.state.hasAccount })
        console.log(this.state)
        if (this.state.hasAccount === true) {
            return this.setState({
                tooltipText: `Don't Have an Account?`,
                headerText: `Welcome Back!`,
                buttonText: `Sign In`
            })
        } else {
            return this.setState({
                tooltipText: `Have an Account?`,
                headerText: `Create An Account`,
                buttonText: `Register`
            })
        }
    }

    handleUNChange(e) {
        this.setState({username: e.target.value})
    }

    handlePWChange(e) {
        this.setState({password: e.target.value})
    }

    handleLoginClick(e) {
        e.preventDefault()
        console.log(this.state.username)
    }

    render() {
        return (
            <div className="Login">
                <section className="card form-module">
                    <div className="toggle" onClick={() => this.handleAcctToggle()}><i className="fa fa-times fa-key"></i>
                        <div className="tooltip">{this.state.tooltipText}</div>
                    </div>
                    <h2>{this.state.headerText}</h2>
                    <form>
                        <Input type="text" label="Username" defaultValue={this.state.username} onChange={e => this.handleUNChange(e)}/>
                        <Input type="password" label="Password" defaultValue={this.state.password} onChange={e => this.handlePWChange(e)}/>
                        <Button className='button' waves='light' onClick={e => this.handleLoginClick(e)}>{this.state.buttonText}</Button>
                    </form>
                </section>
                <section className="buttonSection">
                    <Button className="googleBtn" waves='light'><i className="fa fa-times fa-google-plus"></i>  Sign-In with Google</Button>
                    <Button className="facebookBtn" waves='light'><i className="fa fa-times fa-facebook"></i>  Sign-In with Facebook</Button>
                    {/* <a href='http://localhost:5000/auth/google' className="googleBtn"><i className="fa fa-times fa-google-plus"></i>Sign-In with Google</a>
                    <a href='http://localhost:5000/auth/facebook' className="facebookBtn"><i className="fa fa-times fa-facebook"></i>Sign-In with Facebook</a> */}
                </section>
            </div>
        )
    }
}

export default Login