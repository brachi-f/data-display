import * as actions from './action.jsx';
const initialState = {
    user: null,
    links: []
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SETUSER: {

            return { ...state, user: action.data };
        }
        case actions.SETLINKS: {

            return { ...state, links: action.data };
        }
        case actions.ADDLINK: {
            return { ...state, links: [...state.links, action.data] };
        }
        case actions.SETLINK: {
            const links = state.links
            let i = links.findIndex(l => l.id === action.data.id)
            links[i] = action.data
            return { ...state, links }
        }
        case actions.DELETELINK: {
            let links = state.links
            links = links.filter(l => l.id !== action.data)
            return { ...state, links }
        }
        default: return state;
    }
};

export default reducer;
