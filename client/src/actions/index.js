import axios from 'axios'
import { FETCH_API_RECIPES } from './types'
import { FETCH_SEARCH_RECIPES } from './types'
import { FETCH_ACCOUNT_RECIPES } from './types'
import { CREATE_USER } from './types'
import { LOGIN_USER } from './types'
import { LOGOUT_USER } from './types'
// import { ADD_SYS_RECIPE } from './types'
import { DELETE_RECIPE } from './types'

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
                dispatch({ type: FETCH_SEARCH_RECIPES, payload: response.data })
            })
            .catch(error => {
                return error
            })
    } catch (error) {
        return error
    }
}

export const fetchAccountRecipes = (dispatch, username) => {
    try {
        const route1 = `http://localhost:5000/sys_recipes/${username}`
        const route2 = `http://localhost:5000/user_recipes/${username}`
        axios.all([
            axios.get(route1),
            axios.get(route2)
        ])
            .then(axios.spread((sysRes, userRes) => {
                // console.log(sysRes.data)
                // console.log(userRes.data)
                dispatch({ type: FETCH_ACCOUNT_RECIPES, payload: [sysRes.data, userRes.data] })
            }))
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
                dispatch({ type: CREATE_USER, payload: { loggedIn: true, username: userBody.username } })
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

export const logoutUser = dispatch => {
    try {
        window.localStorage.clear()
        dispatch({ type: LOGOUT_USER, payload: { loggedIn: false, username: null } })
    } catch (error) {
        return error
    }
}

export const addSysRecipe = (dispatch, username, recipe) => {
    try {
        const route = `http://localhost:5000/sys_recipes/add/${username}`
        axios.post(route, recipe)
            .then(response => {
                // console.log(response)
                // dispatch({ type: CREATE_USER, payload:  recipe.username  })
            })
            .catch(error => {
                return error
            })
    } catch (error) {
        return error
    }
}

export const deleteRecipe = (dispatch, body) => {
    try {
        const route = `http://localhost:5000/recipe/delete`
        axios.put(route, body)
            .then(response => {
                console.log(response)
                dispatch({ type: DELETE_RECIPE, payload: { type: body[1], index: body[3] } })
            })
            .catch(error => {
                return error
            })
    } catch (error) {
        return error
    }
}