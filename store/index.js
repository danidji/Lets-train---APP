import { applyMiddleware, compose, createStore } from "redux";
import logger from 'redux-logger'; // logger les erreurs de redux => peut charger la console
import { NODE_ENV } from '@env';

import createReducer from "./reducers";
import thunk from 'redux-thunk'; // permet de faire de l'async dans les composants

//mozilla => donner des règles spécifiques 
const composeEnhancers =
    NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) //actionsBlacklist, actionsCreators, serialize
        : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk, logger)); //permet d'injecter des choses 
const enhancer = composeEnhancers(applyMiddleware(thunk)); // => a activer si la console est trop chargé

export default createStore(createReducer, enhancer)