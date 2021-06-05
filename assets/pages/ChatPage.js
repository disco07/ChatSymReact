import React, {useContext, useEffect, useState} from 'react';
import Left from "../components/left/Left";
import {Route, Switch} from "react-router-dom";
import Blank from "../components/right/Blank";
import Right from "../components/right/Right";
import SideBar from "../components/left/SideBar";
import NewChat from "../components/left/NewChat";
import {useDispatch, useSelector} from "react-redux";
import {fetchConversation} from "../redux/action";
import Services from "../services/Services";
import SocketContext from "../contexts/SocketContext";

const ChatPage = () => {

    const {socket} = useContext(SocketContext)
    const dispatch = useDispatch()
    const conversations = useSelector(state => state.conversations)
    useEffect(() => {
        dispatch(fetchConversation(localStorage.getItem('authToken')))
        socket.emit("join", {user: Services.user().id})
    }, [])
    return (

        <div className="layout">
            <SideBar user={Services.user()}/>
            <Left conversations={conversations}/>
            <NewChat/>
            <Switch>
                <Route path={"/conversation/:id/:idU"}
                       render={props => <Right {...props} conversationId={props.match.params.id}
                                               otherUser={props.match.params.idU}
                                               user={Services.user()}/>}/>
                <Route path={"/conversation"} component={Blank}/>
            </Switch>
        </div>
    );
};

export default ChatPage;