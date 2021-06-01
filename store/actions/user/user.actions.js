import axios from 'axios';
import { HOST_IP, HOST_IP_HOME } from '@env';
// import { config } from 'dotenv';

export const USER_LOGGED = "[USER] USER LOGGED";

export function userLogged(user) {
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

export const editAvatar = (formData) => {
    const configFormData = {
        onUploadProgress: progress => {
            const { total, loaded } = progress

            const totalSizeInMB = total / 1000000;
            const lodaedSizeInMB = loaded / 1000000;
            const uploadPercentage = (lodaedSizeInMB / totalSizeInMB) * 100; // on peut aussi exposer ces donées dans le dispatch pour pouvoir les récupérer  => par contre le state user se remettra a jour au fur et a mesure de la progression du fichier
            // on peut aussi créer une autre action et reducer service et appeller l'action ici pour stocker les valeur dans un autre state => meilleur méthode !!
        }, // permet de récupérer les données propres à la progression du chargement
        headers: {
            "content-type": "multipart/form-data"
        }
    }
    const request = axios.post(`${HOST_IP}/api/user/edit/avatar-image`
        , formData // donnée à envoyer
        , configFormData // configuration 
    );

    return (dispatch) =>
        request.then(response => {
            dispatch({
                type: EDIT_AVATAR_IMAGE,
                payload: response.data
            })
        })
}