import React, {useContext, useState} from 'react';
import {useDispatch} from "react-redux";
import {postMessages} from "../../redux/action";
import SocketContext from "../../contexts/SocketContext";

const Input = ({conversationId, otherUser}) => {
    const [content, setContent] = useState('')
    const dispatch = useDispatch()
    const {socket} = useContext(SocketContext)

    const handleChange = ({target}) => {
        setContent(target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postMessages(conversationId, content, localStorage.getItem('authToken')))
            .then(response => {
                socket.emit('sendMessage', {
                    "conversationId": response.conversationId,
                    "content": response.message.content,
                    "createdAt": response.message.createdAt,
                    "id": response.message.id,
                    "images": response.message.images,
                    "user": response.message.user.id,
                    "totalUnread": 1,
                }, otherUser)

            })
        setContent('')
    }
    return (
        <>
            <div className="container">
                <div className="col-md-12">
                    <div className="bottom">
                        <form className="position-relative w-100">
                            <textarea className="form-control" value={content} onChange={handleChange}
                                      placeholder="Start typing for reply..."
                                      name="content"
                                      rows="1"/>
                            <button className="btn emoticons"><i
                                className="material-icons">insert_emoticon</i></button>
                            <button type="submit" onClick={handleSubmit} className="btn send"><i
                                className="material-icons">send</i></button>
                        </form>
                        <label>
                            <input type="file"/>
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