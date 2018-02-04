import axios from 'axios'
import { FETCH_API_RECIPES } from './types'
import { FETCH_SEARCH_RECIPE } from './types'
import { CREATE_USER } from './types'
import { LOGIN_USER } from './types'
import { LOGOUT_USER } from './types'

export const fetchAPIRecipes = dispatch => { //dispatch is bridge to reducer 
    try {
        const route = `http://localhost:5000/api/recipes`
        axios.get(route)
            .then(response => {
                dispatch({ type: FETCH_API_RECIPES, payload: response.data })
            })
            .catch(error => {
                return error
            })
    } catch (error) {
        return error
    }
}

export const fetchSearchRecipes = (dispatch, query) => {
    try {
        const route = `http://localhost:5000/api/search_recipes/${query}`
        axios.get(route)
            .then(response => {
                dispatch({ type: FETCH_SEARCH_RECIPE, payload: response.data })
            })
            .catch(error => {
                return error
            })
    } catch (error) {
        return error
    }
}

export const createUser = (dispatch, userBody) => {
    try {
        const route = `http://localhost:5000/api/users`
        axios.post(route, userBody)
            .then(response => {
                dispatch({ type: CREATE_USER, payload: { loggedIn: true, username: response.data } })
            })
            .catch(error => {
                dispatch({ type: CREATE_USER, payload: { loggedIn: false, username: null } })
            })
    } catch (error) {
        return error
    }
}

export const loginUser = (dispatch, userBody) => {
    try {
        const route = `http://localhost:5000/api/auth/login`
        axios.post(route, userBody)
            .then(response => {
                dispatch({ type: LOGIN_USER, payload: { loggedIn: true, username: userBody.username } })
            })
            .catch(error => {
                dispatch({ type: LOGIN_USER, payload: { loggedIn: false, username: null } })
            })
    } catch (error) {
        return error
    }
}

export const logoutUser = (dispatch) => {
    try {
        window.localStorage.clear()
        dispatch({ type: LOGOUT_USER, payload: { loggedIn: false, username: null } })
    } catch (error) {
        return error
    }
}