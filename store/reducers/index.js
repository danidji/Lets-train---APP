import { combineReducers } from "redux"; // permet d'assembler les reducers

// import des reducers
import programsReducer from "./programs/programs.reducer"
import subprogramsReducer from './programs/subPrograms.reducer'; // /!\ ne mettre qu'une seule majuscule dans le nom de variable

import authReducer from './user/auth.reducer';

// permet de répertorier tous les fichiers reducer créés

const createReducer = combineReducers({
    programsReducer,
    subprogramsReducer,
    authReducer
})

export default createReducer;