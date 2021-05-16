import React from 'react';
import Left from "../components/left/Left";
import {Route, Switch} from "react-router-dom";
import Blank from "../components/right/Blank";
import Right from "../components/right/Right";
import SideBar from "../components/SideBar";

const ChatPage = () => {
    return (
        <div className="layout">
            <SideBar />
            <Left />
            <Switch>
                <Route path={"/conversation"} component={Blank} />
                <Route path={"/conversation/:id/:idU"} component={Right} />
            </Switch>
        </div>
    );
};

export default ChatPage;