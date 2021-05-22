import React from 'react';
import {LOCALHOST} from "../config";

const Messages = ({messages}) => {
    return (
        <>
            <div className="message">
                <img className="avatar-md" src={`${LOCALHOST}+assets/dist/img/avatars/avatar-female-5.jpg`}
                     data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                <div className="text-main">
                    <div className="text-group">
                        <div className="text">
                            <p>We've got some killer ideas kicking about already.</p>
                        </div>
                    </div>
                    <span>09:46 AM</span>
                </div>
            </div>
            <div className="message me">
                <div className="text-main">
                    <div className="text-group me">
                        <div className="text me">
                            <p>Can't wait! How are we coming along with the client?</p>
                        </div>
                    </div>
                    <span>11:32 AM</span>
                </div>
            </div>
            <div className="message">
                <img className="avatar-md" src={`${LOCALHOST}+assets/dist/img/avatars/avatar-female-5.jpg`}
                     data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                <div className="text-main">
                    <div className="text-group">
                        <div className="text">
                            <p>Coming along nicely, we've got a draft for the client
                                quarries completed.</p>
                        </div>
                    </div>
                    <span>02:56 PM</span>
                </div>
            </div>
            <div className="message me">
                <div className="text-main">
                    <div className="text-group me">
                        <div className="text me">
                            <p>Roger that boss!</p>
                        </div>
                    </div>
                    <div className="text-group me">
                        <div className="text me">
                            <p>I have already started gathering some stuff for the mood
                                boards, excited to start!</p>
                        </div>
                    </div>
                    <span>10:21 PM</span>
                </div>
            </div>
            <div className="message">
                <img className="avatar-md" src={`${LOCALHOST}+assets/dist/img/avatars/avatar-female-5.jpg`}
                     data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                <div className="text-main">
                    <div className="text-group">
                        <div className="text">
                            <p>Great start guys, I've added some notes to the task. We
                                may need to make some adjustments to the last couple of
                                items - but no biggie!</p>
                        </div>
                    </div>
                    <span>11:07 PM</span>
                </div>
            </div>
            <div className="message me">
                <div className="text-main">
                    <div className="text-group me">
                        <div className="text me">
                            <p>Well done all. See you all at 2 for the kick-off meeting.</p>
                        </div>
                    </div>
                    <span>10:21 PM</span>
                </div>
            </div>
            <div className="message">
                <img className="avatar-md" src={`${LOCALHOST}+assets/dist/img/avatars/avatar-female-5.jpg`}
                     data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                <div className="text-main">
                    <div className="text-group">
                        <div className="text">
                            <div className="attachment">
                                <button className="btn attach"><i
                                    className="material-icons md-18">insert_drive_file</i>
                                </button>
                                <div className="file">
                                    <h5><a href="#">Tenacy Agreement.pdf</a></h5>
                                    <span>24kb Document</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span>11:07 PM</span>
                </div>
            </div>
            <div className="message me">
                <div className="text-main">
                    <div className="text-group me">
                        <div className="text me">
                            <p>Hope you're all ready to tackle this great project. Let's
                                smash some Brand Concept & Design!</p>
                        </div>
                    </div>
                    <span><i className="material-icons">check</i>10:21 PM</span>
                </div>
            </div>
            <div className="message">
                <img className="avatar-md" src={`${LOCALHOST}+assets/dist/img/avatars/avatar-female-5.jpg`}
                     data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                <div className="text-main">
                    <div className="text-group">
                        <div className="text typing">
                            <div className="wave">
                                <span className="dot"/>
                                <span className="dot"/>
                                <span className="dot"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messages;