import React, {useState} from 'react';
import {fetchUsers, postConversations} from "../../redux/action";
import {LOCALHOST} from "../../services/config";

const NewChat = () => {
    const [search, setSearch] = useState('')
    const [content, setContent] = useState('')
    const [display, setDisplay] = useState(false)
    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value)
        if (e.target.value.length > 1) {
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
        setUserSelected(user)
        postConversations(idUser, window.localStorage.getItem('authToken'))
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
                                    <input type="text" className="form-control" id="participant"
                                           placeholder="Add recipient..."/>
                                    {
                                        userSelected.length > 0 &&
                                        <div className="user" id="recipient">
                                            <img className="avatar-sm" src={`${LOCALHOST}/assets/dist/img/avatars/${userSelected[0].avatar}`}
                                                 alt="avatar"/>
                                            <h5>{userSelected[0].firstName} {userSelected[0].lastName}</h5>
                                            <button className="btn" onClick={() => setUserSelected([])}><i className="material-icons">close</i></button>
                                        </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message:</label>
                                    <textarea className="text-control" value={content} onChange={handleChangeText}
                                              id="message"
                                              placeholder="Send your welcome message...">Hmm, are you friendly?</textarea>
                                </div>
                                <button type="submit" className="btn button w-100">Start New Chat</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewChat;
