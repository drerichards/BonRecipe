import { combineReducers } from 'redux'
import api_recipeReducer from './api_recipeReducer'
import authReducer from './authReducer'

export default combineReducers({
    api_recipes: api_recipeReducer,
    auth: authReducer
})
