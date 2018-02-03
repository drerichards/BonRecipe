import React, { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true })
        // You can also log the error to an error reporting service
        console.log(error, info)
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>
        }
        //else return everything between the error wrapper
        return this.props.children
    }
}

export default ErrorBoundary