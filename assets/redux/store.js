import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import conversations from "./reducers";

const rootReducer = combineReducers({
    conversations
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;
