import {CONVERSATION_LOAD, GET_CONVERSATION, USER_CONNECTED} from "./constants";

const initialState = {
    login: "",
    items: [],
    isLoading: false,
}

const conversation = (state = initialState, action) => {
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
        default:
            return state;
    }
}

export default conversation;
