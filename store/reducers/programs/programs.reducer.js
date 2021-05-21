import { GET_PROGRAMS } from './../../actions'; // => import du dossier action et récupération automatique de l'index.js

const initialState = { programs: [] };
//                                               v-- contient le contenue du dispatch 
const programsReducer = (state = initialState, action) => {

    let nextState; //undefined
    switch (action.type) {
        case GET_PROGRAMS:
            // on récupère l'action de notre requète    
            nextState = {
                ...state,
                programs: action.payload
            }
            return nextState || state // si le nextState est undefined on retourne le state

        default:
            return state
    }
}

export default programsReducer;