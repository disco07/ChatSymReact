import React, {useContext, useEffect, useRef, useState} from 'react';
import {LOCALHOST} from "../../services/config";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, fetchMessage} from "../../redux/action";
import Input from "./Input";
import Messages from "./Messages";
import SocketContext from "../../contexts/SocketContext";

const Right = ({conversationId, user, otherUser}) => {
    const dispatch = useDispatch()
    const conversation = useSelector(state => state.conversations)
    const [isTyping, setIsTyping] = useState({
        isTyping: false,
        idConversation: ''
    })
    const conversationIndex = conversation.items.findIndex(conversation => parseInt(conversation.conversationId) === parseInt(conversationId))
    const {socket} = useContext(SocketContext)
    const ref = useRef(null)

    useEffect(() => {
        if (ref) {
            ref.current.addEventListener('DOMNodeInserted', event => {
                const {currentTarget: target} = event;
                target.scroll({top: target.scrollHeight, behavior: 'smooth'});
            });
        }
    }, [])

    useEffect(() => {
        socket.on('newMessage', response => {
            addMessage(conversationId, response)
        });
    }, [conversationId])

    useEffect(() => {
        socket.on('userStartTyping', (data, idConv) => setIsTyping({isTyping: data, idConversation: idConv}))
        socket.on('userStopTyping', (data, idConv) => setIsTyping({isTyping: data, idConversation: idConv}))

    }, []);

    useEffect(() => {
        conversation.items.length !== 0 && dispatch(fetchMessage(conversationId, localStorage.getItem('authToken')))
    }, [conversationId, conversation.items.length]);

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
                                                         src={`${LOCALHOST}/assets/dist/img/avatars/${conversation.items[conversationIndex].avatar}`}
                                                         data-toggle="tooltip" data-placement="top"
                                                         title={conversation.items[conversationIndex].firstName}
                                                         alt="avatar"/>
                                                }
                                            </a>
                                            <div className="status">
                                                <i className="material-icons online">fiber_manual_record</i>
                                            </div>
                                            <div className="data">
                                                {
                                                    conversationIndex !== -1 &&
                                                    <h5><a
                                                        href="#">{conversation.items[conversationIndex].firstName + " " + conversation.items[conversationIndex].lastName}</a>
                                                    </h5>
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
                            <div className="content" id="content" ref={ref}>
                                <div className="container">
                                    <div className="col-md-12">
                                        {
                                            conversationIndex !== -1 &&
                                            conversation.items[conversationIndex].messages?.map((message, index) => {
                                                return (
                                                    <>
                                                        {/*<div className="date">*/}
                                                        {/*    <hr/>*/}
                                                        {/*    <span>Yesterday</span>*/}
                                                        {/*    <hr/>*/}
                                                        {/*</div>*/}
                                                        <Messages key={index} message={message} user={user.id}/>
                                                    </>
                                                )
                                            })
                                        }
                                        {
                                            conversationIndex !== -1 &&
                                            isTyping.isTyping && isTyping.idConversation === conversationId &&
                                            <div className="message">
                                                <img className="avatar-md"
                                                     src={`${LOCALHOST}/assets/dist/img/avatars/${conversation.items[conversationIndex].avatar}`}
                                                     data-toggle="tooltip" data-placement="top"
                                                     title={conversation.items[conversationIndex].firstName}
                                                     alt="avatar"/>
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
                                        }
                                    </div>
                                </div>
                            </div>
                            <Input conversationId={conversationId} otherUser={otherUser}/>
                        </div>

                        <div className="call" id="call1">
                            <div className="content">
                                <div className="container">
                                    <div className="col-md-12">
                                        <div className="inside">
                                            <div className="panel">
                                                <div className="participant">
                                                    <img className="avatar-xxl"
                                                         src={`${LOCALHOST}+assets/dist/img/avatars/avatar-female-5.jpg`}
                                                         alt="avatar"/>
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