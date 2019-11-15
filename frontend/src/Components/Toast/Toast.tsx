import React from 'react'

//style
import style from './toast.module.css';

interface IToast {
    showToast: boolean;
    text: string;
    backgroundColor: string;
}

export const Toast = (props: IToast) => {
    return (
        <div style={{ backgroundColor: props.backgroundColor }}
            className={props.showToast ? style.toastContainerShow : style.toastContainer}>
            <span>{props.text}</span>
        </div>
    )
}
