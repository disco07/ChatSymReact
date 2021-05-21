import React, {useEffect} from 'react';
import {LOCALHOST} from "../config";
import {useDispatch, useSelector} from "react-redux";
import {fetchMessage} from "../../redux/action";

const Right = ({conversationId, otherUser}) => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.conversations)

    useEffect(() => {
        dispatch(fetchMessage(conversationId ,localStorage.getItem('authToken')))
    }, []);

    return (
        <>
            <div className="main">
                <div className="tab-content" id="nav-tabContent">
                    <div className="babble tab-pane fade active show" id="list-chat" role="tabpanel"
                         aria-labelledby="list-chat-list">
                        <div className="chat" id="chat1">
                            <div className="top">
                                <div className="container">
                                    <div className="col-md-12">
                                        <div className="inside">
                                            <a href="#"><img className="avatar-md"
                                                             src={`${LOCALHOST}assets/dist/img/avatars/avatar-female-5.jpg`}
                                                             data-toggle="tooltip" data-placement="top" title="Keith"
                                                             alt="avatar" /></a>
                                            <div className="status">
                                                <i className="material-icons online">fiber_manual_record</i>
                                            </div>
                                            <div className="data">
                                                <h5><a href="#">Keith Morris</a></h5>
                                                <span>Active now</span>
                                            </div>
                                            <button className="btn connect d-md-block d-none" name="1"><i
                                                className="material-icons md-30">phone_in_talk</i></button>
                                            <button className="btn connect d-md-block d-none" name="1"><i
                                                className="material-icons md-36">videocam</i></button>
                                            <button className="btn d-md-block d-none"><i
                                                className="material-icons md-30">info</i></button>
                                            <div className="dropdown">
                                                <button className="btn" data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false"><i
                                                    className="material-icons md-30">more_vert</i></button>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <button className="dropdown-item connect" name="1"><i
                                                        className="material-icons">phone_in_talk</i>Voice Call
                                                    </button>
                                                    <button className="dropdown-item connect" name="1"><i
                                                        className="material-icons">videocam</i>Video Call
                                                    </button>
                                                    <hr/>
                                                        <button className="dropdown-item"><i
                                                            className="material-icons">clear</i>Clear History
                                                        </button>
                                                        <button className="dropdown-item"><i
                                                            className="material-icons">block</i>Block Contact
                                                        </button>
                                                        <button className="dropdown-item"><i
                                                            className="material-icons">delete</i>Delete Contact
                                                        </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content" id="content">
                                <div className="container">
                                    <div className="col-md-12">
                                        <div className="date">
                                            <hr/>
                                                <span>Yesterday</span>
                                                <hr/>
                                        </div>
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
                                        <div className="date">
                                            <hr/>
                                                <span>Today</span>
                                                <hr/>
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
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="col-md-12">
                                    <div className="bottom">
                                        <form className="position-relative w-100">
                                            <textarea className="form-control" placeholder="Start typing for reply..."
                                                      rows="1" />
                                            <button className="btn emoticons"><i
                                                className="material-icons">insert_emoticon</i></button>
                                            <button type="submit" className="btn send"><i
                                                className="material-icons">send</i></button>
                                        </form>
                                        <label>
                                            <input type="file" />
                                                <span className="btn attach d-sm-block d-none"><i
                                                    className="material-icons">attach_file</i></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="call" id="call1">
                            <div className="content">
                                <div className="container">
                                    <div className="col-md-12">
                                        <div className="inside">
                                            <div className="panel">
                                                <div className="participant">
                                                    <img className="avatar-xxl"
                                                         src={`${LOCALHOST}+assets/dist/img/avatars/avatar-female-5.jpg`} alt="avatar" />
                                                        <span>Connecting</span>
                                                </div>
                                                <div className="options">
                                                    <button className="btn option"><i
                                                        className="material-icons md-30">mic</i></button>
                                                    <button className="btn option"><i
                                                        className="material-icons md-30">videocam</i></button>
                                                    <button className="btn option call-end"><i
                                                        className="material-icons md-30">call_end</i></button>
                                                    <button className="btn option"><i
                                                        className="material-icons md-30">person_add</i></button>
                                                    <button className="btn option"><i
                                                        className="material-icons md-30">volume_up</i></button>
                                                </div>
                                                <button className="btn back" name="1"><i
                                                    className="material-icons md-24">chat</i></button>
                                            </div>
                                        </div>
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

export default Right;