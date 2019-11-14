import React, { useEffect, useRef } from 'react';

//redux
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../Redux/actions/auth';

//style
import style from './accountForm.module.css';

interface IAccountForm {
    inputValue: string;
    setEditableFalse: () => void;
    setEditableFalseCancel: () => void;
    userDetails;
    subtitle: string;
    userDetailsName: string;
    handleChange;
    userId: string;
    isPassword: boolean;
}

export const AccountForm = (props: IAccountForm): JSX.Element => {

    const inputRef: any = useRef(null);
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    //redux
    const dispatch = useDispatch();

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    function handleSubmit(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        delete props.userDetails.id;
        delete props.userDetails.role;
        delete props.userDetails.createdAt;

        console.log(emailRegex.test(props.userDetails.email));

        dispatch(updateUser(props.userId, props.userDetails))
        props.setEditableFalse();
    };

    return (
        <div>
            <form className={style.accountForm} onSubmit={handleSubmit}>
                <input
                    name={props.userDetailsName}
                    type={props.isPassword ? 'password' : 'text'}
                    ref={inputRef}
                    value={props.inputValue}
                    onChange={props.handleChange} />
                {props.isPassword &&
                    <input
                        name={props.userDetailsName}
                        type='password'
                        value={props.inputValue}
                        onChange={props.handleChange} />}
                <div>
                    <button type='submit'>Save</button>
                    <button type='button' onClick={props.setEditableFalseCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
