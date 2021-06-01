import axios from 'axios';
import { HOST_IP, HOST_IP_HOME } from '@env';
import { config } from 'dotenv';

export const USER_LOGGED = "[USER] USER LOGGED";

export function userLogged(user) {
    // console.log(`userLogged -> user`, user)
    return (dispatch) =>
        dispatch({
            type: USER_LOGGED,
            payload: user
        })
}

export const USER_LOGOUT = "[USER] USER LOGOUT"

export function userLogout() {
    return (dispatch) =>
        dispatch({
            type: USER_LOGOUT,
            payload: {}
        })
}


export const EDIT_AVATAR_IMAGE = "[USER] EDIT AVATAR IMAGE"

export const editAvatar = (formData) => dispatch =>
    new Promise((resolve, reject) => {
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }
        const request = axios.post(`${HOST_IP}/api/user/edit/avatar-image`
            , formData // donnée à envoyer
            , config // configuration 
        );
        request.then(response => {
            resolve(
                dispatch({
                    type: EDIT_AVATAR_IMAGE,
                    payload: response.data
                })
            )
        })
    })