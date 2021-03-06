import { CREATE_USER, LOGIN_USER, LOGOUT_USER } from '../actions/types'

export default function (state = {loggedIn: false, username: null, status: ''}, action) {
    switch (action.type) {
        case CREATE_USER:
            return action.payload
        case LOGIN_USER:
            return action.payload
        case LOGOUT_USER:
            return action.payload
        default:
            return state
    }
}