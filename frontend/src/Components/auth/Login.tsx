import React, { useState } from 'react'

//style
import style from './auth.module.css';

//Ts types
import { LoginCredentials } from '../../TSTypes/Credentials';

export const Login = (): JSX.Element => {
    const initCredentials: LoginCredentials = {
        email: '',
        password: '',
    }
    const [credentials, setCredentials] = useState<LoginCredentials>(initCredentials);
    const [errorActive, setErrorActive] = useState<boolean>(false);

    //destructuring
    const { email, password, } = credentials;

    const errors = {
        emailErr: errorActive && !email && "Email can't be empty",
        passwordErr: errorActive && !password && "password can't be empty",
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
    }

    return (
        <div className={style.authContainer}>
            <form className={style.authForm} onSubmit={handleSubmit} >
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
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
};
