import React, { Component } from 'react'
import { Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import ErrorBoundary from '../ErrorBoundary'
import Home from '../Home/Home'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Account from '../Account/Account'
import './App.css'

export const history = createHistory()
class App extends Component {
  render() {
    return (
      <Router history={history}>
        {/* root */}
        <ErrorBoundary>
          <div className="App">

            {/* header */}
            <ErrorBoundary>
              <Header />
            </ErrorBoundary>

            {/* login */}
            <ErrorBoundary>
              <Route path='/login' component={Login} />
            </ErrorBoundary>

            {
              !this.props.auth.loggedIn ?
                <Redirect to="/login" />: ''
            }

            {/* home */}
            <ErrorBoundary>
              <Route exact path='/' component={Home} />
            </ErrorBoundary>

            {/* account */}
            <ErrorBoundary>
              <Route path='/account' component={Account} />
            </ErrorBoundary>
            

          </div>
        </ErrorBoundary>
      </Router>
    )
  }
}

const mapStateToProps = ({ auth }) => { return { auth } }
export default connect(mapStateToProps)(App)
