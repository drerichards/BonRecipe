import axios from 'axios'
import { CREATE_USER } from './types'
import { LOGIN_USER } from './types'
import { FETCH_API_RECIPES } from './types'
import { SEARCH_RECIPE } from './types'

export const fetchAPIRecipes = dispatch => { //dispatch is bridge to reducer 
    try {
        const route = `http://localhost:5000/api/recipes`
        axios.get(route)
            .then(response => {
                dispatch({ type: FETCH_API_RECIPES, payload: response.data })
            })
            .catch((error) => {
                return error
            })
    } catch (error) {
        return error
    }
}