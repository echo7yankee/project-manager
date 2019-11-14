import React, { useState } from 'react';

//react router
import { Link, Redirect } from 'react-router-dom';

//assets
import spinner from '../../assets/gifs/spinner.gif';

//redux
import { registerUser } from '../../Redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

//style
import style from './auth.module.css'

//TS TYPES
import { RegisterCredentials } from '../../TSTypes/Credentials';

export const Register = ({ history }): JSX.Element => {

    const initCredentials: RegisterCredentials = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const [credentials, setCredentials] = useState<RegisterCredentials>(initCredentials);
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
    const { firstName, lastName, email, password, confirmPassword } = credentials;

    const defaultErrors = {
        firstNameErr: errorActive && !firstName && 'Must not be empty',
        lastNameErr: errorActive && !lastName && 'Must not be empty',
        emailErr: errorActive && !email && 'Must not be empty',
        passwordErr: errorActive && !password && 'Must not be empty',
        confirmPasswordErr: errorActive && !confirmPassword && 'Must not be empty',
    }

    const { firstNameErr, lastNameErr, emailErr, passwordErr, confirmPasswordErr } = defaultErrors;

    const handleChange = (e: { target: { name: string; value: string; }; }): void => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: { preventDefault: () => void; }): void => {
        e.preventDefault();

        if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
            setErrorActive(true);
            return;
        };

        dispatch(registerUser(credentials, history));
    }

    const isEmailValid = () => {
        if (emailReg.test(email)) {
            setEmailValidError('');
            return;
        }
        setEmailValidError('Must be a valid email');
        return;
    }

    const handleBlur = (): void => {
        isEmailValid()
    }

    if (authenticated) { return <Redirect to='/' /> }

    return (
        <div className={style.authContainer}>
            <form className={style.authForm} onSubmit={handleSubmit} >
                <div className={style.formTitleContainer}>
                    <h1>Register</h1>
                </div>
                <div className={style.groupControl}>
                    <input name='firstName'
                        type='text'
                        placeholder='First Name'
                        value={firstName}
                        onChange={handleChange} />
                    {firstNameErr && <p className='error'>{firstNameErr}</p>}
                </div>
                <div className={style.groupControl}>
                    <input name='lastName'
                        type='text'
                        placeholder='Last Name'
                        value={lastName}
                        onChange={handleChange} />
                    {lastNameErr && <p className='error'>{lastNameErr}</p>}
                </div>
                <div className={style.groupControl}>
                    <input name='email'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {emailErr && <p className='error'>{emailErr}</p>}
                    {emailValidError && <p className='error mtb-1'>{emailValidError}</p>}
                </div>
                <div className={style.groupControl}>
                    <input name='password'
                        type='password'
                        placeholder='Password'
                        value={password} onChange={handleChange} />
                    {passwordErr && <p className='error'>{passwordErr}</p>}
                </div>
                <div className={style.groupControl}>
                    <input name='confirmPassword'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={handleChange} />
                    {confirmPasswordErr && <p className='error'>{confirmPasswordErr}</p>}
                </div>
                <div className={style.formBtn}>
                    <button>
                        <span>Register</span>
                    </button>
                    {isLoading && <img src={spinner} alt='spinner' className='auth_spinner ml-05' />}
                </div>
                {errors.error && <div className='set-center' ><p className='error'>{errors.error}</p></div>}
                <div className={style.authInfo}>
                    <p>Already have an account? Click <Link to='/login'>Here</Link> </p>
                </div>
            </form>
        </div>
    )
};
