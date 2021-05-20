import React, {useEffect} from 'react';
import Left from "../components/left/Left";
import {Route, Switch} from "react-router-dom";
import Blank from "../components/right/Blank";
import Right from "../components/right/Right";
import SideBar from "../components/left/SideBar";
import NewChat from "../components/left/NewChat";
import {useDispatch, useSelector} from "react-redux";
import {fetchConversation} from "../redux/action";

const ChatPage = () => {
    const dispatch = useDispatch()
    const conversation = useSelector(state => state.conversation)
    useEffect(() => {
        dispatch(fetchConversation(localStorage.getItem('authToken')))
    }, [])
    return (
        <div className="layout">
            <SideBar />
            <Left />
            <NewChat />
            <Switch>
                <Route path={"/conversation/:id/:idU"} component={Right} />
                <Route path={"/conversation"} component={Blank} />
            </Switch>
        </div>
    );
};

export default ChatPage;