import React from 'react';
import {LOCALHOST} from "../../services/config";
import moment from "moment";

const Messages = ({data, isMine, viewDate, showTimestamp, checkRead}) => {

    const friendlyTimestamp = moment(data.createdAt).calendar(null,{
        lastDay : '[Yesterday]',
        sameDay : '[Today]',
        nextDay : '[Tomorrow]',
        lastWeek : '[last] dddd',
        nextWeek : 'dddd',
        sameElse : 'L'
    });
    const extImage = ['jpg', 'GIF', 'PNG', 'JPEG'];
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
                <div className={isMine ? `message me` : `message`} style={{marginBottom: !viewDate && 0}}>
                    {isMine === false && <img className="avatar-md" src={`${LOCALHOST}/assets/dist/img/avatars/${data.users.avatar}`}
                          data-toggle="tooltip" data-placement="top" title={data.users.firstName} alt="avatar"/>}
                    <div className="text-main">
                        <div className="text-group">
                            <div className={isMine ? `text me` : `text`}>
                                {
                                    data.images?.map(image => {
                                        const extension = image.filename.split('.').pop();
                                        return extImage.includes(extension) ?
                                            <img src={`${LOCALHOST}/assets/dist/img/avatars/${image.filename}`}
                                                 alt="" width="300"/> :
                                            (
                                                <div className="attachment">
                                                    <button className="btn attach"><i
                                                        className="material-icons md-18">insert_drive_file</i>
                                                    </button>
                                                    <div className="file">
                                                        <h5><a href={`${LOCALHOST}/assets/dist/img/avatars/${image.filename}`}>{image.filename}</a></h5>
                                                    </div>
                                                </div>
                                            )
                                    })
                                }
                                <p>{data.content}</p>
                            </div>
                        </div>
                        {viewDate && <span>{checkRead && <i className="material-icons">check</i>}{moment(data.createdAt).format('LT')}</span>}
                    </div>
                </div>
            }
        </>
    );
};

export default Messages;