import {USER_CONNECTED, USER_ERROR_CONNECTED} from "./constants";

import {LOCALHOST} from "../components/config";

export const login = (data) => {
    return {
        type: USER_CONNECTED,
        data
    }
}

export const errorLogin = (data) => {
    return {
        type: USER_ERROR_CONNECTED,
        data
    }
}

export const loginUser = (data) => dispatch => {
    return fetch(LOCALHOST + '/api/login_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: data.username,
            password: data.password
        })
    })
        .then(response => {
            if (!response.ok) {
                return dispatch(errorLogin(response))
            }
            return response.json()
        })
        .then(response => {
            console.log(response)
            window.localStorage.setItem('authToken', response.token)
            return dispatch(login(response))
        })
}