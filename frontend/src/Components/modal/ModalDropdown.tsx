import React from 'react';

//style
import style from './modal.module.css';

type IModalDropdown = {
    question: string;
    closeModal: () => void;
    request: () => void;

}

export function ModalDropdown(props: IModalDropdown): JSX.Element {
    return (
        <div className='overlay' onClick={props.closeModal}>
            <div className={style.sidebarModal} onClick={(e) => e.stopPropagation()}>
                <div>
                    <p>{props.question}</p>
                </div>
                <div className={style.modalBtnContainer}>
                    <button onClick={props.closeModal}>Cancel</button>
                    <button onClick={props.request}>Delete</button>
                </div>
            </div>
        </div>
    )
};
