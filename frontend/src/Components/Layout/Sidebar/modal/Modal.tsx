import React from 'react'

//style
import style from './modal.module.css'

interface IModalProps {
    closeModal: () => void;
    onChange;
    request;
    title: string;
    labelName: string;
    inputValue: string;
}

export const Modal = (props: IModalProps): JSX.Element => {

    return (
        <div className='overlay' onClick={props.closeModal}>
            <div className={style.sidebarModal} onClick={(e) => e.stopPropagation()}>
                <div>
                    <h1>{props.title}</h1>
                </div>
                <form onSubmit={props.request}>
                    <div className={style.modalGroupControl}>
                        <label htmlFor='projectInput'>{props.labelName}</label>
                        <input id='projectInput' type="text" value={props.inputValue} onChange={props.onChange} />
                    </div>
                    <div className='border'></div>
                    <div className={style.modalBtnContainer}>
                        <button type='button' onClick={props.closeModal}>Cancel</button>
                        <button type='submit'>Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
