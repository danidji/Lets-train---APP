import axios from 'axios';
import { HOST_IP } from '@env';

export const GET_PROGRAMS = "[PROGRAMS] GET PROGRAMS" // [NOM DU PARENT] + NOM DE L'ACTION

export function getPrograms() {
    const request = axios.get(`${HOST_IP}/api/programs/list`, {
        params: {}
    });


    return dispatch => request.then((response) => {
        dispatch({
            type: GET_PROGRAMS, // type de l'action
            payload: response.data //Envoi des données au reducers
        })
    })
}


export const EDIT_PROGRAMS = ""