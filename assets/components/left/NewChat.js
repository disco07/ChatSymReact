import React, {useEffect, useState} from 'react';
import {fetchUsers} from "../../redux/action";

const NewChat = () => {
    const [search, setSearch] = useState('')
    const [content, setContent] = useState('')
    const [display, setDisplay] = useState(false)
    const [users, setUsers] = useState([]);
    const [suggestion, setSuggestion] = useState([])

    useEffect(() => {
        fetchUsers().then(response => setUsers(response));
    }, [])
    const handleChange = (e) => {
        setSearch(e.target.value)
        let matches = []
        if (search.length > 0) {
            matches = users.filter(user => {
                const regex = new RegExp(`${search}`, 'gi')
                return user.firstName.match(regex)
            })
        }
        console.log(matches)
    }

    const handleChangeText = (e) => {
        setContent(e.target.value)
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
                                    <input type="text" value={search} onChange={handleChange} className="form-control" id="topic"
                                           placeholder="What's the user"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="participant">Recipient:</label>
                                    <input type="text" className="form-control" id="participant"
                                           placeholder="Add recipient..." required />
                                        <div className="user" id="recipient">
                                            <img className="avatar-sm" src="dist/img/avatars/avatar-female-5.jpg"
                                                 alt="avatar" />
                                                <h5>Keith Morris</h5>
                                                <button className="btn"><i className="material-icons">close</i></button>
                                        </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message:</label>
                                    <textarea className="text-control" value={content} onChange={handleChangeText} id="message"
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
