import React, { SetStateAction, useEffect, useRef } from 'react';

//assets
import spinner from '../../../../assets/gifs/spinner.gif';

//style
import style from './accountModal.module.css';

interface IAccountModal {
    closeModal: () => void;
    request: (e: { preventDefault: () => void; }) => void;
    isLoading: boolean;
    handleChange: (e: { preventDefault: () => void; target: { value: SetStateAction<string>; }; }) => void;
    inputValue: string;
    errors: { error: string }
}

export const AccountModal = (props: IAccountModal): JSX.Element => {

    const inputRef: any = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <div className={style.accountModalOverlay} onClick={props.closeModal}>
            <div className={style.accountModal} onClick={e => e.stopPropagation()}>
                <div>
                    <h3>
                        We'll be sorry to see you go, but thanks for trying my-todoist!
                </h3>
                    <p>Deleting your account is permanent.
                    <strong>
                            All your data will be wiped out immediately and you won't be able to get it back.
                    </strong>
                    </p>
                </div>
                <div>
                    <form onSubmit={props.request}>
                        <div className={style.accountFormInputGroup}>
                            <label>Current password</label>
                            <input type='password' value={props.inputValue} onChange={props.handleChange} ref={inputRef} />
                        </div>
                        <div>
                            <p>Deleting your account requires your current password as confirmation.</p>
                        </div>
                        <div className={style.accountFormBtnContainer}>
                            <div>
                                <button type='submit'>
                                    Delete my account
                                </button>
                                {props.isLoading && <img src={spinner} alt='spinner' />}
                            </div>
                            <button type='button' onClick={props.closeModal}>
                                Cancel
                            </button>
                        </div>
                    </form>
                    {props.errors.error && <div className='set-center'>
                        <p className='error' style={{ fontSize: '1.3rem' }}>
                            {props.errors.error}
                        </p>
                    </div>}
                </div>
            </div>
        </div>
    )
}
