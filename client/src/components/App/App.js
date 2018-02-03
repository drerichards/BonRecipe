import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ErrorBoundary from '../ErrorBoundary'
import Home from '../Home/Home'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Account from '../Account/Account'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        {/* root */}
        <ErrorBoundary>
          <div className="App">

            {/* header */}
            <ErrorBoundary>
              <Header />
            </ErrorBoundary>

            {/* home */}
            <ErrorBoundary>
              <Route exact path='/' component={Home} />
            </ErrorBoundary>

            {/* userInfo */}
            <ErrorBoundary>
              <Route path='/:userId/:userEmail/:userName/:userService' component={Home} />
            </ErrorBoundary>

            {/* account */}
            <ErrorBoundary>
              <Route path='/account' component={Account} />
            </ErrorBoundary>

            {/* login */}
            <ErrorBoundary>
              <Route path='/login' component={Login} />
            </ErrorBoundary>
          </div>
        </ErrorBoundary>
      </Router>
    )
  }
}

export default App
