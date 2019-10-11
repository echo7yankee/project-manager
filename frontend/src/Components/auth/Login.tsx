import React, { useState } from 'react'

//assets
import spinner from '../../assets/gifs/spinner.gif';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/actions/auth';

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
    const [emailValidError, setEmailValidError] = useState('');

    //redux
    const dispatch = useDispatch();
    const authenticated = useSelector(state => state.auth.authenticated);
    const isLoading = useSelector(state => state.auth.isLoading);
    const errors = useSelector(state => state.auth.errors);
    const emailReg =
        /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //destructuring
    const { email, password, } = credentials;

    const defaultErrors = {
        emailErr: errorActive && !email && 'Must not be empty',
        passwordErr: errorActive && !password && 'Must not be empty',
    }

    let { emailErr, passwordErr } = defaultErrors;

    const handleChange = (e: { target: { name: string; value: string; }; }): void => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: { preventDefault: () => void; }): void => {
        e.preventDefault();

        if (email === '' || password === '') {
            setErrorActive(true);
            return;
        };

        dispatch(loginUser(credentials, history))
    }

    const isEmailValid = () => {
        if (emailReg.test(email)) {
            setEmailValidError('');
            return;
        }
        setEmailValidError('Must be a valid email');
        return;
    }

    const handleBlur = () => {
        isEmailValid()
    }

    if (authenticated) { return <Redirect to='/' /> }

    return (
        <div className={style.authContainer}>
            <form className={style.authForm} onSubmit={handleSubmit} >
                <div className={style.formTitleContainer}>
                    <h1>Login</h1>
                </div>
                <div className={style.groupControl}>
                    <input name='email'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    {emailErr && <p className='error'>{emailErr}</p>}
                    {emailValidError && <p className='error'>{emailValidError}</p>}
                </div>
                <div className={style.groupControl}>
                    <input name='password'
                        type='password'
                        placeholder='Password'
                        value={password} onChange={handleChange} />
                    {passwordErr && <p className='error mtb-1'>{passwordErr}</p>}
                </div>
                <div className={style.formBtn}>
                    <button>
                        <span>Login</span>
                    </button>
                    {isLoading && <img src={spinner} alt='spinner' className='auth_spinner ml-05' />}
                </div>
                {errors.error && <div className='set-center' ><p className='error'>{errors.error}</p></div>}
                <div className={style.authInfo}>
                    <p>Don't have an account? Click <Link to="/register">Here</Link> </p>
                </div>
            </form>
        </div>
    )
};
