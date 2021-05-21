import { combineReducers } from "redux"; // permet d'assembler les reducers
import programsReducer from "./programs/programs.reducer"
import programsinsideReducer from '.programs/programsInside.reducer';// /!\ ne mettre qu'une seule majuscule dans le nom de variable

// permet de répertorier tous les fichiers reducer créés

const createReducer = combineReducers({
    programsReducer,
    // programsinsideReducer
})

export default createReducer;