import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser} from "../redux/action";
import AuthContext from "../contexts/AuthContext";

const LoginPage = ({history}) => {
    const [credential, setCredential] = useState({
        username: '',
        password: ''
    })
    const {setIsAuthenticated} = useContext(AuthContext)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCredential({...credential, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(credential)).then((response) => {
            if (response.data.token) {
                setIsAuthenticated(true)
                history.replace('/conversation')
            }
        });
    }

    return (
        <>
            <div className="layout">
                <div className="main order-md-1">
                    <div className="start">
                        <div className="container">
                            <div className="col-md-12">
                                <div className="content">
                                    <h1>Sign in to Swipe</h1>
                                    <div className="third-party">
                                        <button className="btn item bg-blue">
                                            <i className="material-icons">pages</i>
                                        </button>
                                        <button className="btn item bg-teal">
                                            <i className="material-icons">party_mode</i>
                                        </button>
                                        <button className="btn item bg-purple">
                                            <i className="material-icons">whatshot</i>
                                        </button>
                                    </div>
                                    <p>or use your email account:</p>
                                    <form>
                                        <div className="form-group">
                                            <input type="email" value={credential.username} onChange={handleChange} name="username" id="inputEmail" className="form-control"
                                                   placeholder="Email Address" required/>
                                            <button className="btn icon"><i
                                                className="material-icons">mail_outline</i></button>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" value={credential.password} onChange={handleChange} name="password" id="inputPassword" className="form-control"
                                                   placeholder="Password" required/>
                                            <button className="btn icon"><i
                                                className="material-icons">lock_outline</i></button>
                                        </div>
                                        <button type="submit" onClick={handleSubmit} className="btn button" formAction="index-2.html">Sign In
                                        </button>
                                        <div className="callout">
                                            <span>Don't have account? <Link to={'/register'}>Create Account</Link></span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="aside order-md-2">
                    <div className="container">
                        <div className="col-md-12">
                            <div className="preference">
                                <h2>Hello, Friend!</h2>
                                <p>Enter your personal details and start your journey with Swipe today.</p>
                                <Link to={'/register'} className="btn button">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
