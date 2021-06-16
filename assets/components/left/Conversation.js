import React, {useContext, useEffect, useState} from 'react';
import {LOCALHOST} from "../../services/config";
import moment from "moment";
import {NavLink} from "react-router-dom";
import UserContext from "../../contexts/UserContext";

const Conversation = ({conversation}) => {
    const {user} = useContext(UserContext)
    const unreadColor = (unread) => {
        return unread < 5 ? "bg-yellow" : unread < 10 ? "bg-green" : "bg-pink"
    }

    return (
        <>
            <NavLink to={"/conversation/" + conversation.conversationId + "/" + conversation.otherUserId}
                     className={conversation.conv.totalUnread > 0 ?
                         "filterDiscussions all unread single" : "filterDiscussions all read single"}
                     id="list-chat-list" data-toggle="list" role="tab">
                <img className="avatar-md" src={`${LOCALHOST}/assets/dist/img/avatars/${conversation.avatar}`}
                     data-toggle="tooltip" data-placement="top" title={conversation.firstName}
                     alt="avatar"/>
                <div className="status">
                    <i className="material-icons online">fiber_manual_record</i>
                </div>
                {
                    conversation.conv.totalUnread > 0 && parseInt(conversation.conv.lastMessage.users.id) !== parseInt(user.id) &&
                    <div className={`new ${unreadColor(conversation.conv.totalUnread)}`}>
                        <span>+{conversation.conv.totalUnread}</span>
                    </div>
                }
                <div className="data">
                    <h5>{conversation.firstName + ' ' + conversation.lastName}</h5>
                    <span>{moment(conversation.createdAt).format('LT')}</span>
                    <p>{conversation.content}</p>
                </div>
            </NavLink>
        </>
    );
};

export default Conversation;