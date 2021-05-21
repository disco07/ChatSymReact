import {
    CONVERSATION_ERROR,
    CONVERSATION_LOAD,
    GET_CONVERSATION, GET_MESSAGE, MESSAGE_ERROR, MESSAGE_LOAD,
    USER_CONNECTED,
    USER_ERROR_CONNECTED
} from "./constants";

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

export const loadConversation = () => {
    return {
        type: CONVERSATION_LOAD,
    }
}

export const getConversation = (data) => {
    return {
        type: GET_CONVERSATION,
        data
    }
}

export const errorConversation = () => {
    return {
        type: CONVERSATION_ERROR,
    }
}

export const loadMessage = () => {
    return {
        type: MESSAGE_LOAD,
    }
}

export const getMessage = (conversationId, data) => {
    return {
        type: GET_MESSAGE,
        conversationId,
        data
    }
}

export const errorMessage = () => {
    return {
        type: MESSAGE_ERROR,
    }
}

const bearer = (bearer_token) => 'Bearer ' + bearer_token;

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
            window.localStorage.setItem('authToken', response.token)
            return dispatch(login(response))
        })
}

export const fetchConversation = (bearer_token) => dispatch => {
    dispatch(loadConversation())
    return fetch(LOCALHOST + '/api/allconversations', {
        method: 'GET',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                return dispatch(errorConversation(response))
            }
            return response.json()
        })
        .then(response => {
            return dispatch(getConversation(response['hydra:member']))
        })
}

export const fetchMessage = (conversationId, bearer_token) => dispatch => {
    dispatch(loadMessage())
    return fetch(LOCALHOST + '/api/messages?conversation=' + conversationId, {
        method: 'GET',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                return dispatch(errorMessage(response))
            }
            return response.json()
        })
        .then(response => {
            return dispatch(getMessage(conversationId, response['hydra:member']))
        })
}