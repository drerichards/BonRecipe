import { combineReducers } from 'redux'
import api_recipeReducer from './api_recipeReducer'
import accountRecipeReducer from './accountRecipeReducer'
import authReducer from './authReducer'

export default combineReducers({
    api_recipes: api_recipeReducer,
    accountRecipes: accountRecipeReducer,
    auth: authReducer
})
