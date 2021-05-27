import { LOGIN_USER } from './../../actions'

const initialState = {
    data: {
        user: {},
        error: {
            email: null,           // => reprend les même noms d'erreurs pour que les erreurs générer en back, soit disponible en front
            password: null,
            verifPass: null
        }
    }
}

const authReducer = (state = initialState, action) => {
    let nextState;

    switch (action.type) {
        case LOGIN_USER:
            nextState = {
                ...state,
                data: action.payload
            }
            return nextState || state

        default:
            return state;
    }
}


export default authReducer;