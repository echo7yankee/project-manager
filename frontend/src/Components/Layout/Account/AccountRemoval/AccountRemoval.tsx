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

    //dredux
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.isLoading);

    function openModal(): void {
        setModal(true);
    }

    function closeModal(): void {
        setModal(false);
    }

    function removeUserRequest(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        dispatch(removeUser(props.userId));
    }
    return (
        <>
            <div className={style.accountRemovalContainer}>
                <button onClick={openModal}>
                    Delete my todoist account
                </button>
            </div>
            {modal && <AccountModal closeModal={closeModal} request={removeUserRequest} isLoading={isLoading} />}
        </>
    )
}
