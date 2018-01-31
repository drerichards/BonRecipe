import { combineReducers } from 'redux'
import api_recipeReducer from './api_recipeReducer'

export default combineReducers({
    api_recipes: api_recipeReducer
})
