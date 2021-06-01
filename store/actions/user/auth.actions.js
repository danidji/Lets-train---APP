import axios from 'axios';
import { HOST_IP, HOST_IP_HOME } from '@env';


export const LOGIN_USER = "[AUTH] LOGIN USER";

//methode avec mapDispatchToProps
export function login(data) {
    const request = axios.post(`${HOST_IP}/api/user/login`, {
        params: { user: data.user }
    })
    return (dispatch) =>
        request.then((response) => // Sans accolade, cela fait un return direct
            dispatch({
                type: LOGIN_USER
                , payload: response.data
            })
        )
}


export const REGISTER_USER = "[AUTH] REGISTER USER";

// methode sans mapDispatchtoProps / avec useDispatch
export const registerUser = (data) => dispatch =>
    new Promise((resolve, reject) => {
        const request = axios.post(`${HOST_IP}/api/user/register`, {
            params: { user: data.user }
        });
        request.then(response => {
            resolve(
                dispatch({
                    type: REGISTER_USER,
                    payload: response.data
                })
            )
        })
    });


export const CHECK_USER = "[AUTH] CHECK USER";

export const check = () => dispatch =>
    new Promise((resolve, reject) => {
        const request = axios.get(`${HOST_IP}/api/user/check`);
        request.then((response) => {
            resolve(
                dispatch({
                    type: CHECK_USER
                    , payload: response.data
                })
            )
        })
    })
