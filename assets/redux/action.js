import {
    ADD_CONVERSATION,
    ADD_MESSAGE,
    CONVERSATION_ERROR,
    CONVERSATION_LOAD,
    GET_CONVERSATION,
    GET_MESSAGE,
    MESSAGE_ERROR,
    MESSAGE_LOAD,
    SET_LAST_MESSAGE,
    USER_CONNECTED,
    USER_ERROR_CONNECTED
} from "./constants";

import {LOCALHOST} from "../services/config";

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

export const addConversation = (data, userId) => {
    return {
        type: ADD_CONVERSATION,
        data: {
            conv: data.conv,
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            avatar: data.avatar,
            content: data.content,
            createdAt: data.createdAt,
            conversationId: data.conversationId,
        },
        userId
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

export const addMessage = (conversationId, data) => {
    return {
        type: ADD_MESSAGE,
        conversationId,
        data
    }
}

export const setLastMessage = (conversationId, data) => {
    return {
        type: SET_LAST_MESSAGE,
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

export const loginUser = (data) => async dispatch => {
    const response = await fetch(LOCALHOST + '/api/login_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: data.username,
            password: data.password
        })
    });
    if (!response.ok) {
        return dispatch(errorLogin(response));
    }
    const response_1 = await response.json();
    window.localStorage.setItem('authToken', response_1.token);
    return dispatch(login(response_1));
}

export const fetchConversation = (bearer_token) => async dispatch => {
    dispatch(loadConversation())
    const response = await fetch(LOCALHOST + '/api/allconversations', {
        method: 'GET',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        return dispatch(errorConversation(response));
    }
    const response_1 = await response.json();
    return dispatch(getConversation(response_1['hydra:member']));
}

export const fetchMessage = (conversationId, bearer_token) => async dispatch => {
    dispatch(loadMessage())
    const response = await fetch(LOCALHOST + '/api/messages?conversation=' + conversationId, {
        method: 'GET',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        return dispatch(errorMessage(response));
    }
    const response_1 = await response.json();
    return dispatch(getMessage(conversationId, response_1['hydra:member'].reverse()));
}

export const fetchMessagesUnread = async (id, bearer_token) => {
    const response = await fetch(LOCALHOST + '/api/messages_unread?conversation=' + id, {
        method: 'GET',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
    });
    return await response.json();
}

export const postMessages = (conversationId, content, newConversation, bearer_token) => async dispatch => {
    const response = await fetch(LOCALHOST + '/api/newMessage?conversation=' + conversationId, {
        method: 'POST',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: content
        })
    });
    const response_1 = await response.json();
    if (newConversation === false) {
        dispatch(setLastMessage(conversationId, response_1));
        return dispatch(addMessage(conversationId, response_1));
    }
    dispatch(setLastMessage(conversationId, response_1));
    dispatch(addMessage(conversationId, response_1));
    return response_1;
}

export const fetchUsers = async (search) => {
    const response = await fetch(LOCALHOST + '/api/users?firstName=' + search, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const response_1 = await response.json();
    return response_1['hydra:member'];
}

export const postConversations = async (user, bearer_token) => {
    const response = await fetch(LOCALHOST + '/api/newconversations?users=' + user, {
        method: 'POST',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    return await response.json();
}

export const patchMessagesUnread = async (messageId, read, bearer_token) => {
    const response = await fetch(LOCALHOST + '/api/messages/' + messageId, {
        method: 'PUT',
        headers: {
            'Authorization': bearer(bearer_token),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: read
        })
    });
    return await response.json();
}