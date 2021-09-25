import { USER_LOGGED, USER_LOGOUT, EDIT_AVATAR_IMAGE } from './../../actions';

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

        case USER_LOGOUT:
            nextState = {
                ...state,
                user: action.payload
            }
            return nextState || state

        case EDIT_AVATAR_IMAGE:
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