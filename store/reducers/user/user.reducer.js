import { USER_LOGGED } from './../../actions';

const initialState = {
    user: {}
}

const userReducer = (state = initialState, action) => {
    let nextState;

    switch (action.type) {
        case USER_LOGGED:
            nextState = {
                ...state,
                user: action.payload
            }
            return nextState || state

        default:
            return state;
    }
}



export default userReducer;