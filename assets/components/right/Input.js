import React, {useContext, useState} from 'react';
import {useDispatch} from "react-redux";
import {postImages, postMessages} from "../../redux/action";
import SocketContext from "../../contexts/SocketContext";

const Input = ({conversationId, otherUser}) => {
    const [content, setContent] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const dispatch = useDispatch()
    const {socket} = useContext(SocketContext)

    const handleChange = ({target}) => {
        setContent(target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postMessages(conversationId, content, false, localStorage.getItem('authToken')))
            .then(response => {
                socket.emit('sendMessage', {
                    "conversationId": conversationId,
                    "avatar": response.users.avatar,
                    "content": response.content,
                    "createdAt": response.createdAt,
                    "id": response.id,
                    "images": response.images,
                    "users": response.users,
                }, otherUser)
            })
        setContent('')
    }
    let lastUpdateTime
    const sendTyping = () => {
        lastUpdateTime = Date.now()
        if (!isTyping) {
            setIsTyping(true)
            startCheckingTyping()
        }
    }

    let typingInterval
    const startCheckingTyping = () => {
        socket.emit('startTyping', otherUser, conversationId)
        typingInterval = setInterval(() => {
            if ((Date.now() - lastUpdateTime) > 2000) {
                setIsTyping(false)
                stopCheckingTyping()
            }
        }, 2000)
    }

    const stopCheckingTyping = () => {
        socket.emit('stopTyping', otherUser, conversationId)
        if (typingInterval) {
            clearInterval(typingInterval)
        }
    }
    return (
        <>
            <div className="container">
                <div className="col-md-12">
                    <div className="bottom">
                        <form className="position-relative w-100">
                            <textarea className="form-control" value={content}
                                      onChange={handleChange}
                                      onKeyDown={e => {
                                          e.keyCode !== 13 ? sendTyping() : handleSubmit(e)
                                      }}
                                      placeholder="Start typing for reply..."
                                      name="content"
                                      rows="1"/>
                            <button className="btn emoticons"><i
                                className="material-icons">insert_emoticon</i></button>
                            <button type="submit" onClick={handleSubmit} className="btn send"><i
                                className="material-icons">send</i></button>
                        </form>
                        <label>
                            <input type="file" onChange={e => {
                                dispatch(postImages(e.target.files[0])).then(response => {
                                    dispatch(postMessages(conversationId, content, false, localStorage.getItem('authToken'), [response]))
                                        .then(response => {
                                            socket.emit('sendMessage', {
                                                "conversationId": conversationId,
                                                "content": response.content,
                                                "createdAt": response.createdAt,
                                                "id": response.id,
                                                "images": response.images,
                                                "user": response.user,
                                            }, otherUser)
                                        })
                                })
                            }}/>
                            <span className="btn attach d-sm-block d-none"><i
                                className="material-icons">attach_file</i></span>
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Input;