import React, { useState } from 'react';

//style
import style from './auth.module.css'

//TS TYPES
import { RegisterCredentials } from '../../TSTypes/Credentials';

export const Register = (): JSX.Element => {

    const initCredentials: RegisterCredentials = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [credentials, setCredentials] = useState<RegisterCredentials>(initCredentials);
    const [errorActive, setErrorActive] = useState<boolean>(false);

    //destructuring
    const { firstName, lastName, email, password, confirmPassword } = credentials;

    const errors = {
        firstNameErr: errorActive && !firstName && "First Name can't be empty",
        lastNameErr: errorActive && !lastName && "Last Name can't be empty",
        emailErr: errorActive && !email && "Email can't be empty",
        passwordErr: errorActive && !password && "password can't be empty",
        confirmPasswordErr: errorActive && !confirmPassword && "Confirm Password can't be empty",
    }

    const { firstNameErr, lastNameErr, emailErr, passwordErr, confirmPasswordErr } = errors;

    const handleChange = (e: { target: { name: string; value: string; }; }): void => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: { preventDefault: () => void; }): void => {
        e.preventDefault();

        if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
            setErrorActive(true);
            return;
        };
    }

    return (
        <div className={style.authContainer}>
            <form className={style.authForm} onSubmit={handleSubmit} >
                <div className={style.groupControl}>
                    <input name="firstName"
                        type='text'
                        placeholder='First Name'
                        value={firstName}
                        onChange={handleChange} />
                    {firstNameErr && <p className='error'>{firstNameErr}</p>}
                </div>
                <div className={style.groupControl}>
                    <input name="lastName"
                        type='text'
                        placeholder='Last Name'
                        value={lastName}
                        onChange={handleChange} />
                    {lastNameErr && <p className='error'>{lastNameErr}</p>}
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
                <div className={style.groupControl}>
                    <input name="confirmPassword"
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={handleChange} />
                    {confirmPasswordErr && <p className='error'>{confirmPasswordErr}</p>}
                </div>
                <div className={style.formBtn}>
                    <button>Register</button>
                </div>
            </form>
        </div>
    )
};
