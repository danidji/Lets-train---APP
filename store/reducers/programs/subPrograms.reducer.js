import { GET_SUBPROGRAMS, GET_NEXT_ITEM } from './../../actions'

const initialState = { subPrograms: [], nextProgram: {} };

const subprogramsReducer = (state = initialState, action) => {
    let nextState;

    switch (action.type) {
        case GET_SUBPROGRAMS:
            nextState = {
                ...state,
                subPrograms: action.payload
            }
            return nextState || state


        case GET_NEXT_ITEM:
            nextState = {
                ...state,
                nextProgram: action.payload
            }
            return nextState || state
        default:
            return state
    }
}

export default subprogramsReducer