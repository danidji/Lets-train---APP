import axios from 'axios';
import { HOST_IP, HOST_IP_HOME } from '@env';

export const USER_LOGGED = "[USER] USER LOGGED";

export function userLogged(user) {
    return (dispatch) =>
        dispatch({
            type: USER_LOGGED,
            payload: user
        })
}