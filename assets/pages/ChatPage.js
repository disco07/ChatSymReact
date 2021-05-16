import React from 'react';
import Left from "../components/left/Left";
import {Route, Switch} from "react-router-dom";
import Blank from "../components/right/Blank";
import Right from "../components/right/Right";
import SideBar from "../components/SideBar";

const ChatPage = () => {
    return (
        <>
            <Left />
            <SideBar />
            <Switch>
                <Route path="/conversation" component={Blank} exact />
                <Route path="/conversation/:id/:idU" component={Right} />
            </Switch>
        </>
    );
};

export default ChatPage;