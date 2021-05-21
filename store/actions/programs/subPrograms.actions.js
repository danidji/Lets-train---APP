import axios from 'axios';
import { HOST_IP } from '@env';

export const GET_SUBPROGRAMS = "[SUB_PROGRAMS] GET SUB PROGRAMS"

export function getSubPrograms(id) {
    const request = axios.get(`${HOST_IP}/api/sous-programmes/liste`, {
        params: { parentId: id } // => req.query
    });


    return dispatch => request.then((response) => {
        console.log(`returndispatch=>request.then -> response`, response.data)

        dispatch({
            type: GET_SUBPROGRAMS,
            payload: response.data
        })
    })
}