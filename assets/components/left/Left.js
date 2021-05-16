import React from 'react';

const Left = () => {
    return (
        <>
            <div className="sidebar" id="sidebar">
                <div className="container">
                    <div className="col-md-12">
                        <div className="tab-content">
                            <div id="discussions" className="tab-pane fade active show">
                                <div className="search">
                                    <form className="form-inline position-relative">
                                        <input type="search" className="form-control" id="conversations"
                                               placeholder="Search for conversations..." />
                                            <button type="button" className="btn btn-link loop"><i
                                                className="material-icons">search</i></button>
                                    </form>
                                    <button className="btn create" data-toggle="modal" data-target="#startnewchat"><i
                                        className="material-icons">create</i></button>
                                </div>
                                <div className="list-group sort">
                                    <button className="btn filterDiscussionsBtn active show" data-toggle="list"
                                            data-filter="all">All
                                    </button>
                                    <button className="btn filterDiscussionsBtn" data-toggle="list"
                                            data-filter="read">Read
                                    </button>
                                    <button className="btn filterDiscussionsBtn" data-toggle="list"
                                            data-filter="unread">Unread
                                    </button>
                                </div>
                                <div className="discussions">
                                    <h1>Discussions</h1>
                                    <div className="list-group" id="chats" role="tablist">
                                        <a href="#list-chat" className="filterDiscussions all unread single active"
                                           id="list-chat-list" data-toggle="list" role="tab">
                                            <img className="avatar-md" src="dist/img/avatars/avatar-female-1.jpg"
                                                 data-toggle="tooltip" data-placement="top" title="Janette"
                                                 alt="avatar" />
                                                <div className="status">
                                                    <i className="material-icons online">fiber_manual_record</i>
                                                </div>
                                                <div className="new bg-yellow">
                                                    <span>+7</span>
                                                </div>
                                                <div className="data">
                                                    <h5>Janette Dalton</h5>
                                                    <span>Mon</span>
                                                    <p>A new feature has been updated to your account. Check it
                                                        out...</p>
                                                </div>
                                        </a>
                                        <a href="#list-empty" className="filterDiscussions all unread single"
                                           id="list-empty-list" data-toggle="list" role="tab">
                                            <img className="avatar-md" src="dist/img/avatars/avatar-male-1.jpg"
                                                 data-toggle="tooltip" data-placement="top" title="Michael"
                                                 alt="avatar" />
                                                <div className="status">
                                                    <i className="material-icons offline">fiber_manual_record</i>
                                                </div>
                                                <div className="new bg-pink">
                                                    <span>+10</span>
                                                </div>
                                                <div className="data">
                                                    <h5>Michael Knudsen</h5>
                                                    <span>Sun</span>
                                                    <p>How can i improve my chances of getting a deposit?</p>
                                                </div>
                                        </a>
                                        <a href="#list-chat" className="filterDiscussions all unread single active"
                                           id="list-chat-list" data-toggle="list" role="tab">
                                            <img className="avatar-md" src="dist/img/avatars/avatar-female-1.jpg"
                                                 data-toggle="tooltip" data-placement="top" title="Janette"
                                                 alt="avatar" />
                                            <div className="status">
                                                <i className="material-icons online">fiber_manual_record</i>
                                            </div>
                                            <div className="new bg-yellow">
                                                <span>+7</span>
                                            </div>
                                            <div className="data">
                                                <h5>Janette Dalton</h5>
                                                <span>Mon</span>
                                                <p>A new feature has been updated to your account. Check it
                                                    out...</p>
                                            </div>
                                        </a>
                                        <a href="#list-empty" className="filterDiscussions all unread single"
                                           id="list-empty-list" data-toggle="list" role="tab">
                                            <img className="avatar-md" src="dist/img/avatars/avatar-male-1.jpg"
                                                 data-toggle="tooltip" data-placement="top" title="Michael"
                                                 alt="avatar" />
                                            <div className="status">
                                                <i className="material-icons offline">fiber_manual_record</i>
                                            </div>
                                            <div className="new bg-pink">
                                                <span>+10</span>
                                            </div>
                                            <div className="data">
                                                <h5>Michael Knudsen</h5>
                                                <span>Sun</span>
                                                <p>How can i improve my chances of getting a deposit?</p>
                                            </div>
                                        </a>
                                        <a href="#list-chat" className="filterDiscussions all unread single active"
                                           id="list-chat-list" data-toggle="list" role="tab">
                                            <img className="avatar-md" src="dist/img/avatars/avatar-female-1.jpg"
                                                 data-toggle="tooltip" data-placement="top" title="Janette"
                                                 alt="avatar" />
                                            <div className="status">
                                                <i className="material-icons online">fiber_manual_record</i>
                                            </div>
                                            <div className="new bg-yellow">
                                                <span>+7</span>
                                            </div>
                                            <div className="data">
                                                <h5>Janette Dalton</h5>
                                                <span>Mon</span>
                                                <p>A new feature has been updated to your account. Check it
                                                    out...</p>
                                            </div>
                                        </a>
                                        <a href="#list-empty" className="filterDiscussions all unread single"
                                           id="list-empty-list" data-toggle="list" role="tab">
                                            <img className="avatar-md" src="dist/img/avatars/avatar-male-1.jpg"
                                                 data-toggle="tooltip" data-placement="top" title="Michael"
                                                 alt="avatar" />
                                            <div className="status">
                                                <i className="material-icons offline">fiber_manual_record</i>
                                            </div>
                                            <div className="new bg-pink">
                                                <span>+10</span>
                                            </div>
                                            <div className="data">
                                                <h5>Michael Knudsen</h5>
                                                <span>Sun</span>
                                                <p>How can i improve my chances of getting a deposit?</p>
                                            </div>
                                        </a>
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

export default Left;