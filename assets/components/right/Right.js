import React, {useEffect} from 'react';
import {LOCALHOST} from "../config";
import {useDispatch, useSelector} from "react-redux";
import {fetchMessage} from "../../redux/action";
import Input from "./Input";
import Messages from "./Messages";

const Right = ({conversationId, otherUser}) => {
    const dispatch = useDispatch()
    const messages = useSelector(state => state.conversations)
    const conversationIndex = messages.items.findIndex(conversation => parseInt(conversation.conversationId) === parseInt(conversationId))

    useEffect(() => {
        dispatch(fetchMessage(conversationId ,localStorage.getItem('authToken')))
    }, [conversationId]);

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
                                            <a href="#">
                                                {
                                                    conversationIndex !== -1 &&
                                                    <img className="avatar-md"
                                                         src={`${LOCALHOST}/assets/dist/img/avatars/${messages.items[conversationIndex].avatar}`}
                                                         data-toggle="tooltip" data-placement="top" title={messages.items[conversationIndex].firstName}
                                                         alt="avatar" />
                                                }
                                            </a>
                                            <div className="status">
                                                <i className="material-icons online">fiber_manual_record</i>
                                            </div>
                                            <div className="data">
                                                {
                                                    conversationIndex !== -1 &&
                                                    <h5><a href="#">{messages.items[conversationIndex].firstName +" "+ messages.items[conversationIndex].lastName}</a></h5>
                                                }
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
                                        <Messages/>
                                    </div>
                                </div>
                            </div>
                            <Input otherUser={otherUser} />
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