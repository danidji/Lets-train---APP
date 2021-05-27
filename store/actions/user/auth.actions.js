import axios from 'axios';
import { HOST_IP, HOST_IP_HOME } from '@env';


export const LOGIN_USER = "[AUTH] LOGIN USER";

export function login(data) {
    const request = axios.post(`${HOST_IP}/api/user/login`, {
        params: { user: data.user }
    })
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: LOGIN_USER
                , payload: response.data
            })
        })
}