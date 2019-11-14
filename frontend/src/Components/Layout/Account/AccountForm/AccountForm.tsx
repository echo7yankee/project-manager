import React, { useEffect, useRef } from 'react';

//redux
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../Redux/actions/auth';

//style
import style from './accountForm.module.css';

interface IAccountForm {
    inputValue: string;
    setEditable: () => void;
    userDetails;
    subtitle: string;
    userDetailsName: string;
    handleChange;
    userId: string;
}

export const AccountForm = (props: IAccountForm): JSX.Element => {

    const inputRef: any = useRef(null);

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
        dispatch(updateUser(props.userId, props.userDetails))
        props.setEditable();
    };

    return (
        <div>
            <form className={style.accountForm} onSubmit={handleSubmit}>
                <input name={props.userDetailsName} type='text' ref={inputRef} value={props.inputValue} onChange={props.handleChange} />
                <div>
                    <button type='submit'>Save</button>
                    <button type='button' onClick={props.setEditable}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
