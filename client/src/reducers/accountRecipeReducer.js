import { FETCH_ACCOUNT_RECIPES, ADD_USER_RECIPE, DELETE_RECIPE } from '../actions/types'

export default function (state = [[], []], action) {
    switch (action.type) {
        case FETCH_ACCOUNT_RECIPES:
            return action.payload
        case ADD_USER_RECIPE:
            const newState = [...state[1], action.payload]
            return [state[0], newState]
        case DELETE_RECIPE:
            const data = action.payload
            if(data.type === 'sys_recipes'){
                let sysArr = [...state[0]] //makes copy of original state
                sysArr.splice(data.index, 1) //extract index
                return [sysArr, state[1]]
            } else {
                let userArr = [...state[1]]
                userArr.splice(data.index, 1)
                return [state[0], userArr]
            }
        default:
            return state
    }
}