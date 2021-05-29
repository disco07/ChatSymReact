import React, {useContext, useEffect, useState} from 'react';
import Conversation from "./Conversation";
import moment from "moment";
import SocketContext from "../../contexts/SocketContext";
import {setLastMessage} from "../../redux/action";

const Left = ({conversations}) => {
    const [unread, setUnread] = useState(0)
    const [conversationId, setConversationId] = useState(0)
    const {socket} = useContext(SocketContext)

    useEffect(() => {
        socket.on('newMessage', response => {
            console.log(response)
            setLastMessage(response.conversationId, response);
            setUnread(response.totalUnread);
            setConversationId(response.conversationId);
        });
    }, [conversationId]);

    return (
        <>
            <div className="sidebar" id="sidebar">
                <div className="container">
                    <div className="col-md-12">
                        <div className="tab-content">
                            <div id="discussions" className="tab-pane fade active show">
                                <div className="search">
                                    <form className="form-inline position-relative">
                                        <input type="search" className="form-control" id="conversations"
                                               placeholder="Search for conversations..." />
                                            <button type="button" className="btn btn-link loop"><i
                                                className="material-icons">search</i></button>
                                    </form>
                                    <button className="btn create" data-toggle="modal" data-target="#startnewchat"><i
                                        className="material-icons">create</i></button>
                                </div>
                                <div className="list-group sort">
                                    <button className="btn filterDiscussionsBtn active show" data-toggle="list"
                                            data-filter="all">All
                                    </button>
                                    <button className="btn filterDiscussionsBtn" data-toggle="list"
                                            data-filter="read">Read
                                    </button>
                                    <button className="btn filterDiscussionsBtn" data-toggle="list"
                                            data-filter="unread">Unread
                                    </button>
                                </div>
                                <div className="discussions">
                                    <h1>Discussions</h1>
                                    <div className="list-group" id="chats" role="tablist">
                                        {
                                            conversations.items
                                                .sort((a, b) => moment(a.createdAt).format('MMMM Do YYYY, h:mm:ss a') <
                                                    moment(b.createdAt).format('MMMM Do YYYY, h:mm:ss a'))
                                                .map((conversation, index) => {
                                                return <Conversation key={index} totalUnread={unread} conversationId={conversationId} conversation={conversation}/>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Left;