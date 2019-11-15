import React, { useState } from 'react';

//style
import style from './accountRemoval.module.css';

//components
import { AccountModal } from '../AccountModal/AccountModal';

export const AccountRemoval = (): JSX.Element => {

    const [modal, setModal] = useState(false);

    function openModal(): void {
        setModal(true);
    }

    function closeModal(): void {
        setModal(false);
    }

    return (
        <>
            <div className={style.accountRemovalContainer}>
                <button onClick={openModal}>
                    Delete my todoist account
                </button>
            </div>
            {modal && <AccountModal closeModal={closeModal} />}
        </>
    )
}
