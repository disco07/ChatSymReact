import React, {useContext, useState} from 'react';
import {addConversation, fetchUsers, postConversations, postMessages} from "../../redux/action";
import {LOCALHOST} from "../../services/config";
import {useDispatch} from "react-redux";
import SocketContext from "../../contexts/SocketContext";

const NewChat = () => {
    const [search, setSearch] = useState('')
    const [content, setContent] = useState('')
    const [display, setDisplay] = useState(false)
    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [error, setError] = useState('');
    const dispatch = useDispatch()
    const {socket} = useContext(SocketContext)

    const handleChange = (e) => {
        setSearch(e.target.value)
        if (e.target.value.length > 0) {
            fetchUsers(e.target.value).then(response => {
                setUsers(response)
                users.length > 0 ? setDisplay(true) : setDisplay(false)
            });
        } else {
            setUsers([])
            setDisplay(false)
        }
    }

    const handleChangeText = (e) => {
        setContent(e.target.value)
    }
    const selectUser = (idUser) => {
        const user = users.filter(user => parseInt(user.id) === parseInt(idUser))
        setDisplay(false)
        postConversations(idUser, window.localStorage.getItem('authToken'))
            .then(response => {
                if (response['@type'] === "hydra:Error") {
                    return setError(response['hydra:description'])
                }else {
                    setError('')
                    setUserSelected(user)
                    return setConversations(response)
                }
            })
    }
    const handleSendMessage = (e) => {
        e.preventDefault();
        dispatch(postMessages(conversations?.id, content, true, localStorage.getItem('authToken')))
            .then(response => {
                console.log(response)
                socket.emit('sendMessage', {
                    "conversationId": conversations?.id,
                    "content": response.content,
                    "createdAt": response.createdAt,
                    "id": response.id,
                    "users": response.users.id,
                    "totalUnread": 1,
                }, userSelected[0].id)
                dispatch(addConversation({
                    conv: conversations,
                    id: userSelected[0].id,
                    firstName: userSelected[0].firstName,
                    lastName: userSelected[0].lastName,
                    avatar: userSelected[0].avatar,
                    content: response.content,
                    createdAt: response.createdAt,
                    conversationId: conversations?.id,
                }))
            })
        setContent('')
    }

    return (
        <>
            <div className="modal fade" id="startnewchat" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="requests">
                        <div className="title">
                            <h1>Start new chat</h1>
                            <button type="button" className="btn" data-dismiss="modal" aria-label="Close"><i
                                className="material-icons">close</i></button>
                        </div>
                        <div className="content">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="topic">User:</label>
                                    <input type="text" value={search}
                                           onChange={handleChange}
                                           className="form-control"
                                           id="topic"
                                           placeholder="What's the user"
                                           autoComplete="off"/>
                                    {
                                        display &&
                                        <div className="autoContainer">
                                            {
                                                users.map(user => {
                                                    return (
                                                        <div className="option"
                                                             key={user.id}
                                                             onClick={() => selectUser(user.id)}
                                                             tabIndex="0">
                                                            <img className="avatar-sm"
                                                                 src={`${LOCALHOST}/assets/dist/img/avatars/${user.avatar}`}
                                                                 alt="avatar"/>
                                                            <h5>{user.firstName} {user.lastName}</h5>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="participant">Recipient:</label>
                                    <input type="text" className={"form-control" + (error && " is-invalid")} id="participant"
                                           placeholder="Add recipient..."/>
                                    {
                                        userSelected.length > 0 &&
                                        <div className="user" id="recipient">
                                            <img className="avatar-sm"
                                                 src={`${LOCALHOST}/assets/dist/img/avatars/${userSelected[0].avatar}`}
                                                 alt="avatar"/>
                                            <h5>{userSelected[0].firstName} {userSelected[0].lastName}</h5>
                                            <button className="btn" onClick={() => setUserSelected([])}><i
                                                className="material-icons">close</i></button>
                                        </div>
                                    }
                                    {error && <p className="invalid-feedback">{error}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message:</label>
                                    <textarea className="text-control"
                                              value={content}
                                              onChange={handleChangeText}
                                              id="message"
                                              placeholder="Send your welcome message...">Hmm, are you friendly?</textarea>
                                </div>
                                {
                                    <button type="submit"
                                         className={"btn button w-100" + ((error && content === '') && " disabled")}
                                         onClick={handleSendMessage}>Start New Chat
                                    </button>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewChat;
