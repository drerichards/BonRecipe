import { FETCH_ACCOUNT_RECIPES, ADD_SYS_RECIPE, ADD_USER_RECIPE, EDIT_USER_RECIPE, DELETE_RECIPE } from '../actions/types'

export default function (state = [[], []], action) {
    switch (action.type) {
        case FETCH_ACCOUNT_RECIPES:
            return action.payload
        case ADD_SYS_RECIPE:
            const checkAndAdd = id => {
                const found = state[0].some(function (el) { //look through objects in array
                    return el.id === id // found set to true and returns
                })
                if (!found) { //if found comes back false, the id was not found in the array objects
                    const newSysRecState = [...state[0], action.payload]
                    return [newSysRecState, state[1]]
                } else return [state[0], state[1]] //if found comes back true if id was found
            }
            return checkAndAdd(action.payload.id)
        case ADD_USER_RECIPE:
            const newUserRecState = [...state[1], action.payload]
            return [state[0], newUserRecState]
        case EDIT_USER_RECIPE:
            const editData = action.payload
            const newEditState = [...state[1]]
            newEditState.splice(editData[1], 1) //remove old entry
            newEditState.splice(editData[1], 0, editData[0]) //insert new entry
            return [state[0], newEditState]
        case DELETE_RECIPE:
            const data = action.payload
            if (data.type === 'sys_recipes') {
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