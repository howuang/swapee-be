import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { authActions } from '../../redux/actions/auth.actions';
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";


const Modal = ({ showModal, setShowModal }) => {
    const dispatch = useDispatch();
    const [dataForm, setDataForm] = useState({
        email: "",
        password: ""
    });
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(authActions.loginRequest(dataForm.email, dataForm.password));
    };

    const responseGoogle = (response) => {
        console.log(response);
        dispatch(authActions.loginGoogleRequest(response.tokenId))
    };
  
    const responseFacebook = (response) => {
    
        console.log(response);
        dispatch(authActions.loginFacebookRequest(response.id, response.accessToken))
    };

    if (isAuthenticated) return <Navigate to="/" />;
    
    return (
        <>
            {showModal ?
                <div className="modal-background">
                    <div className="modal-wrapper" showModal={showModal}>
                        <form className='form' onSubmit={handleLogin}>
                            <button onClick={() => setShowModal(prev => !prev)}>
                                <i className="fas fa-times" />
                            </button>
                            <h1>
                                Start declutter today! Create your account by filling out the information below.
                            </h1>
                            <div className='login-btns'>
                                <GoogleLogin
                                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                                    buttonText="Continue With Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    className='login-btn'
                                />
                                <FacebookLogin
                                    appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    cssClass="login-btn"
                                    icon="fa-facebook"

                                />
                            </div>
                            <span className='form-input-login'>
                                or
                            </span>
                            
                            <div className='form-inputs'>
                                <label htmlFor="email" className='form-label'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    className='form-input'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-inputs'>
                                <label htmlFor="password" className='form-label'>
                                    Password
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    className='form-input'
                                    onChange={handleChange}
                                />
                            </div>
                            <button className='form-input-btn' type='submit'>
                                Log In
                            </button>
                        </form>
                    </div>
                </div>
                : null}
        </>
    )
};

const FormSignup = () => {
    const dispatch = useDispatch();


    const [dataForm, setDataForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(prev => !prev);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authActions.register(dataForm.name, dataForm.email, dataForm.password));
    };

    console.log("dataForm", dataForm)

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    

    const responseGoogle = (response) => {
        console.log(response);
        dispatch(authActions.loginGoogleRequest(response.tokenId))
    };
  
    const responseFacebook = (response) => {
    
        console.log(response);
        dispatch(authActions.loginFacebookRequest(response.id, response.accessToken))
    };

    if (isAuthenticated) return <Navigate to="/" />;
    

    
    return (
        <div className='form-content-right'>
            <form className='form' onSubmit={handleSubmit}>
                <h1>
                    Start declutter today! Create your account by filling out the information below.
                </h1>
                <div className='login-btns'>
                    <GoogleLogin
                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                        buttonText="Continue With Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className='login-btn'
                    />
                    <FacebookLogin
                        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        cssClass="login-btn"
                        icon="fa-facebook"

                    />
                </div>
                 <span className='form-input-login'>
                    or 
                </span>
                <div className='form-inputs'>
                    <label htmlFor="name" className='form-label'>
                        Name
                    </label>
                    <input
                        type='text'
                        name='name'
                        className='form-input'
                        onChange={handleChange}
                    />
                </div>
                <div className='form-inputs'>
                    <label htmlFor="email" className='form-label'>
                        Email
                    </label>
                    <input
                        type='email'
                        name='email'
                        className='form-input'
                        onChange={handleChange}
                    />
                </div>
                <div className='form-inputs'>
                    <label htmlFor="password" className='form-label'>
                        Password
                    </label>
                    <input
                        type='password'
                        name='password'
                        className='form-input'
                        onChange={handleChange}
                    />
                </div>
                <button className='form-input-btn' type='submit'>
                    Sign Up
                </button>
                 <span className='form-input-login'>
                    Already have an account? Login <span>
                        <button onClick={openModal}>
                            here
                        </button>
                    </span>
                </span>
                <Modal showModal={showModal} setShowModal={setShowModal} />
            </form>
        </div>

    )
};

export default FormSignup
