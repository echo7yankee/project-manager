import React from 'react';

//style
import style from './accountModal.module.css';

interface IAccountModal {
    closeModal: () => void
}

export const AccountModal = (props: IAccountModal): JSX.Element => {
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
                    <form>
                        <div className={style.accountFormInputGroup}>
                            <label>Current password</label>
                            <input type='password' />
                        </div>
                        <div>
                            <p>Deleting your account requires your current password as confirmation.</p>
                        </div>
                        <div className={style.accountFormBtnContainer}>
                            <button type='submit'>
                                Delete my account
                            </button>
                            <button type='button' onClick={props.closeModal}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
