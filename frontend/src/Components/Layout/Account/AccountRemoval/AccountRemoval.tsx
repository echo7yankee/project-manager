import React, { useState } from 'react';

//style
import style from './accountRemoval.module.css';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../../../Redux/actions/auth';

//components
import { AccountModal } from '../AccountModal/AccountModal';

interface IAccountRemovel {
    userId: string;
}

export const AccountRemoval = (props: IAccountRemovel): JSX.Element => {

    const [modal, setModal] = useState(false);
    const [password, setPassword] = useState('');

    //dredux
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);
    const errors = useSelector(state => state.auth.errors);

    function openModal(): void {
        setModal(true);
    }

    function closeModal(): void {
        setModal(false);
        setPassword('');
    }

    function removeUserRequest(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        dispatch(removeUser(props.userId, { password }));
    }

    function handleChange(e: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }) {
        e.preventDefault();
        setPassword(e.target.value);
    }

    return (
        <>
            <div className={style.accountRemovalContainer}>
                <div>
                    <button onClick={openModal}>
                        Delete my todoist account
                </button>
                    <span>Requires password</span>
                </div>
            </div>
            {modal && <AccountModal
                closeModal={closeModal}
                request={removeUserRequest}
                isLoading={isLoading}
                handleChange={handleChange}
                inputValue={password}
                errors={errors}
            />}
        </>
    )
}
