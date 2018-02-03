import { FETCH_API_RECIPES, SEARCH_RECIPE } from '../actions/types'

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_API_RECIPES:
        // console.log(action.payload)
            return [...state, action.payload]
        case SEARCH_RECIPE:
            return action.payload
        default:
            return state
    }
}