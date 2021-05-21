import { GET_SUBPROGRAMS } from './../../actions'

const initialState = { subPrograms: [] };

const subprogramsReducer = (state = initialState, action) => {
    let nextState;

    switch (action.type) {
        case GET_SUBPROGRAMS:
            nextState = {
                ...state,
                subPrograms: action.payload
            }
            return nextState || state

        default:
            return state
    }
}

export default subprogramsReducer