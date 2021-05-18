import {USER_CONNECTED} from "./constants";

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
        default:
            return state;
    }
}

export default conversation;
