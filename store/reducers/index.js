import { combineReducers } from "redux";
import programsReducer from "./programs/programs.reducer"
import programsinsideReducer from '.programs/programsInside.reducer';// /!\ ne mettre qu'une seule majuscule dans le nom de variable

// permet de répertorier tous les fichiers reducer créé

const createReducer = combineReducers({
    programsReducer,
    programsinsideReducer
})

export default createReducer;