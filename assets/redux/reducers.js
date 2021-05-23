import {
    ADD_MESSAGE,
    CONVERSATION_LOAD,
    GET_CONVERSATION,
    GET_MESSAGE,
    MESSAGE_LOAD, SET_LAST_MESSAGE,
    USER_CONNECTED
} from "./constants";

const initialState = {
    login: "",
    items: [],
    isLoading: false,
}

const conversations = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONNECTED:
            return {
                ...state,
                login: action.data
            }
        case CONVERSATION_LOAD:
            return {
                ...state,
                isLoading: true
            }
        case GET_CONVERSATION:
            return {
                ...state,
                isLoading: false,
                items: action.data
            }
        case MESSAGE_LOAD:
            return {
                ...state,
                isLoading: true
            }
        case GET_MESSAGE:
            const _newConversation = state.items.map(conversation => {
                return parseInt(conversation.conversationId) === parseInt(action.conversationId) ?
                    {...conversation, messages: action.data} : conversation
            })
            return {
                ...state,
                isLoading: false,
                items: _newConversation
            }
        case ADD_MESSAGE:
            const _newConversationWithMessage = state.items.map(conversation => {
                return parseInt(conversation.conversationId) === parseInt(action.conversationId) ?
                    {...conversation, messages: [...conversation.messages, action.data]} : conversation
            })
            return {
                ...state,
                isLoading: false,
                items: [_newConversationWithMessage]
            }
        case SET_LAST_MESSAGE:
            const _newConversationWithMessageConv = state.items.map(conversation => {
                return parseInt(conversation.conversationId) === parseInt(action.conversationId) ?
                    (conversation.content = action.data.content,
                        conversation.createdAt = action.data.createdAt,
                            {...conversation}
                    ) : conversation
            })
            return {
                ...state,
                isLoading: false,
                items: [_newConversationWithMessageConv]
            }
        default:
            return state;
    }
}

export default conversations;
