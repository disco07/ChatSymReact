import React from 'react';
import {LOCALHOST} from "../../services/config";
import moment from "moment";

const Messages = ({data, isMine, viewDate, showTimestamp}) => {

    const friendlyTimestamp = moment(data.createdAt).calendar(null,{
        lastDay : '[Yesterday]',
        sameDay : '[Today]',
        nextDay : '[Tomorrow]',
        lastWeek : '[last] dddd',
        nextWeek : 'dddd',
        sameElse : 'L'
    });
    return (
        <>
            {
                showTimestamp &&
                <div className="date">
                    <hr/>
                    <span>{friendlyTimestamp}</span>
                    <hr/>
                </div>
            }
            {
                <div className={isMine ? `message me` : `message`} style={{marginBottom: 0}}>
                    {isMine === false && <img className="avatar-md" src={`${LOCALHOST}/assets/dist/img/avatars/${data.users.avatar}`}
                          data-toggle="tooltip" data-placement="top" title={data.users.firstName} alt="avatar"/>}
                    <div className="text-main">
                        <div className="text-group">
                            <div className={isMine ? `text me` : `text`}>
                                <p>{data.content}</p>
                            </div>
                        </div>
                        {viewDate && <span>{moment(data.createdAt).format('LT')}</span>}
                    </div>
                </div>
            }
            {/*<div className={isMine ? `message me` : `message`}>*/}
            {/*    <img className="avatar-md" src={`${LOCALHOST}/assets/dist/img/avatars/${data.users.avatar}`}*/}
            {/*         data-toggle="tooltip" data-placement="top" title={data.users.firstName} alt="avatar" />*/}
            {/*    <div className="text-main">*/}
            {/*        <div className="text-group">*/}
            {/*            <div className={isMine ? `text me` : `text`}>*/}
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
            {/*        <span>{moment(data.createdAt).format('LT')}</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default Messages;