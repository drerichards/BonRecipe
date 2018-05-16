import { FETCH_API_RECIPES, FETCH_SEARCH_RECIPES } from '../actions/types'

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_API_RECIPES:
            return [action.payload]
        case FETCH_SEARCH_RECIPES:
            return [action.payload]
        default:
            return state
    }
}