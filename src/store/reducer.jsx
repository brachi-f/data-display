import * as actions from './action.jsx'

initialState = {
    user: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SETUSER: {
            return { ...state, user: action.data }
        }
        default:  return { ...state } 
    }
}

export default reducer