import axios from 'axios';
import { HOST_IP, HOST_IP_HOME } from '@env';

export const GET_PROGRAMS = "[PROGRAMS] GET PROGRAMS" // [NOM DU PARENT] + NOM DE L'ACTION

export function getPrograms() {
    const request = axios.get(`${HOST_IP}/api/programmes/liste`, {
        params: {}
    });

    //          v dispatch de l'action vers le reducers le type et le retour de la l'action
    return dispatch => request.then((response) => {
        dispatch({
            type: GET_PROGRAMS, // type de l'action
            payload: response.data //Envoi des données au reducers
        })
    })
}


export const EDIT_PROGRAMS = ""