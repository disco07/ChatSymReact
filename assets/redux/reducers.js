import {
    ADD_CONVERSATION,
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
            const _newItemsFinal = state.items.map(conversation => {
                return parseInt(conversation.conversationId) === parseInt(action.conversationId)
                    ?
                    (
                        Object.assign({}, conversation, {messages: [...conversation.messages, action.data]})
                    )
                    : Object.assign({}, conversation);
            });
            return {
                ...state,
                items: [..._newItemsFinal]
            }
        case ADD_CONVERSATION:
            let count = 0;
            count = state.items.filter(conversation =>  parseInt(conversation?.conversationId) === parseInt(action.data.conversationId)).length;
            count === 0 && (action.data.conv.lastMessage = {users: {id: action.data.userId}})
            return {
                ...state,
                items: count > 0 ? state.items : [...state.items, action.data]
            }
        case SET_LAST_MESSAGE:
            console.log(action.data)
            const _newConversationsWithLastMessage = state.items.map(conversation => {
                return parseInt(conversation.conversationId) === parseInt(action.conversationId) ?
                    (
                        conversation.createdAt = action.data.createdAt,
                            conversation.content = action.data.content,
                            conversation.conv.lastMessage = {users: {id: action.data.users.id}},
                            Object.assign({}, conversation)
                    ) :
                    Object.assign({}, conversation)
            })
            return {
                ...state,
                items: [..._newConversationsWithLastMessage]
            }
        default:
            return state;
    }
}

export default conversations;
