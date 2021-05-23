import React, {useState} from 'react';
import {useDispatch} from "react-redux";

const Input = () => {
    const [content, setContent] = useState('')
    const dispatch = useDispatch()

    const handleChange = ({target}) => {
        setContent(target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

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
                                      rows="1" />
                            <button className="btn emoticons"><i
                                className="material-icons">insert_emoticon</i></button>
                            <button type="submit" onClick={handleSubmit} className="btn send"><i
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