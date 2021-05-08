import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import conversation from "./reducers";

const rootReducer = combineReducers({
    conversation
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;
