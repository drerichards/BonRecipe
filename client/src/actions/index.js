import axios from 'axios'
import { FETCH_API_RECIPES } from './types'
import { FETCH_SEARCH_RECIPES } from './types'
import { FETCH_ACCOUNT_RECIPES } from './types'
import { CREATE_USER } from './types'
import { LOGIN_USER } from './types'
import { LOGOUT_USER } from './types'
import { ADD_SYS_RECIPE } from './types'
import { ADD_USER_RECIPE } from './types'
import { EDIT_USER_RECIPE } from './types'
import { DELETE_RECIPE } from './types'
const url = 'https://bonrecipe-server.herokuapp.com'

export const fetchAPIRecipes = dispatch => { //dispatch is bridge to reducer 
    try {
        const route = `${url}/api/recipes`
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
        const route = `${url}/api/search_recipes/${query}`
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
        const route1 = `${url}/sys_recipes/${username}`
        const route2 = `${url}/user_recipes/${username}`
        axios.all([
            axios.get(route1),
            axios.get(route2)
        ])
            .then(axios.spread((sysRes, userRes) => {
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
        const route = `${url}/api/users`
        axios.post(route, userBody)
            .then(response => {
                dispatch({ type: CREATE_USER, payload: { loggedIn: true, username: userBody.username, status: '' } })
            })
            .catch(error => {
                dispatch({ type: CREATE_USER, payload: { loggedIn: false, username: null, status: error.response.data.message } })
            })
    } catch (error) {
        return error
    }
}

export const loginUser = (dispatch, userBody) => {
    try {
        const route = `${url}/api/auth/login`
        axios.post(route, userBody)
            .then(response => {
                dispatch({ type: LOGIN_USER, payload: { loggedIn: true, username: userBody.username, status: '' } })
            })
            .catch(error => {
                dispatch({ type: LOGIN_USER, payload: { loggedIn: false, username: null, status: error.response.data } })
            })
    } catch (error) {
        return error
    }
}

export const logoutUser = dispatch => {
    try {
        localStorage.clear()
        dispatch({ type: LOGOUT_USER, payload: { loggedIn: false, username: null, status: '' } })
    } catch (error) {
        return error
    }
}

export const addSysRecipe = (dispatch, username, recipe) => {
    try {
        const route = `${url}/sys_recipes/add/${username}`
        axios.post(route, recipe)
            .then(response => {
                const sysRecipe = { id: recipe[0], name: recipe[1], ingredients: recipe[2], image: recipe[3], cookTime: recipe[4] }                
                dispatch({ type: ADD_SYS_RECIPE, payload: sysRecipe })
            })
            .catch(error => {
                return error
            })
    } catch (error) {
        return error
    }
}

export const addUserRecipe = (dispatch, username, recipe) => {
    try {
        const route = `${url}/user_recipes/add/${username}`
        axios.post(route, recipe)
        .then(response => {
            dispatch({ type: ADD_USER_RECIPE, payload: recipe})            
        })
        .catch(error => {
            return error
        })
    } catch (error) {
        return error
    }
}

export const editUserRecipe = (dispatch, username, recipe) => {
    try {
            const route = `${url}/user_recipes/edit/${username}`
            axios.post(route, recipe)
                .then(response => {
            const editRecipe = {id: recipe[0][1], name: recipe[0][0], ingredients: recipe[1]}
                dispatch({ type: EDIT_USER_RECIPE, payload: [editRecipe, recipe[0][2]] })
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
        const route = `${url}/recipe/delete`
        axios.put(route, body)
            .then(response => {
                dispatch({ type: DELETE_RECIPE, payload: { type: body[1], index: body[3] } })
            })
            .catch(error => {
                return error
            })
    } catch (error) {
        return error
    }
}