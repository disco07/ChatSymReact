import React from 'react';

const Blank = () => {
    return (
        <>
            <div className="main">
                <div className="tab-content" id="nav-tabContent">
                    <div className="babble tab-pane fade active show" id="list-empty" role="tabpanel"
                         aria-labelledby="list-empty-list">
                        <div className="chat" id="chat2">
                            <div className="top">
                            </div>
                            <div className="content empty">
                                <div className="container">
                                    <div className="col-md-12">
                                        <div className="no-messages">
                                            <i className="material-icons md-48">forum</i>
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

export default Blank;