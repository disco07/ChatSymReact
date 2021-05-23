import React from 'react';
import {LOCALHOST} from "../config";
import moment from "moment";

const Messages = ({message, user}) => {

    return (
        <>
            {
                <div className={parseInt(message.users.id) === parseInt(user) ? `message me` : `message`}>
                    <img className="avatar-md" src={`${LOCALHOST}/assets/dist/img/avatars/${message.users.avatar}`}
                         data-toggle="tooltip" data-placement="top" title={message.users.firstName} alt="avatar"/>
                    <div className="text-main">
                        <div className="text-group">
                            <div className={parseInt(message.users.id) === parseInt(user) ? `text me` : `text`}>
                                <p>{message.content}</p>
                            </div>
                        </div>
                        <span>{moment(message.createdAt).format('LT')}</span>
                    </div>
                </div>
            }
            {/*<div className={parseInt(message.users.id) === parseInt(user) ? `message me` : `message`}>*/}
            {/*    <img className="avatar-md" src={`${LOCALHOST}/assets/dist/img/avatars/${message.users.avatar}`}*/}
            {/*         data-toggle="tooltip" data-placement="top" title={message.users.firstName} alt="avatar" />*/}
            {/*    <div className="text-main">*/}
            {/*        <div className="text-group">*/}
            {/*            <div className={parseInt(message.users.id) === parseInt(user) ? `text me` : `text`}>*/}
            {/*                <div className="attachment">*/}
            {/*                    <button className="btn attach"><i*/}
            {/*                        className="material-icons md-18">insert_drive_file</i>*/}
            {/*                    </button>*/}
            {/*                    <div className="file">*/}
            {/*                        <h5><a href="#">Tenacy Agreement.pdf</a></h5>*/}
            {/*                        <span>24kb Document</span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <span>{moment(message.createdAt).format('LT')}</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default Messages;