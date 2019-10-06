import React, { useState } from 'react'

//assets
import spinner from '../../assets/gifs/spinner.gif';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { Auth } from '../../Redux/actions/auth';

//react router
import { Link, Redirect } from 'react-router-dom';

//style
import style from './auth.module.css';

//Ts types
import { LoginCredentials } from '../../TSTypes/Credentials';


export const Login = ({ history }): JSX.Element => {
    const initCredentials: LoginCredentials = {
        email: '',
        password: '',
    }
    const [credentials, setCredentials] = useState<LoginCredentials>(initCredentials);
    const [errorActive, setErrorActive] = useState<boolean>(false);

    //redux
    const dispatch = useDispatch();
    const authenticated = useSelector(state => state.auth.authenticated);
    const isLoading = useSelector(state => state.auth.isLoading);
    const auth = new Auth();

    //destructuring
    const { email, password, } = credentials;

    const errors = {
        emailErr: errorActive && !email && "Must not be empty",
        passwordErr: errorActive && !password && "Must not be empty",
    }

    const { emailErr, passwordErr } = errors;

    const handleChange = (e: { target: { name: string; value: string; }; }): void => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: { preventDefault: () => void; }): void => {
        e.preventDefault();

        if (email === '' || password === '') {
            setErrorActive(true);
            return;
        };

        dispatch(auth.loginUser(credentials, history))
    }

    if (authenticated) { return <Redirect to='/dashboard' /> }

    return (
        <div className={style.authContainer}>
            <form className={style.authForm} onSubmit={handleSubmit} >
                <div className={style.formTitleContainer}>
                    <h1>Login</h1>
                </div>
                <div className={style.groupControl}>
                    <input name="email"
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={handleChange} />
                    {emailErr && <p className='error'>{emailErr}</p>}
                </div>
                <div className={style.groupControl}>
                    <input name="password"
                        type='password'
                        placeholder='Password'
                        value={password} onChange={handleChange} />
                    {passwordErr && <p className='error'>{passwordErr}</p>}
                </div>
                <div className={style.formBtn}>
                    <button>
                        <span>Login</span>
                    </button>
                    {isLoading && <img src={spinner} alt='spinner' className='auth_spinner ml-05' />}
                </div>
                <div className={style.authInfo}>
                    <p>Don't have an account? Click <Link to="/register">Here</Link> </p>
                </div>
            </form>
        </div>
    )
};
