import { LOGIN_USER, REGISTER_USER, CHECK_USER } from './../../actions'
// Initialisation du modèle de données dans un état
const initialState = {
    data: {
        user: {},
        access_token: null,
        errors: {
            email: null,           // => reprend les même noms d'erreurs pour que les erreurs générer en back, soit disponible en front
            password: null,
            verifPass: null
        }
    }
}
// Récupération des données retournée par l'action en fonction de son type
const authReducer = (state = initialState, action) => {
    let nextState;

    switch (action.type) {
        case LOGIN_USER:
            nextState = {
                ...state,
                data: action.payload
            }
            return nextState || state


        case REGISTER_USER:
            nextState = {
                ...state,
                data: action.payload
            }
            return nextState || state

        case CHECK_USER:
            nextState = {
                ...state,
                data: action.payload
            }
            return nextState || state

        default:
            // les données sont mise à dispo dans un état
            return state;
    }
}


export default authReducer;