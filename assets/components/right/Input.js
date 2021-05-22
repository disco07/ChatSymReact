import React from 'react';

const Input = () => {
    return (
        <>
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
        </>
    );
};

export default Input;