import axios from 'axios';
import { HOST_IP } from '@env';

export const GET_SUBPROGRAMS = "[SUB_PROGRAMS] GET SUB PROGRAMS"

// export function getSubPrograms(id) {
//     const request = axios.get(`${HOST_IP}/api/sous-programmes/liste`, {
//         params: { parentId: id } // => req.query
//     });


//     return dispatch => request.then((response) => {
//         dispatch({
//             type: GET_SUBPROGRAMS,
//             payload: response.data
//         })
//     })
// }

//autre forme : 
export const getSubPrograms = (id) => dispatch =>
    new Promise((resolve, reject) => {
        const request = axios.get(`${HOST_IP}/api/sous-programmes/liste`, {
            params: { parentId: id }
        });
        request.then(response => {
            resolve(
                dispatch({
                    type: GET_SUBPROGRAMS,
                    payload: response.data
                })
            )
        })
    })
