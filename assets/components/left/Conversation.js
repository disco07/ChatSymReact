import React, {useEffect, useState} from 'react';
import {LOCALHOST} from "../../services/config";
import moment from "moment";
import {NavLink} from "react-router-dom";

const Conversation = ({conversation, totalUnread, conversationId}) => {
    const [unread, setUnread] = useState(conversation.conv.totalUnread)
    const unreadColor = (unread) => {
        return unread < 5 ? "bg-yellow" : unread < 10 ? "bg-green" : "bg-pink"
    }
    useEffect(() => {
        if (parseInt(totalUnread) > 0) {
            setUnread(totalUnread);
        }
    }, [totalUnread]);

    return (
        <>
            <NavLink to={"/conversation/" + conversation.conversationId + "/" + conversation.id} className={unread > 0 ?
                "filterDiscussions all unread single" : "filterDiscussions all read single"}
               id="list-chat-list" data-toggle="list" role="tab">
                <img className="avatar-md" src={`${LOCALHOST}/assets/dist/img/avatars/${conversation.avatar}`}
                     data-toggle="tooltip" data-placement="top" title={conversation.firstName}
                     alt="avatar" />
                <div className="status">
                    <i className="material-icons online">fiber_manual_record</i>
                </div>
                {
                    conversation.conv.totalUnread > 0 &&
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