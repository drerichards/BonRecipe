import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux' // passes the Redux store down to any components that request access to part of it
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { loadState, saveState } from './localStorage'
import reducers from './reducers'
import App from './components/App/App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const enhancer = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(reducers, enhancer)
store.subscribe(() => saveState(store.getState())) //called any time an action is dispatched, and some part of the state tree changes
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
